/**
 * Created by wangdan on 2018/5/7.
 */
import React , { Component } from 'react';
import { Link , NavLink } from 'react-router-dom';

class SildeNav extends React.Component {
	constructor(props) {
		super(props);

	}
	render() {
		return (
			<div className="navbar-default navbar-side">
				<div className="sidebar-collapse">
					<ul className="nav" id="main-menu">
						<li>
							<NavLink exact to="/" activeClassName="active-menu">
								<i className="fa fa-bar-chart-o"></i>
								<span>首页</span>
							</NavLink>
						</li>
						<li className="active">
							<Link to="/product/1">
								<i className="fa fa-list"></i>
								<span>商品</span>
								<span className="fa arrow"></span>
							</Link>
							<ul className="nav nav-second-level collapse in">
								<li>
									<NavLink to="/product/1" activeClassName="active-menu">商品管理</NavLink>
								</li>
								<li>
									<NavLink to="/product/2" activeClassName="active-menu">品类管理</NavLink>
								</li>
							</ul>
						</li>
						<li className="active">
							<Link to="/order">
								<i className="fa fa-check-square-o fa-fw"></i>
								<span>订单</span>
								<span className="fa arrow"></span>
							</Link>
							<ul className="nav nav-second-level collapse in">
								<li>
									<NavLink to="/order" activeClassName="active-menu">订单管理</NavLink>
								</li>
							</ul>
						</li>
						<li>
							<Link to="/a/a">
								<i className="fa fa-user-o fa-fw"></i>
								<span>用户</span>
							</Link>
							<ul className="nav nav-second-level collapse in">
								<li>
									<NavLink to="/a/a" activeClassName="active-menu">用户列表</NavLink>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default SildeNav;