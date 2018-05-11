/**
 * Created by wangdan on 2018/5/9.
 */
import React ,{ Component } from 'react';
import axios from 'axios';
import './index.scss';

class Product extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			list:''
		}
	}
	componentWillMount(){
		document.title = '商品' + '- HAPPY MMALL'
	}
	componentDidMount(){
		let self = this;
		axios({
			method:'get',
			url:'/manage/product/list.do',
			params:{
				pageNum:1,
				pageSize:10,
			}
		}).then(function(response){
			console.log(response.data)
			self.setState({
				list:response.data.data.list
			})
		}).catch(function(error){
			console.log(error)
		})
	}
	ClickDetail(e){
		let self = this;
		let productId = e.target.getAttribute('data-id');
		axios({
			method:'get',
			url:'/manage/product/detail.do',
			params:{
				productId:productId
			}
		}).then(function(response){
			console.log(response.data)
		}).catch(function(error){
			console.log(error)
		})
	}
	render(){
		let t;
		if(this.state.list){
			 t = this.state.list.map((v,i)=>{
				return (
					<tr key={i}>
						<td>{v.id}</td>
						<td>{v.name}</td>
						<td>{v.price}</td>
						<td><span>{v.status == 1 ? '在售' : '已下架' }</span><button className="btn btn-warning btn-j">{v.status == 1 ? '下架' : '上架' }</button></td>
						<td>
							<span data-id={v.id} onClick={(e)=>{this.ClickDetail(e)}}>查看</span>
							<span>编辑</span>
						</td>
					</tr>
				)
			})
		}else{
			t = null;
		}
		return (
			<div id="page-wrapper">
				<div className="row top-manger">
					<div className="col-md-2">
						<h2>商品管理</h2>
					</div>
					<button className="btn btn-default btn-info col-md-2 col-md-offset-8">添加商品</button>
				</div>
				<div className="row">
					<div className="col-md-3">
						<select className="form-control">
							<option>按商品id查询</option>
							<option>按商品名称查询</option>
						</select>
					</div>
					<div className="form-group col-md-3">
						<input type="text" className="form-control" placeholder="关键词"/>
					</div>
					<button className="btn btn-default col-md-1">查询</button>
				</div>
				<div>
					<table className="table table-bordered">
						<tbody>
							<tr>
								<td>ID</td>
								<td>信息</td>
								<td>价格</td>
								<td>状态</td>
								<td>操作</td>
							</tr>
							{t}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

export default Product;