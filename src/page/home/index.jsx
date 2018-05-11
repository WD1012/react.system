/**
 * Created by wangdan on 2018/5/3.
 */
import React,{ Component } from 'react';
import PageTitle from 'component/page-title/index.jsx';
import './index.scss'

class Home extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div id="page-wrapper" className="page-wrapper">
				<PageTitle title="首页"/>
				<div className="row">
					<div className="col-md-3 box-bg1 box-num">
						<p></p>
						<p className="num-p"><i></i>用户总数</p>
					</div>
					<div className="col-md-3 box-bg2 box-num">
						<p></p>
						<p className="num-p"><i></i>商品总数</p>
					</div>
					<div className="col-md-3 box-bg3 box-num">
						<p></p>
						<p className="num-p"><i></i>订单总数</p>
					</div>
				</div>
			</div>
		)
	}
}


export default Home;