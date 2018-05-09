/**
 * Created by wangdan on 2018/5/3.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link,Switch,Redirect } from "react-router-dom";

// 页面
import Home from 'page/home/index.jsx';
import Product from 'page/product/index.jsx';
import User from 'page/user/index.jsx';
import Order from 'page/order/index.jsx';

import Layout from 'component/layout/index.jsx';

class App extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<Router>
				<Layout>
					<Switch>
						<Route exact path="/" component={ Home }/>
						<Route exact path="/product" component={ Product }/>
						<Route exact path="/product-category" component={ Product }/>
						<Route exact path="/order" component={ Order }/>
						<Route exact path="/user" component={ User }/>
						{/*<Redirect from="*"	to="/"/>*/}
					</Switch>
				</Layout>
			</Router>

		)
	}
}


ReactDOM.render(
	<App/>,
	document.getElementById('app')
)