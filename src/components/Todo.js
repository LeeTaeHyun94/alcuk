import React, { Component } from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button"
import axios from "axios"

function getTodo(seq) {
    return axios.get('https://jsonplaceholder.typicode.com/posts/' + seq);
}

function modifyTodo(contents, seq) {
    axios({
        method: 'put',
        url: 'https://jsonplaceholder.typicode.com/posts/' + seq,
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

function removeTodo(seq) {
    axios({
        method: 'delete',
        url: 'https://jsonplaceholder.typicode.com/posts/' + seq,
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

class Todo extends Component {
    fetchTodoInfo = async (seq) => {
        this.setState({fetching:true});
        const jsonData = await getTodo(seq);
        console.log(jsonData);
        const todo = jsonData.data;
        this.setState({
            todo,
            fetching: false,
        });
        // console.log(this.state.todo.title + " " + this.state.todo.body + " " + this.state.todo.id);
        this.useq.value = this.state.todo.id;
        this.utitle.value = this.state.todo.title;
        this.udescription.value = this.state.todo.body;
        this.upriority.value = this.state.todo.id;
    }

    updateTodo = (e) => {
        e.preventDefault();
        let bodyFormData = new FormData();
        bodyFormData.set('userId', this.upriority.value);
        bodyFormData.set('id', this.useq.value);
        bodyFormData.set('title', this.utitle.value);
        bodyFormData.set('body', this.udescription.value);
        modifyTodo(bodyFormData, this.useq.value);
    }

    deleteTodo = (seq, e) => {
        e.preventDefault();
        removeTodo(seq);
    }

    handleUpdateModalShow = (seq, e) => {
        e.preventDefault();
        this.setState({showUpdateModal:true});
        this.fetchTodoInfo(seq);
    }

    handleUpdateModalClose() {
        this.setState({showUpdateModal:false});
    }

    constructor(props, context) {
        super(props, context);
        this.handleUpdateModalClose = this.handleUpdateModalClose.bind(this);
        this.state = {
            showUpdateModal: false,
            fetching: false,
            todo: []
        };
    }

    useq = null;
    utitle = null;
    udescription = null;
    upriority = null;
    udeadline = null;

    render() {
        if (this.props.seq % 2 === 0) {
            if (this.props.priority === 0) {
                return (
                    <li>
                        <div className="timeline-badge">
                            <i className="fa fa-bomb"/>
                        </div>
                        <div className="timeline-panel">
                            <div className="timeline-heading">
                                <h4 className="timeline-title">{this.props.title}</h4>
                                <p><small className='text-muted'><i className='fa fa-clock-o'></i>{this.props.deadline}</small></p>
                            </div>
                            <div className="timeline-body">
                                <p>{this.props.description}</p>
                                <hr/>
                                <DropdownButton bsStyle={"success"} title={"option"} id={'option-dropdown'}>
                                    <MenuItem onClick={e => this.handleUpdateModalShow(this.props.seq, e)}>Modify</MenuItem>
                                    <MenuItem onClick={e => this.deleteTodo(this.props.seq, e)}>Delete</MenuItem>
                                </DropdownButton>
                            </div>
                        </div>
                        <Modal show={this.state.showUpdateModal} onHide={this.handleUpdateModalClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Update Todo</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <input type="hidden" ref={ref => {this.useq = ref}}/>
                                    <div className="form-group">
                                        <label className="col-form-label">Title :</label>
                                        <input type="text" className="form-control" ref={ref => {this.utitle = ref}}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Description :</label>
                                        <textarea type="text" className="form-control" ref={ref => {this.udescription = ref}}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Priority :</label>
                                        <select name="priority" defaultValue={0} ref={ref => {this.upriority = ref}}>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Deadline :</label>
                                        <input type="datetime-local" ref={ref => {this.udeadline = ref}}/>
                                    </div>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="btn btn-primary" onClick={e => this.updateTodo(e)}>Update</Button>
                                <Button className="btn btn-secondary" onClick={this.handleUpdateModalClose}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </li>
                )
            }
            else if (this.props.priority === 1) {
                return (
                    <li>
                        <div className="timeline-badge info">
                            <i className="fa fa-bomb"/>
                        </div>
                        <div className="timeline-panel">
                            <div className="timeline-heading">
                                <h4 className="timeline-title">{this.props.title}</h4>
                                <p><small className='text-muted'><i className='fa fa-clock-o'></i>{this.props.deadline}</small></p>
                            </div>
                            <div className="timeline-body">
                                <p>{this.props.description}</p>
                                <hr/>
                                <DropdownButton bsStyle={"success"} title={"option"} id={'option-dropdown'}>
                                    <MenuItem onClick={e => this.handleUpdateModalShow(this.props.seq, e)}>Modify</MenuItem>
                                    <MenuItem onClick={e => this.deleteTodo(this.props.seq, e)}>Delete</MenuItem>
                                </DropdownButton>
                            </div>
                        </div>
                        <Modal show={this.state.showUpdateModal} onHide={this.handleUpdateModalClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Update Todo</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <input type="hidden" ref={ref => {this.useq = ref}}/>
                                    <div className="form-group">
                                        <label className="col-form-label">Title :</label>
                                        <input type="text" className="form-control" ref={ref => {this.utitle = ref}}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Description :</label>
                                        <textarea type="text" className="form-control" ref={ref => {this.udescription = ref}}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Priority :</label>
                                        <select name="priority" defaultValue={0} ref={ref => {this.upriority = ref}}>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Deadline :</label>
                                        <input type="datetime-local" ref={ref => {this.udeadline = ref}}/>
                                    </div>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="btn btn-primary" onClick={e => this.updateTodo(e)}>Update</Button>
                                <Button className="btn btn-secondary" onClick={this.handleUpdateModalClose}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </li>
                )
            }
            else if (this.props.priority === 2) {
                return (
                    <li>
                        <div className="timeline-badge warning">
                            <i className="fa fa-bomb"/>
                        </div>
                        <div className="timeline-panel">
                            <div className="timeline-heading">
                                <h4 className="timeline-title">{this.props.title}</h4>
                                <p><small className='text-muted'><i className='fa fa-clock-o'></i>{this.props.deadline}</small></p>
                            </div>
                            <div className="timeline-body">
                                <p>{this.props.description}</p>
                                <hr/>
                                <DropdownButton bsStyle={"success"} title={"option"} id={'option-dropdown'}>
                                    <MenuItem onClick={e => this.handleUpdateModalShow(this.props.seq, e)}>Modify</MenuItem>
                                    <MenuItem onClick={e => this.deleteTodo(this.props.seq, e)}>Delete</MenuItem>
                                </DropdownButton>
                            </div>
                        </div>
                        <Modal show={this.state.showUpdateModal} onHide={this.handleUpdateModalClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Update Todo</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <input type="hidden" ref={ref => {this.useq = ref}}/>
                                    <div className="form-group">
                                        <label className="col-form-label">Title :</label>
                                        <input type="text" className="form-control" ref={ref => {this.utitle = ref}}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Description :</label>
                                        <textarea type="text" className="form-control" ref={ref => {this.udescription = ref}}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Priority :</label>
                                        <select name="priority" defaultValue={0} ref={ref => {this.upriority = ref}}>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Deadline :</label>
                                        <input type="datetime-local" ref={ref => {this.udeadline = ref}}/>
                                    </div>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="btn btn-primary" onClick={e => this.updateTodo(e)}>Update</Button>
                                <Button className="btn btn-secondary" onClick={this.handleUpdateModalClose}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </li>
                )
            }
            else {
                return (
                    <li>
                        <div className="timeline-badge danger">
                            <i className="fa fa-bomb"/>
                        </div>
                        <div className="timeline-panel">
                            <div className="timeline-heading">
                                <h4 className="timeline-title">{this.props.title}</h4>
                                <p><small className='text-muted'><i className='fa fa-clock-o'></i>{this.props.deadline}</small></p>
                            </div>
                            <div className="timeline-body">
                                <p>{this.props.description}</p>
                                <hr/>
                                <DropdownButton bsStyle={"success"} title={"option"} id={'option-dropdown'}>
                                    <MenuItem onClick={e => this.handleUpdateModalShow(this.props.seq, e)}>Modify</MenuItem>
                                    <MenuItem onClick={e => this.deleteTodo(this.props.seq, e)}>Delete</MenuItem>
                                </DropdownButton>
                            </div>
                        </div>
                        <Modal show={this.state.showUpdateModal} onHide={this.handleUpdateModalClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Update Todo</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <input type="hidden" ref={ref => {this.useq = ref}}/>
                                    <div className="form-group">
                                        <label className="col-form-label">Title :</label>
                                        <input type="text" className="form-control" ref={ref => {this.utitle = ref}}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Description :</label>
                                        <textarea type="text" className="form-control" ref={ref => {this.udescription = ref}}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Priority :</label>
                                        <select name="priority" defaultValue={0} ref={ref => {this.upriority = ref}}>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Deadline :</label>
                                        <input type="datetime-local" ref={ref => {this.udeadline = ref}}/>
                                    </div>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="btn btn-primary" onClick={e => this.updateTodo(e)}>Update</Button>
                                <Button className="btn btn-secondary" onClick={this.handleUpdateModalClose}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </li>
                )
            }
        }
        else {
            if (this.props.priority === 0) {
                return (
                    <li className="timeline-inverted">
                        <div className="timeline-badge">
                            <i className="fa fa-bomb"/>
                        </div>
                        <div className="timeline-panel">
                            <div className="timeline-heading">
                                <h4 className="timeline-title">{this.props.title}</h4>
                                <p><small className='text-muted'><i className='fa fa-clock-o'></i>{this.props.deadline}</small></p>
                            </div>
                            <div className="timeline-body">
                                <p>{this.props.description}</p>
                                <hr/>
                                <DropdownButton bsStyle={"success"} title={"option"} id={'option-dropdown'}>
                                    <MenuItem onClick={e => this.handleUpdateModalShow(this.props.seq, e)}>Modify</MenuItem>
                                    <MenuItem onClick={e => this.deleteTodo(this.props.seq, e)}>Delete</MenuItem>
                                </DropdownButton>
                            </div>
                        </div>
                        <Modal show={this.state.showUpdateModal} onHide={this.handleUpdateModalClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Update Todo</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <input type="hidden" ref={ref => {this.useq = ref}}/>
                                    <div className="form-group">
                                        <label className="col-form-label">Title :</label>
                                        <input type="text" className="form-control" ref={ref => {this.utitle = ref}}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Description :</label>
                                        <textarea type="text" className="form-control" ref={ref => {this.udescription = ref}}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Priority :</label>
                                        <select name="priority" defaultValue={0} ref={ref => {this.upriority = ref}}>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Deadline :</label>
                                        <input type="datetime-local" ref={ref => {this.udeadline = ref}}/>
                                    </div>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="btn btn-primary" onClick={e => this.updateTodo(e)}>Update</Button>
                                <Button className="btn btn-secondary" onClick={this.handleUpdateModalClose}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </li>
                )
            }
            else if (this.props.priority === 1) {
                return (
                    <li className="timeline-inverted">
                        <div className="timeline-badge info">
                            <i className="fa fa-bomb"/>
                        </div>
                        <div className="timeline-panel">
                            <div className="timeline-heading">
                                <h4 className="timeline-title">{this.props.title}</h4>
                                <p><small className='text-muted'><i className='fa fa-clock-o'></i>{this.props.deadline}</small></p>
                            </div>
                            <div className="timeline-body">
                                <p>{this.props.description}</p>
                                <hr/>
                                <DropdownButton bsStyle={"success"} title={"option"} id={'option-dropdown'}>
                                    <MenuItem onClick={e => this.handleUpdateModalShow(this.props.seq, e)}>Modify</MenuItem>
                                    <MenuItem onClick={e => this.deleteTodo(this.props.seq, e)}>Delete</MenuItem>
                                </DropdownButton>
                            </div>
                        </div>
                        <Modal show={this.state.showUpdateModal} onHide={this.handleUpdateModalClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Update Todo</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <input type="hidden" ref={ref => {this.useq = ref}}/>
                                    <div className="form-group">
                                        <label className="col-form-label">Title :</label>
                                        <input type="text" className="form-control" ref={ref => {this.utitle = ref}}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Description :</label>
                                        <textarea type="text" className="form-control" ref={ref => {this.udescription = ref}}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Priority :</label>
                                        <select name="priority" defaultValue={0} ref={ref => {this.upriority = ref}}>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Deadline :</label>
                                        <input type="datetime-local" ref={ref => {this.udeadline = ref}}/>
                                    </div>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="btn btn-primary" onClick={e => this.updateTodo(e)}>Update</Button>
                                <Button className="btn btn-secondary" onClick={this.handleUpdateModalClose}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </li>
                )
            }
            else if (this.props.priority === 2) {
                return (
                    <li className="timeline-inverted">
                        <div className="timeline-badge warning">
                            <i className="fa fa-bomb"/>
                        </div>
                        <div className="timeline-panel">
                            <div className="timeline-heading">
                                <h4 className="timeline-title">{this.props.title}</h4>
                                <p><small className='text-muted'><i className='fa fa-clock-o'></i>{this.props.deadline}</small></p>
                            </div>
                            <div className="timeline-body">
                                <p>{this.props.description}</p>
                                <hr/>
                                <DropdownButton bsStyle={"success"} title={"option"} id={'option-dropdown'}>
                                    <MenuItem onClick={e => this.handleUpdateModalShow(this.props.seq, e)}>Modify</MenuItem>
                                    <MenuItem onClick={e => this.deleteTodo(this.props.seq, e)}>Delete</MenuItem>
                                </DropdownButton>
                            </div>
                        </div>
                        <Modal show={this.state.showUpdateModal} onHide={this.handleUpdateModalClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Update Todo</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <input type="hidden" ref={ref => {this.useq = ref}}/>
                                    <div className="form-group">
                                        <label className="col-form-label">Title :</label>
                                        <input type="text" className="form-control" ref={ref => {this.utitle = ref}}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Description :</label>
                                        <textarea type="text" className="form-control" ref={ref => {this.udescription = ref}}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Priority :</label>
                                        <select name="priority" defaultValue={0} ref={ref => {this.upriority = ref}}>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Deadline :</label>
                                        <input type="datetime-local" ref={ref => {this.udeadline = ref}}/>
                                    </div>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="btn btn-primary" onClick={e => this.updateTodo(e)}>Update</Button>
                                <Button className="btn btn-secondary" onClick={this.handleUpdateModalClose}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </li>
                )
            }
            else {
                return (
                    <li className="timeline-inverted">
                        <div className="timeline-badge danger">
                            <i className="fa fa-bomb"/>
                        </div>
                        <div className="timeline-panel">
                            <div className="timeline-heading">
                                <h4 className="timeline-title">{this.props.title}</h4>
                                <p><small className='text-muted'><i className='fa fa-clock-o'></i>{this.props.deadline}</small></p>
                            </div>
                            <div className="timeline-body">
                                <p>{this.props.description}</p>
                                <hr/>
                                <DropdownButton bsStyle={"success"} title={"option"} id={'option-dropdown'}>
                                    <MenuItem onClick={e => this.handleUpdateModalShow(this.props.seq, e)}>Modify</MenuItem>
                                    <MenuItem onClick={e => this.deleteTodo(this.props.seq, e)}>Delete</MenuItem>
                                </DropdownButton>
                            </div>
                        </div>
                        <Modal show={this.state.showUpdateModal} onHide={this.handleUpdateModalClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Update Todo</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <input type="hidden" ref={ref => {this.useq = ref}}/>
                                    <div className="form-group">
                                        <label className="col-form-label">Title :</label>
                                        <input type="text" className="form-control" ref={ref => {this.utitle = ref}}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Description :</label>
                                        <textarea type="text" className="form-control" ref={ref => {this.udescription = ref}}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Priority :</label>
                                        <select name="priority" defaultValue={0} ref={ref => {this.upriority = ref}}>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">Deadline :</label>
                                        <input type="datetime-local" ref={ref => {this.udeadline = ref}}/>
                                    </div>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="btn btn-primary" onClick={e => this.updateTodo(e)}>Update</Button>
                                <Button className="btn btn-secondary" onClick={this.handleUpdateModalClose}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </li>
                )
            }
        }
    }
}

export default Todo;
