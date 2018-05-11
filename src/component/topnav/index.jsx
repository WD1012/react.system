/**
 * Created by wangdan on 2018/5/7.
 */
import React , { Component } from 'react';
import { Link } from 'react-router-dom';


class TopNav extends React.Component {
	constructor(props) {
		super(props);
		this.state ={
			userName : '',
			reduce:''
		}
	}
	componentWillMount(){
		let self = this;
		self.setState({
			userName:localStorage.getItem('username')
		})
	}
	ClickT(){
		localStorage.setItem('username','');
	}
	render() {
		let reduce  = window.location.pathname;
		return (
			<div className="navbar navbar-default top-navbar" role="navigation">
				<div className="navbar-header">
					<a className="navbar-brand" href="/index.html"><b>HAPPY </b>MMALL</a>
				</div>

				<ul className="nav navbar-top-links navbar-right">
					<li className="dropdown">
						<a className="dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false">
							<i className="fa fa-user fa-fw"></i>
							{
								this.state.userName ?
									<span>欢迎，{this.state.userName}</span> :
									<span>欢迎</span>
							}
							<i className="fa fa-caret-down"></i>
						</a>

						<ul className="dropdown-menu dropdown-user">
							<li className="dropdown-item" onClick={()=> {this.ClickT()}}>
								<a href={'/login?reduce='+reduce }>
									<i className="fa fa-sign-out fa-fw"></i> 退出登录
								</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		)
	}
}

export default TopNav;