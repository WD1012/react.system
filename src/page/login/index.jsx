/**
 * Created by wangdan on 2018/5/9.
 */
import React, {Component} from 'react';
import { history } from "react-router-dom";
import axios from 'axios';
import './index.scss'


class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			flag:false,
			username:'',
			password:''
		}
	}
	componentWillMount(){
		document.title = '登录' + '- HAPPY MMALL'
	}
	ChangeInput(e){
		let InputName = e.target.name,
			InputValue = e.target.value;
		this.setState({
			[InputName]:InputValue,
			flag:true
		})
	}
	GetQueryString(key) {
		let reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
		let result = window.location.search.substr(1).match(reg);
		return result?decodeURIComponent(result[2]):null;
	}
	ClickBtn(){
		let self = this;
		let reduce =self.GetQueryString("reduce");
		if(this.state.flag){
			axios({
				method:'post',
				url:'/manage/user/login.do',
				params:{
					username:self.state.username,
					password:self.state.password
				}
			}).then(function(response){
				console.log(response.data)
				if(response.data.status == 0){
					// 登录成功
					sessionStorage.setItem('username',response.data.data.username)
					self.props.history.push(reduce);
				}else if(response.data.status == 10){
					//没有登录状态，强制登录
					alert('未登录');
				}else{
					alert(response.data.msg);
				}
			}).catch(function(error){
				console.log(error);
			})
		}else{
			return false;
		}
	}
	render() {

		return (
			<div className="row login-ind">
				<div className="col-md-4 col-md-offset-4">
					<div className="panel panel-default">
						<div className="panel-heading">欢迎登录 - MMALL管理系统</div>
						<div className="panel-body">
							<div>
								<div className="form-group">
									<input type="text" name="username" className="form-control" placeholder="用户名" onChange={(e)=>{this.ChangeInput(e)}} />
								</div>
								<div className="form-group">
									<input type="password" name="password" className="form-control" placeholder="密码" onChange={(e)=>{this.ChangeInput(e)}}/>
								</div>
								<button className="btn btn-default btn-login" onClick={()=>this.ClickBtn()}>登录</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}


export default Login;