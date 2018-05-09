import React ,{ Component } from 'react';
import './theme.css'
import TopNav from 'component/topnav/index.jsx';
import SildeNav from 'component/slidenav/index.jsx'





class Layout extends React.Component{
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div id="wrapper">
				<TopNav/>
				<SildeNav/>
				{this.props.children}
			</div>
		)
	}
}

export default Layout;
