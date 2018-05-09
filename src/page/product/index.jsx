/**
 * Created by wangdan on 2018/5/9.
 */
import React ,{ Component } from 'react';
import './index.scss';

class Product extends React.Component{
	constructor(props){
		super(props)
	}
	componentWillMount(){
		document.title = '商品' + '- HAPPY MMALL'
	}
	render(){
		return (
			<div>商品管理</div>
		)
	}
}

export default Product;