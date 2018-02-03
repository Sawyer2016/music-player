import React from 'react'
import {Form, Input, Button,Icon, message, Upload} from 'antd'
import MusicForm from './MusicForm'


class AddMusic extends React.Component{
	constructor(props){
		super(props)
		this.state={
			loading:false,
			imageUrl:null
		}
	}

	

	render(){
		const {imageUrl, loading} =this.state
		return(
			<div style={{margin:'20px auto',width:'400px'}}>
				<MusicForm />
			</div>
			)
	}
}
export default AddMusic