import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/sb-admin-2.min.css'
import './css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
// import App from './App';
import Main from './Main';
import * as serviceWorker from './serviceWorker';

export {default as Home} from './components/Home'
export {default as Board} from './components/Board'

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
