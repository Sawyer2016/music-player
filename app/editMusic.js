import React from 'react'
import {Form, Button, Icon} from 'antd'
import {Link} from 'react-router-dom'
import MusicForm from './MusicForm'
import * as api from '../public/library'

class EditMusic extends React.Component{
	constructor(props){
		super(props)
		this.state={
			id:props.match.params.id
		}
	}

	handleSubmit=(values)=>{
		const {id} = this.state
		api.editMusic(id,values)
		this.props.history.goBack()
	}
	render(){
		const {id} = this.state
		return(
			<div style={{margin:'20px auto',width:'400px'}}>
				<div style={{fontSize:40}}><Link to="/library"><Icon type="arrow-left" /></Link></div>
				<MusicForm musicId={id} handleSubmit={this.handleSubmit}/>

			</div>
			)
	}
}
export default EditMusic