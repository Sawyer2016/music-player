import React from 'react'
import {Form, Input, Button,Icon, message, Upload} from 'antd'
import * as api from '../public/library'
const FormItem = Form.Item
const token={token:"8Pcc2wOXUShPVUHspXaFrckowdVtewNvrxwyrwom"}
const QINIU_SERVER = 'http://upload.qiniup.com'
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
class MusicForm extends React.Component{
	constructor(props){
		super(props)
		this.state={
			loading:false,
			imageUrl:null,
			id:this.props.musicId||null,
			name:null
		}
	}

	handleChange = (info) => {
	    if (info.file.status === 'uploading') {
	      this.setState({ loading: true });
	      return;
	    }
	    if (info.file.status === 'done') {
	      // Get this url from response in real world.
	      getBase64(info.file.originFileObj, imageUrl => this.setState({
	        imageUrl,
	        loading: false,
	      }));
	    }
	}

	changeName = (e) =>{
		switch (e.target.name){
			case "name":{
				this.setState({name:e.target.value})
				break;
			}
			default:
				break;
		}
	}

	handleSubmit=(e)=>{
		const form=this.props.form
		e.preventDefault();
		let fields={
			name:this.state.name
		}
		this.props.handleSubmit(fields)
	}
	componentDidMount(){
		const {id} =this.state
		if(id){
			let music=api.findMusic(id)
			this.setState({name:music.name})
		}
	}

	render(){
		const {id, name} = this.state
		const itemLayout={
			labelCol:{span:4},
			wrapperCol:{span:14}
		}
		const buttonLayout={
			wrapperCol:{
				span:14, offset:4
			}
		}
		
		return(
			<Form onSubmit={this.handleSubmit.bind(this)}>
				<FormItem label="歌名:" {...itemLayout}>
					<Input name="name" placeholder="name" value={name} onChange={this.changeName.bind(this)}/>
				</FormItem>
				
				{/*<FormItem label="图片:" {...itemLayout}>
				<Upload
							        name="avatar"
							        listType="picture-card"
							        className="avatar-uploader"
							        showUploadList={false}
							        action={QINIU_SERVER}			        
							        onChange={this.handleChange}
							        data={token}
							      >
							        {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
							      </Upload>
				</FormItem>*/}
				<FormItem {...buttonLayout}>
					<Button htmlType="submit">Submit</Button>
				</FormItem>
			</Form>
			)
	}
}
MusicForm = Form.create()(MusicForm)
export default MusicForm