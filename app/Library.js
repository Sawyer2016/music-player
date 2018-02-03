import React from 'react'
import {Link} from 'react-router-dom'
import {library} from '../public/library'
import {Icon, Table, Button} from 'antd'
import {store} from './main'
import { connect } from 'react-redux';
class Library extends React.Component{
	constructor(props){
		super(props)
		this.state={
			library:[],
			favList:this.props.favList
		}
	}

	chooseMusic = (id) =>{
		const {dispatch} =this.props
		dispatch({type:'chooseMusic', index:id})
		this.props.history.goBack()
	}

	componentDidMount(){
		this.getLibraryList()
	}

	getLibraryList=()=>{
		this.setState({library})
	}

	addFav=(id)=>{
		const {dispatch} =this.props
		dispatch({type:'addFav', id:id})			
	}

	checkFav=(id)=>{
		const {favList}=this.props
		return favList.includes(id)
	}

	render(){
		const columns=[{title:'歌名', key:'name', render:(text,record)=>{
			return (<div onClick={this.chooseMusic.bind(this,record.id)} style={{cursor:'pointer'}}>{record.name}</div>)
		}},
		{title:'操作',key:'action',render:(text, record)=>{
			let ifDisable=this.checkFav(record.id)
			return (<span>
				<Link to={"./editMusic/"+record.id}>修改</Link>
				<Button onClick={this.addFav.bind(this,record.id)} disabled={ifDisable} >加至试听列表</Button>
				</span>)
		}}]
		return(

			<div style={{margin:'auto',width:'400px'}}>
			<div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
				<div style={{fontSize:40}}><Link to="/"><Icon type="arrow-left" /></Link></div>
				<div><Link to="/addMusic"><Button>创建歌曲</Button></Link></div>
			</div>
			<Table 
			  columns={columns}
			  dataSource={this.state.library}
			  pagination={{pageSize:10}}
			  rowKey={record=>record.id}
			/>
			</div>
			)
	}
}

function mapStateToProps(state){
	return state
}
export default connect(mapStateToProps)(Library)