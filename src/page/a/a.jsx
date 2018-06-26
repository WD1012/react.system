/**
 * Created by wangdan on 2018/5/9.
 */
import React ,{ Component } from 'react';
import { Pagination } from 'antd';
import axios from 'axios'
import './index.scss'

function timestampToTime(timestamp) {
	var date = new Date(timestamp),//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	Y = date.getFullYear() + '/',
	M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/',
	D = date.getDate() + ' ',
	h = date.getHours() + ':',
	m = date.getMinutes() + ':',
	s = date.getSeconds();
	return Y+M+D+h+m+s;
}


class User extends React.Component{
	constructor(props){
		super(props);
		this.state={
			list : '',
			total:0,
			page:1
		}
	}
	componentWillMount(){
		document.title = '用户列表' + '- HAPPY MMALL'
	}
	changeList(){
		let self = this;
		axios({
			method:'get',
			url:'/manage/user/list.do',
			params:{
				pageSize:10,
				pageNum:self.state.page
			}
		}).then(function(response){
			// console.log(response.data.data.list);
			self.setState({
				list:response.data.data.list,
				total:response.data.data.total
			})
		}).catch(function(error){
			console.log(error);
		})
	}
	componentDidMount(){
		let self = this;
		self.changeList();
	}
	changePage(page){
		console.log(page);
		let self = this;
		self.setState({
			page:page
		},self.changeList())
	}
	render(){
		let self = this;
		let userList ;
		let a = self.state.list;
		let totalPage = self.state.total;
		if(a){
			userList =	a.map((v,i)=>{
				return (<tr key={i}>
					<td>{v.id}</td>
					<td>{v.username}</td>
					<td>{v.email}</td>
					<td>{v.phone}</td>
					<td>{ timestampToTime(v.updateTime) }</td>
				</tr>)
			})
		}else{
			userList = null
		}
		return (
			<div id="page-wrapper">
				<h2>用户列表</h2>
				<div className="user-list">
					<table className="table table-bordered">
						<thead>
							<tr>
								<td>ID</td>
								<td>用户名</td>
								<td>邮箱</td>
								<td>电话</td>
								<td>注册时间</td>
							</tr>
						</thead>
						<tbody>
						{userList}
						</tbody>
					</table>
				</div>
				<Pagination defaultCurrent={1} total={totalPage} onChange={(page)=>{this.changePage(page)}} showQuickJumper/>
			</div>
		)
	}
}

export default User;




