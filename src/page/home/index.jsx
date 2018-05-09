/**
 * Created by wangdan on 2018/5/3.
 */
import React,{ Component } from 'react';
import PageTitle from 'component/page-title/index.jsx'

class Home extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div id="page-wrapper">
				<PageTitle title="首页"/>
				<div className="row">
					<div className="col-md-12">
						<button>测试</button>
					</div>
				</div>
			</div>
		)
	}
}


export default Home;