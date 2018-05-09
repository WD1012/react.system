/**
 * Created by wangdan on 2018/5/9.
 */
import React ,{ Component } from 'react';
import './index.scss'

class User extends React.Component{
	constructor(props){
		super(props)
	}
	componentWillMount(){
		document.title = '用户列表' + '- HAPPY MMALL'
	}
	render(){
		return (
			<div className="user-list">用户列表</div>
		)
	}
}

export default User;