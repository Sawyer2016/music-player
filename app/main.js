import React from 'react';
import "babel-polyfill"
import {render} from 'react-dom';
import Music from './Music';
// import Library from './Library';
import './main.css';
import App from './App'
import { createStore, applyMiddleware } from 'redux';
import {cunrrentMusic} from './reducers'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()
var store=createStore(cunrrentMusic,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)
console.log(11111)
render((
	<Provider store={store}>
	<App />
	</Provider>
	), document.getElementById('root'))
