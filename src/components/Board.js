import React, {Component} from 'react'
import PageHeader from 'react-bootstrap/lib/PageHeader'
import Button from 'react-bootstrap/lib/Button'
import Todo from './Todo'
import ExpiredTodo from './ExpiredTodo'
import axios from 'axios'
import Modal from "react-bootstrap/lib/Modal";

function getTodos() {
    return axios.get('http://localhost:3000/api/todos');
}

function getExpiredTodos() {
    return axios.get('http://localhost:3000/api/todos/expired');
}

function createTodo(contents) {
    axios.post('http://localhost:3000/api/todo', contents)
        .then(function (response) {
            //handle success
            console.log(response);
            window.location.reload();
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
}

class Board extends Component {
    fetchTodosInfo = async () => {
        this.setState({
            fetching: true
        });
        const jsonData = await Promise.all([
            getTodos(),
            getExpiredTodos()
        ]);
        console.log(jsonData);
        const todos = jsonData[0].data;
        const expiredTodos = jsonData[1].data;
        this.setState({
            todos,
            expiredTodos,
            fetching: false
        });
    }
    createTodo = (e) => {
        e.preventDefault();
        let obj = {
            'title': this.ctitle.value,
            'description': this.cdescription.value,
            'deadline': this.cdeadline.value,
            'priority': this.cpriority.value
        };
        createTodo(obj);
    }
    componentDidMount() {
        this.fetchTodosInfo();
    }

    handleCreateModalClose() {
        this.setState({showCreateModal:false});
    }

    handleCreateModalShow() {
        this.setState({showCreateModal:true});
    }

    constructor(props) {
        super(props);
        this.handleCreateModalShow = this.handleCreateModalShow.bind(this);
        this.handleCreateModalClose = this.handleCreateModalClose.bind(this);
        this.state = {
            showCreateModal: false,
            fetching: false,
            todos: [],
            expiredTodos: []
        };
    }
    ctitle = null;
    cdescription = null;
    cpriority = null;
    cdeadline = null;
    render() {
        const {todos, expiredTodos} = this.state;
        return (
            <div>
                <PageHeader>과제 게시판</PageHeader>
                <div>
                    <div className="row">
                        <div className="col-lg-8" style={{paddingLeft:50}}>
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <i className="fa fa-clock-o fa-fw"/> To do List Timeline
                                    <Button bsStyle="info" style={{position: 'absolute', right: 30}} onClick={this.handleCreateModalShow}>
                                        Create Todo
                                    </Button>
                                </div>
                                <div className="panel-body">
                                    <ul className="timeline" id="todoList">
                                        {todos.map((todo) => {
                                            return <Todo key={todo._id} seq={todo._id} title={todo.title} description={todo.description} deadline={todo.deadline.slice(0, 16)} priority={todo.priority}/>
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4" style={{paddingRight:50}}>
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <i className="fa fa-bell fa-fw"/> Expired List
                                </div>
                                <div className="panel-body">
                                    <ul className="chat" id="expiredList">
                                        {expiredTodos.map((expiredTodo) => {
                                            return <ExpiredTodo key={expiredTodo._id} seq={expiredTodo._id} title={expiredTodo.title} description={expiredTodo.description} deadline={expiredTodo.deadline.slice(0, 16)}/>
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.showCreateModal} onHide={this.handleCreateModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Todo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label className="col-form-label">Title :</label>
                                <input type="text" className="form-control" ref={ref => {this.ctitle = ref}}/>
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Description :</label>
                                <textarea type="text" className="form-control" ref={ref => {this.cdescription = ref}}/>
                            </div>
                            <div className="form-group">
                                <label>Priority :</label>
                                <select name="priority" defaultValue={0} ref={ref => {this.cpriority = ref}}>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Deadline :</label>
                                <input type="datetime-local" ref={ref => {this.cdeadline = ref}}/>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn btn-primary" onClick={e => this.createTodo(e)}>Create</Button>
                        <Button className="btn btn-secondary" onClick={this.handleCreateModalClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Board;
