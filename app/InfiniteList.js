import { List, Spin } from 'antd';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styles from './InfiniteList.css'

class InfiniteList extends React.Component {
  constructor(props){
    super(props)
    this.state={
    totalData: props.data,
    // loading: false,
    // hasMore: true,
    // pageSize:2,
    // currentPage:1,
    displayData:[]
    }
  }

  componentDidMount(){
    const {totalData, currentPage, pageSize} =this.state
    this.setState({displayData:totalData})
  }

  handleInfiniteOnLoad ()  {
    // console.log(111)
    // const {totalData, currentPage, pageSize} =this.state
    // this.setState({
    //   loading: true,
    // });
    // let newPage = currentPage+1
    // let newData = totalData.slice(0, pageSize*newPage)
    // if(newData.length>=totalData.length){
    //   this.setState({hasMore:false, loading:false})
    //   return
    // }
    // this.setState({
    //   currentPage:newPage, displayData:newData, loading:false
    // })
  }
  render() {
    return (
      <div className={styles.container}>
          <List
            dataSource={this.state.displayData}
            renderItem={item => (
              <List.Item style={{cursor:'pointer'}} onClick={this.props.handleClick.bind(this,item.id)}>
              {item.name}           
              </List.Item>
            )}
          >
          </List>
      </div>
    );
  }
}
export {InfiniteList}