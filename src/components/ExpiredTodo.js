import React, { Component } from 'react';
import Button from "react-bootstrap/lib/Button"
import axios from "axios";

function removeExpiredTodo(seq) {
    axios({
        method: 'delete',
        url: 'http://13.124.186.2:3000/api/todo/' + seq,
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

class ExpiredTodo extends Component {
    deleteExpiredTodo = (seq, e) => {
        e.preventDefault();
        removeExpiredTodo(seq);
    }

    render() {
        return (
            <li className="left clearfix">
                <span className="char-img pull-left">
                    <Button onClick={e => this.deleteExpiredTodo(this.props.seq, e)}>
                        <i className="fa fa-trash-o"/>
                    </Button>
                </span>
                <div className="chat-body clearfix">
                    <div>
                        <strong>{this.props.title}</strong>
                        <small className="pull-right text-muted">
                            <i className="fa fa-clock-o fa-fw"/>
                            {this.props.deadline}
                        </small>
                    </div>
                    <p>
                        {this.props.description}
                    </p>
                </div>
            </li>
        )
    }
}

export default ExpiredTodo;
