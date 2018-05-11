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
			<div id="page-wrapper">
				<div className="user-list">
					<table className="table table-bordered">
						<tbody>
							<tr>
								<td>ID</td>
								<td>用户名</td>
								<td>邮箱</td>
								<td>电话</td>
								<td>注册时间</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

export default User;