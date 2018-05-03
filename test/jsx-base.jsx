/**
 * Created by wangdan on 2018/5/3.
 */
import React from 'react';
import ReactDOM from 'react-dom';

// 行内样式
let style = {
	color:'red',
	fontSize:'20px'
}
// let jsx = <div className="jsx-ind" style={style}>jsx.........</div>;


let name = 'Reson';
let flag = true;
// 条件判断
// let jsx = (<div className="jsx-ind">
// 		{
// 			flag ? <p>I am {name}</p> : <p>I am not {name}</p>
// 		}
// 	</div>
// )


// 循环遍历
let names = ['魏敏','冯爱','刘婷婷'];
let jsx = (<div>
	{
		names.map((v,i)=>{
			return <p key={i}>{v}</p>
		})
	}
</div>);

ReactDOM.render(
	jsx,
	document.getElementById('app')
)