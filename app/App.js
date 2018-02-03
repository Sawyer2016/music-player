import React from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import {render} from 'react-dom';
import Music from './Music'
import Library from './Library'
import AddMusic from './addMusic'
import EditMusic from './editMusic'
const App= () =>{
	return(<BrowserRouter>
		<div>		
		<Route exact path="/" component={Music} />
		<Route path="/library" component={Library} />
		<Route path="/addMusic" component={AddMusic} />
		<Route path="/editMusic/:id" component={EditMusic} />
		</div>
	</BrowserRouter>)
}
export default App
