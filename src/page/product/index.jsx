/**
 * Created by wangdan on 2018/5/9.
 */
import React ,{ Component } from 'react';
import axios from 'axios';
import { Pagination } from 'antd';
import './index.scss';

class Product extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: '',
			wideManage:'',
			pageNum: 1,
			index: 0,
			detail: '',
			pages: 0
		}
	}

	// title
	componentWillMount() {
		document.title = '商品' + '- HAPPY MMALL'
	}

	// 分页
	onChange(pageNumber) {
		// console.log('Page: ', pageNumber);
		// 改变分页重新渲染数据
		let self = this;
		axios({
			method: 'get',
			url: '/manage/product/list.do',
			params: {
				pageNum: pageNumber,
				pageSize: 10,
			}
		}).then(function (response) {
			// console.log(response.data)
			self.setState({
				list: response.data.data.list
			})
			if(response.data.status == 0){
				console.log(1234)
			}
		}).catch(function (error) {
			console.log(error)
		})
	}

	componentDidMount() {
		let self = this;
		// 初始化商品管理
		axios({
			method: 'get',
			url: '/manage/product/list.do',
			params: {
				pageNum: self.state.pageNum,
				pageSize: 10,
			}
		}).then(function (response) {
			// console.log(response.data)
			self.setState({
				list: response.data.data.list,
				pages: response.data.data.total
			})
			console.log(response.data)
		}).catch(function (error) {
			console.log(error);
		})

		// 初始化品类管理

		axios({
			method:'get',
			url:'/manage/category/get_category.do',
			params:{
				categoryId:0
			}
		}).then(function(response){
			// console.log(response.data.data);
			self.setState({
				wideManage:response.data.data
			})
		}).catch(function(error){
			console.log(error);
		})
	}

	// 判断查询类型
	ChangeSelect(e) {
		let self = this;
		self.setState({
			index: e.target.value
		})
	}

	// 查询
	LookSearch() {
		let self = this;
		let importWord = self.refs.importWord.value;
		if (self.state.index == 0) {
			axios({
				method: 'get',
				url: '/manage/product/search.do',
				params: {
					listType: 'search',
					productId: importWord,
					pageNum: 1,
					pageSize: 10,
				}
			}).then(function (response) {
				// console.log(response.data)
				self.setState({
					list: response.data.data.list
				})
			}).catch(function (error) {
				console.log(error)
			})
		} else if (self.state.index == 1) {
			axios({
				method: 'get',
				url: '/manage/product/search.do',
				params: {
					listType: 'search',
					productName: importWord,
					pageNum: 1,
					pageSize: 10,
				}
			}).then(function (response) {
				// console.log(response.data)
				self.setState({
					list: response.data.data.list
				})
			}).catch(function (error) {
				console.log(error)
			})
		}
	}

	// 状态  （上架下架切换）
	TClick(e) {
		let self = this;
		let status_id;
		let productId = e.target.getAttribute('data-proid');
		let status = e.target.getAttribute('data-status');
		if (status == 1) {
			status_id = 2;
		} else {
			status_id = 1;
		}
		let msg = "确认产品要上架吗";
		if (confirm(msg) == true) {
			axios({
				method: 'get',
				url: '/manage/product/set_sale_status.do',
				params: {
					productId: productId,
					status: status_id
				}
			}).then(function (response) {
				// console.log(response.data)
				if (response.data.status == 0) {
					alert(response.data.data);
					self.componentDidMount();
				} else if (response.data.status == 1) {
					alert(response.data.data)
				}
			}).catch(function (error) {
				console.log(error)
			})
			return true;
		} else {
			return false;
		}

	}

	render() {
		// console.log(this.props.match.params.id);

		if (this.props.match.params.id == 1) {
			let t, p;
			let self = this;
			let totalNum = self.state.pages;
			// console.log(typeof(totalNum));
			// console.log(totalNum)
			if (totalNum) {
				p = <Pagination showQuickJumper defaultCurrent={1} total={totalNum} onChange={(e) => {
					this.onChange(e)
				}}/>
			} else {
				p = null
			}
			if (this.state.list) {
				t = this.state.list.map((v, i) => {
					return (
						<tr key={i}>
							<td>{v.id}</td>
							<td>{v.name}</td>
							<td>{v.price}</td>
							<td><span>{v.status == 1 ? '在售' : '已下架' }</span>
								<button className="btn btn-warning btn-j" data-proid={v.id} data-status={v.status}
										onClick={(e) => {
											this.TClick(e)
										}}>{v.status == 1 ? '下架' : '上架' }</button>
							</td>
							<td>
								<a data-id={v.id} href={"/product-detail/" + v.id}>查看</a>
								<span>编辑</span>
							</td>
						</tr>
					)
				})
			} else {
				t = null;
			}
			return (
				<div id="page-wrapper">
					<div className="row top-manger">
						<div className="col-md-2">
							<h2>商品管理</h2>
						</div>
						<button className="btn btn-default btn-info col-md-2 col-md-offset-8"><a href="/product-save">添加商品</a>
						</button>
					</div>
					<div className="row">
						<div className="col-md-3">
							<select className="form-control" onChange={(e) => {
								this.ChangeSelect(e)
							}}>
								<option value="0">按商品id查询</option>
								<option value="1">按商品名称查询</option>
							</select>
						</div>
						<div className="form-group col-md-3">
							<input type="text" className="form-control" placeholder="关键词" ref="importWord"/>
						</div>
						<button className="btn btn-default col-md-1" onClick={(e) => {
							this.LookSearch()
						}}>查询
						</button>
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
					<div>
						{p}
					</div>
				</div>
			)

		}else if(this.props.match.params.id == 2){
			let w;
			if(this.state.wideManage){
				let wideManages = this.state.wideManage;
				w = wideManages.map((v,i)=>{
					return (
						<tr key={i}>
							<td>{v.id}</td>
							<td>{v.name}</td>
							<td>
								<a href="">修改名称</a>
								<a href="">查看其子品类</a>
							</td>
						</tr>
					)
				})
			}else{
				w = null;
			}
			return (
				<div id="page-wrapper">
					<div className="row top-manger">
						<div className="col-md-2">
							<h2>品类管理</h2>
						</div>
						<div>
							<table className="table table-bordered">
								<thead>
									<tr>
										<td>品类ID</td>
										<td>品类名称</td>
										<td>操作</td>
									</tr>
								</thead>
								<tbody>
								    {w}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)
		}
	}
}

export default Product;