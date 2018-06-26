/**
 * Created by wangdan on 2018/5/14.
 */
import React , { Component } from 'react';
import axios from 'axios';
import "./index.scss"

class productDetail extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			data:'',
			list:'',
			secondList:'',
			firstNum:'',
			secondtNum:''
		}
	}
	componentDidMount(){

			let self = this;
			let productId = self.props.match.params.cid;
			// 获取商品详情
			axios({
				method:'get',
				url:'/manage/product/detail.do',
				params:{
					productId:productId
				}
			}).then(function(response){
				// console.log(response.data);
				let a =  response.data.data.parentCategoryId;
				secondN(a)
				self.setState({
					data:response.data,
					firstNum:response.data.data.parentCategoryId,
					secondtNum:response.data.data.categoryId
				})
			}).catch(function(error){
				console.log(error)
			})
			// 获取商品一级分类  （初始化）
			axios({
				method:'get',
				url:'/manage/category/get_category.do',
				params:{
					categoryId:0
				}
			}).then(function(response){
				// console.log(response.data);
				self.setState({
					list:response.data
				})
			}).catch(function(error){
				console.log(error)
			});


			function secondN(firstNum){
				// 获取商品二级分类  （初始化）
				axios({
					method:'get',
					url:'/manage/category/get_category.do',
					params:{
						categoryId:firstNum
					}
				}).then(function(response){
					// console.log(response.data);

					self.setState({
						secondList:response.data.data
					})

				}).catch(function(error){
					console.log(error);
				})
			}
	}
	changeList(e){
		var self = this;
		console.log(e.target.value);
		self.setState({
			firstNum:e.target.value,
		})
		axios({
			method:'get',
			url:'/manage/category/get_category.do',
			params:{
				categoryId:e.target.value
			}
		}).then(function(response){
			// console.log(response.data);
			self.setState({
				secondList:response.data.data,
			})

		}).catch(function(error){
			console.log(error);
		})
	}
	changeSecondList(e){
		console.log(e.target.value);
		this.setState({
			secondtNum:e.target.value
		})
	}
	render(){
		let p,list,s,img;
		// 详情数据
		let detail_data = this.state.data;
		let secondList = this.state.secondList;

		if(detail_data){

			// 一级详情
			if(this.state.list){
				let list_data = this.state.list.data;
				// console.log(list_data)
				list = list_data.map((v,i)=>{
						return (
							<option value={v.id} key={i} >{v.name}</option>
						)
				})
			}else{
				list = null;
			}
			// 二级详情
			if(secondList){
				s = secondList.map((v,i)=>{
					return (
						<option value={v.id} key={i} >{v.name}</option>
					)
				})
			}else{
				s = null;
			}

			//商品图片
			let imageList  = detail_data.data.subImages.split(',');
			if(detail_data.data.subImages){
				if(imageList){
					img = imageList.map((v,i)=>{
						// console.log(v)
						return (
							<img src={'' + detail_data.data.imageHost + v} alt="" key={i} className="img-shop"/>
						)
					})
				}else{
					img = <img src={'' + detail_data.data.imageHost + detail_data.data.subImages} alt="" key={i} className="img-shop"/>
				}
			}

			p = <div className="form-horizontal">
						<div className="form-group form-group-lg">
							<label className="col-sm-2 control-label" htmlFor="formGroupInputLarge">商品名称</label>
							<div className="col-sm-10">
								<input className="form-control" readOnly type="text" id="formGroupInputLarge" placeholder="" value={detail_data.data.name}/>
							</div>
						</div>
						<div className="form-group form-group-sm">
							<label className="col-sm-2 control-label" htmlFor="formGroupInputSmall">商品描述</label>
							<div className="col-sm-10">
								<input className="form-control" readOnly type="text" id="formGroupInputSmall" placeholder="" value={detail_data.data.subtitle}/>
							</div>
						</div>
						<div className="form-group form-group-sm">
							<label className="col-sm-2 control-label" htmlFor="formGroupInputSmall">当前状态</label>
							<div className="col-sm-10">
								{
									detail_data.data.status == 1 ?<input className="form-control" readOnly type="text" id="formGroupInputSmall" placeholder="" value="在售"/>:
										<input className="form-control" readOnly type="text" id="formGroupInputSmall" placeholder="" value="已下架"/>
								}

							</div>
						</div>
						<div className="form-group form-group-sm">
							<p className="col-sm-2 control-label">所属分类</p>
							{/*{firstNum}*/}
							<select  id="" className="col-sm-3" onChange={(e)=>{this.changeList(e)}} value={this.state.firstNum}>
								<option >请选择类型</option>
								{list}
							</select>
							<select  id="" className="col-sm-3" onChange={(e)=>{this.changeSecondList(e)}} value={this.state.secondtNum}>
								<option value="">请选择二级分类</option>
								{s}
							</select>
						</div>
						<div className="form-group form-group-sm">
							<label className="col-sm-2 control-label" htmlFor="formGroupInputSmall">商品价格</label>
							<div className="col-sm-10">
								<input className="form-control" readOnly type="text" id="formGroupInputSmall" placeholder="" value={detail_data.data.price}/>
							</div>
						</div>
						<div className="form-group form-group-sm">
							<label className="col-sm-2 control-label" htmlFor="formGroupInputSmall">商品库存</label>
							<div className="col-sm-10">
								<input className="form-control" readOnly type="text" id="formGroupInputSmall" placeholder="" value={detail_data.data.stock}/>
							</div>
						</div>
						<div className="form-group form-group-sm">
							<label className="col-sm-2 control-label" htmlFor="formGroupInputSmall">商品图片</label>
							<div className="col-sm-10">
								{img}
								{/*<img src={'' + detail_data.data.imageHost + detail_data.data.subImages} alt=""/>*/}
							</div>
						</div>
						<div className="form-group form-group-sm">
							<label className="col-sm-2 control-label" htmlFor="formGroupInputSmall">商品详情</label>
							<div className="col-sm-10">
								<div dangerouslySetInnerHTML={{__html: detail_data.data.detail}} className="detail-box"></div>
							</div>
						</div>
					</div>
		}else{
			p = null
		}

		return (
			<div id="page-wrapper">
				<div className="row">
					<h2>商品详情</h2>
					{p}
				</div>
			</div>
		)
	}
}

export default productDetail;