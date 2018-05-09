/**
 * Created by wangdan on 2018/5/9.
 */
import React ,{ Component } from 'react';
import './index.scss';

class Order extends React.Component{
	constructor(props){
		super(props)
	}
	componentWillMount(){
		document.title = '订单管理' + '- HAPPY MMALL'
	}
	render(){
		return (
			<div className="order">订单管理</div>
		)
	}
}

export default Order;