/**
 * Created by wangdan on 2018/5/31.
 */
import React from 'react';
import axios from 'axios';
import "./index.scss";



class productSave extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: '',
			categoryId: 1,
			goodsName: '',
			goodsSub: '',
			subImages: '',
			detail: '',
			goodsPrice: '',
			goodsStock: '',
			status: 1,

			htmlContent: `<h1>Yankees, Peeking at the Red Sox, Will Soon Get an Eyeful</h1>
              <p>Whenever Girardi stole a glance, there was rarely any good news for the Yankees. 
              While Girardi’s charges were clawing their way to a split of their four-game series 
              against the formidable Indians, the Boston Red Sox were plowing 
              past the rebuilding Chicago White Sox, sweeping four games at Fenway Park.</p>`,
			markdownContent: "## HEAD 2 \n markdown examples \n ``` welcome ```",
			responseList: []

		}
	}

	componentDidMount() {
		let self = this;
		axios({
			method: 'get',
			url: '/manage/category/get_category.do',
			params: {
				categoryId: 0
			}
		}).then(function (response) {
			// console.log(response.data.data);
			self.setState({
				data: response.data.data
			})
		}).catch(function (error) {
			console.log(error)
		})



	}

	changeAdd(e) {
		let self = this;
		let goodsName = e.target.name,
			goodsValue = e.target.value;
		self.setState({
			[goodsName]: goodsValue
		})
	}
	addBtn() {
		var self = this;
		axios({
			method: 'get',
			url: '/manage/product/save.do',
			params: {
				categoryId: self.state.categoryId,
				name: self.state.goodsName,
				subtitle: self.state.goodsSub,
				subImages: self.state.subImages,
				detail: self.state.detail,
				price: self.state.goodsPrice,
				stock: self.state.goodsStock,
				status: self.state.status
			}
		}).then(function (response) {
			// console.log(response.data)
			if (response.data.status == 0) {
				alert(response.data.data)
				window.location.href ="/product"
			}
		}).catch(function (error) {
			console.log(error)
		})
	}


	receiveHtml(content) {
		console.log("recieved HTML content", content);
		this.setState({responseList:[]});
	}


	render() {
		let policy = "";
		const uploadProps = {
			action: "http://v0.api.upyun.com/devopee",
			onChange: this.onChange,
			listType: 'picture',
			fileList: this.state.responseList,
			data: (file) => {

			},
			multiple: true,
			beforeUpload: this.beforeUpload,
			showUploadList: true
		}




		let list;
		let data = this.state.data;
		if (data) {
			list = data.map((v, i) => {
				return (
					<option value={v.id} key={i}>{v.name}</option>
				)
			})
		} else {
			list = null
		}
		return (
			<div id="page-wrapper">
				<h2>商品管理 -- 添加商品</h2>
				<div className="form-horizontal">
					<div className="form-group form-group-lg">
						<label className="col-sm-2 control-label" htmlFor="formGroupInputLarge">商品名称</label>
						<div className="col-sm-10">
							<input className="form-control" type="text" id="formGroupInputLarge" placeholder=""
								   name="goodsName" onChange={(e) => {
								this.changeAdd(e)
							}}/>
						</div>
					</div>
					<div className="form-group form-group-sm">
						<label className="col-sm-2 control-label" htmlFor="formGroupInputSmall">商品描述</label>
						<div className="col-sm-10">
							<input className="form-control" type="text" id="formGroupInputSmall" placeholder=""
								   name="goodsSub" onChange={(e) => {
								this.changeAdd(e)
							}}/>
						</div>
					</div>
					<div className="form-group form-group-sm">
						<p className="col-sm-2 control-label">所属分类</p>
						<select id="" className="col-sm-3">
							<option >请选择一级品类</option>
							{list}
						</select>
					</div>
					<div className="form-group form-group-sm">
						<label className="col-sm-2 control-label" htmlFor="formGroupInputSmall">商品价格</label>
						<div className="col-sm-10">
							<input className="form-control" type="text" id="formGroupInputSmall" placeholder=""
								   name="goodsPrice" onChange={(e) => {
								this.changeAdd(e)
							}}/>
						</div>
					</div>
					<div className="form-group form-group-sm">
						<label className="col-sm-2 control-label" htmlFor="formGroupInputSmall">商品库存</label>
						<div className="col-sm-10">
							<input className="form-control" type="text" id="formGroupInputSmall" placeholder=""
								   name="goodsStock" onChange={(e) => {
								this.changeAdd(e)
							}}/>
						</div>
					</div>
					<div className="form-group form-group-sm">
						<label className="col-sm-2 control-label" htmlFor="formGroupInputSmall">商品图片</label>
						<div className="col-sm-10">
							<input type="file" name="subImages" onChange={(e) => {
								this.changeAdd(e)
							}}/>
						</div>
					</div>
					<div className="form-group form-group-sm">
						<label className="col-sm-2 control-label" htmlFor="formGroupInputSmall">商品详情</label>
						<div className="col-sm-10">
							<div className="detail-box">
								{/*<textarea name="detail" onChange={(e) => {this.changeAdd(e)}}></textarea>*/}
								<div>
									<div>Editor demo 1 (use default html format ):
									</div>
									<LzEditor active={true} importContent={this.state.htmlContent} cbReceiver={this.receiveHtml} uploadProps={uploadProps}
											  lang="en"/>
									<br/>
									<div>Editor demo 2 (use markdown format ):
									</div>
									<LzEditor
										active={true}
										importContent={this.state.markdownContent}
										cbReceiver={this.receiveMarkdown}
										image={false}
										video={false}
										audio={false}
										convertFormat="markdown"/>
								</div>

							</div>
						</div>
					</div>
					<div>
						<button onClick={() => {
							this.addBtn()
						}}>提交
						</button>
					</div>

				</div>
			</div>
		)
	}
}

export default productSave;







