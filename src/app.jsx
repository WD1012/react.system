/**
 * Created by wangdan on 2018/5/3.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link,Switch,Redirect } from "react-router-dom";
import 'antd/dist/antd.css';


// 页面
import Home from 'page/home/index.jsx';
import Product from 'page/product/index.jsx';
import User from 'page/a/a.jsx';
import Order from 'page/order/index.jsx';
import Login from 'page/login/index.jsx';
import Layout from 'component/layout/index.jsx';
import productDetail from 'page/productDetail/index.jsx'
import productSave from 'page/productSave/index.jsx'


class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username:''
		}
	}
	componentWillMount(){
		var username = sessionStorage.getItem('username');
		// console.log(username);
		this.setState({

		})
	}
	render(){
		return (
			<Router>
				<Switch>
					<Route  exact path="/login" component={ Login }/>
					<Route   path="/" render={()=>(
						<Layout>
							<Switch>
								<Route exact path="/" component={ Home }/>
								<Route exact path="/product/:id"  component={ Product }/>
								<Route exact path="/product-detail/:cid" component={ productDetail }/>
								<Route exact path="/product-save" component={ productSave }/>
								<Route exact path="/order" component={ Order }/>
								<Route  path="/a/a" component={ User }/>
								<Redirect exact from="/a" to="/a/a"/>
							</Switch>
						</Layout>
						)
					}/>
				</Switch>
			</Router>
		)
	}
}


ReactDOM.render(
	<App/>,
	document.getElementById('app')
)





