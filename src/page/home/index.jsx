/**
 * Created by wangdan on 2018/5/3.
 */
import React,{ Component } from 'react';
import PageTitle from 'component/page-title/index.jsx';
import './index.scss';
import axios from 'axios';

class Home extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			orderCount:null,
			productCount:null,
			userCount:null
		}
	}
	componentDidMount(){
		let self = this;
		axios({
			method:'get',
			url:'/manage/statistic/base_count.do',
			params:{
				username:'wiki'
			}
		}).then(function(response){
			// console.log(response.data);
			let data = response.data;
			if(data.status == 0){
				self.setState({
					orderCount:data.data.orderCount,
					productCount:data.data.productCount,
					userCount:data.data.userCount
				})
			}
		}).catch(function(error){
			console.log(error);
		})
	}
	render(){
		return (
			<div id="page-wrapper" className="page-wrapper">
				<PageTitle title="首页"/>
				<div className="row">
					<div className="col-md-3 box-bg1 box-num">
						<p>{this.state.orderCount}</p>
						<p className="num-p"><i></i>用户总数</p>
					</div>
					<div className="col-md-3 box-bg2 box-num">
						<p>{this.state.productCount}</p>
						<p className="num-p"><i></i>商品总数</p>
					</div>
					<div className="col-md-3 box-bg3 box-num">
						<p>{this.state.userCount}</p>
						<p className="num-p"><i></i>订单总数</p>
					</div>
				</div>
			</div>
		)
	}
}


export default Home;








