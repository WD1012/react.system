/**
 * Created by wangdan on 2018/5/9.
 */
import React, {Component} from 'react';
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
	ChangeInput(e){
		let InputName = e.target.name,
			InputValue = e.target.value;

		this.setState({
			[InputName]:InputValue,
			flag:true
		})
	}
	ClickBtn(){
		let self = this;
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
			}).catch(function(error){
				console.log(error)
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