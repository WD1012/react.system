/**
 * Created by wangdan on 2018/5/9.
 */
import React ,{ Component } from 'react';


class PageTitle extends React.Component{
	constructor(props){
		super(props)
	}
	componentWillMount(){
		document.title = this.props.title + '- HAPPE MMALL';
	}
	render(){
		return (
			<div className="row">
				<div className="row-md-12">
					<h1 className="page-header">{this.props.title}</h1>
				</div>
			</div>

		)
	}
}

export default PageTitle;