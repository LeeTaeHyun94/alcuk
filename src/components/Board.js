import React, {Component} from 'react'
import PageHeader from 'react-bootstrap/lib/PageHeader'
import Button from 'react-bootstrap/lib/Button'
import Todo from './Todo'
import ExpiredTodo from './ExpiredTodo'
import axios from 'axios'
import Modal from "react-bootstrap/lib/Modal";

// const todos = [
//     {
//         seq : 0,
//         title : "TestData",
//         description : "테스트데이터",
//         deadline : "2018-11-24T12:59",
//         priority : 3
//     },
//     {
//         seq : 1,
//         title : "TestData",
//         description : "테스트데이터",
//         deadline : "2018-11-24T12:59",
//         priority : 1
//     }
// ]
//
// const expiredTodos = [
//     {
//         seq : 2,
//         title : "안녕하세요",
//         description : "test",
//         deadline : "2018-11-24T12:59"
//     },
//     {
//         seq : 3,
//         title : "안녕하세요dd",
//         description : "마감",
//         deadline : "2018-11-24T12:59"
//     }
// ]

function getTodos() {
    return axios.get('https://jsonplaceholder.typicode.com/posts');
}

function getExpiredTodos() {
    return axios.get('https://jsonplaceholder.typicode.com/comments');
}

function createTodo(contents) {
    axios({
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/posts',
        data: contents,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
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
        let bodyFormData = new FormData();
        bodyFormData.set('userId', 1);
        bodyFormData.set('id', this.cpriority.value);
        bodyFormData.set('title', this.ctitle.value);
        bodyFormData.set('body', this.cdescription.value);
        createTodo(bodyFormData);
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
                                            return <Todo key={todo.id} seq={todo.id} title={todo.title} description={todo.description} deadline={todo.deadline} priority={todo.priority}/>
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
                                            return <ExpiredTodo key={expiredTodo.id} seq={expiredTodo.id} title={expiredTodo.title} description={expiredTodo.description} deadline={expiredTodo.deadline}/>
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