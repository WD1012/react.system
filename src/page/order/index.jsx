/**
 * Created by wangdan on 2018/5/9.
 */
import React ,{ Component } from 'react';
import axios from 'axios';
import { Pagination } from 'antd';
import './index.scss';

class Order extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			list : null,
			orderTotal:0
		}
	}
	componentWillMount(){
		document.title = '订单管理' + '- HAPPY MMALL'
	}
	componentDidMount(){
		let self = this;
		// 订单列表初始化
		axios({
			method:'get',
			url:'/manage/order/list.do',
			params:{
				pageSize:10,
				pageNum:1
			}
		}).then(function(response){
			// console.log(response.data)
			if(response.data.status == 0){
				self.setState({
					list : response.data.data.list,
					orderTotal:response.data.data.total
				})
			}
		}).catch(function(error){
			console.log(error)
		})
	}
	changeOrder(page){
		let self = this;
		// 分页点击展示订单列表
		axios({
			method:'get',
			url:'/manage/order/list.do',
			params:{
				pageSize:10,
				pageNum:page
			}
		}).then(function(response){
			// console.log(response.data)
			if(response.data.status == 0){
				self.setState({
					list : response.data.data.list,
					orderTotal:response.data.data.total
				})
			}
		}).catch(function(error){
			console.log(error)
		})
	}
	clickBtn(e){
		let self = this;
		let orderNo = this.refs.orderNum.value;
		// console.log(this.refs.orderNum.value);
		axios({
			method:'get',
			url:'/manage/order/search.do',
			params:{
				orderNo:orderNo
			}
		}).then(function(response){
			// console.log(response.data)
			if(response.data.status == 0){
				self.setState({
					list : response.data.data.list,
					orderTotal:response.data.data.total
				})
			}
		}).catch(function(error){
			console.log(error)
		})
	}
	render(){
		let orderList,pagination;
		if(this.state.list){
			let List = this.state.list;
			orderList = List.map((v,i)=>{
				return (
					<tr key={i}>
						<td>{v.orderNo}</td>
						<td>{v.receiverName}</td>
						<td>{v.statusDesc}</td>
						<td>￥{v.payment}</td>
						<td>{v.createTime}</td>
						<td><a href="">查看</a></td>
					</tr>
				)
			})
		}else{
			orderList = null;
		}
		// console.log(this.state.orderTotal)
		if(this.state.orderTotal > 10){
			pagination = <Pagination defaultCurrent={1} total={this.state.orderTotal}  onChange={(page)=>{this.changeOrder(page)}} showQuickJumper/>
		}else{
			pagination =null
		}
		return (
			<div id="page-wrapper">
				<h2 className="order">订单管理</h2>
				<div>
					<select>
						<option value="">根据订单号查询</option>
					</select>
					{/*onChange={(e)=>{this.changeOrderNum(e)}}*/}
					<input type="text" ref="orderNum"/>
					<button onClick={(e)=>{this.clickBtn(e)}}>查询</button>
				</div>
				<div>
					<table className="table table-bordered">
						<thead>
							<tr>
								<td>订单号</td>
								<td>收件人</td>
								<td>订单状态</td>
								<td>订单总价</td>
								<td>创建时间</td>
								<td>操作</td>
							</tr>
						</thead>
						<tbody>
							{ orderList }
						</tbody>
					</table>
				</div>
				<div>
					{pagination}
				</div>
			</div>
		)
	}
}

export default Order;