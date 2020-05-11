import React, { Component, Fragment } from 'react';
import axios from 'axios';
import SignaturePad from 'react-signature-canvas';
import styles from './styles.module.css';
import Spinner from '../shared/Spinner'
const cred=localStorage.getItem('userData')
const em=JSON.parse(cred)

class BasicTable extends Component {
	constructor() {
		super();
		this.state = {
			show: true,
			Name : '',
			Email : '',
			mobileNumber: '',
			loading:true,
			data:{},
			trimmedDataURL: null ,
	
		};	
	}
	sigPad = {}
	componentDidMount() {
		// let url = GetUrl('allEmployeesPage');
		this.setState({ loading: true });

		axios.get('http://localhost:9016/esign/profile',{
			headers:{'Content-Type': 'text/plain','Authorization':em.token}
	})
			.then((res) => {
				this.setState({data:res.data,loading:false})
				
				console.log(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}
	show1 = () => {
		this.setState({ show: false });
	};
	mobileHandler = (e) => {
		this.setState({ mobileNumber: e.target.value });
		console.log(this.state);
	};
	submitHandler = (e) => {
		// axios post here
		axios.post('http://localhost:9016/esign/editmobile?email='+em.email+"&mobile="+this.state.mobileNumber,{},{
			headers:{'Authorization':em.token}
	})
			
			.then((res) => {
				this.setState({ data: res.data, loading: false });
				console.log(res);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	signSubmitHandler = (event) => {
		// console.log({...this.state})
		event.preventDefault();
		console.log(this.state);
		let form_data = new FormData();
		form_data.append('email', em.email);
		form_data.append('baseMessage', this.state.trimmedDataURL);
		let url = 'http://localhost:9016/esign/saveSignature';
		axios
			.post(url, form_data, {
				headers: {
					'content-type': 'multipart/form-data',
					Authorization:em.token
				}
			})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => console.log(err));
	};
	clear = () => {
		this.sigPad.clear();
	};
	trim = () => {
		this.setState({
			trimmedDataURL: this.sigPad.getTrimmedCanvas().toDataURL('image/jpg')
		});
	};
	render() {
		let { trimmedDataURL } = this.state;
		let { show } = this.state;
		const {data}=this.state;
		return (
			<div>
 				<div className="page-header">
 					<h3 className="page-title"> E-Sign </h3>
 					<nav aria-label="breadcrumb">
 						<ol className="breadcrumb">
 							<li className="breadcrumb-item">
 								<a href="!#" onClick={(event) => event.preventDefault()}>
 									E-Sign
 								</a>
 							</li>
 							<li className="breadcrumb-item active" aria-current="page">
 								Profile
 							</li>
 						</ol>
 					</nav>
 				</div>
 				<div className="row">
 					<div className="col-lg-12 grid-margin stretch-card">
 						<div className="card" style={{backgroundColor:'#f5f5f5'}}>
						 {this.state.loading?<Spinner/>:
 							<div className="card-body">
 								
				<button onClick={this.show1} className="btn btn-primary">
					Edit
				</button>
				{/* <h1>{data}</h1> */}
				
				<div className="col-5">
					<div className='row'>
						<label className='col-6'>Name</label>
						<label className='col-6'>{data.name}</label>
					</div>
					<div className='row'>
						<label className='col-6'>Email</label>
						<label className='col-6'>{data.email}</label>
					</div>
					
					
					{show == true ? (
					<div className='row'>
						<label className='col-6'>Mobile Number</label>
						<label className='col-6'>{data.mobile_number}</label>
					</div>): (
						<div className="form-row align-items-center">
							<div className="col-auto">
								<label htmlFor="mobile number">Mobile Number</label>
							</div>
							<div className="form-group">
								<input
									type="number"
									className="form-control"
									id="mobile number"
									name="mobile number"
									placeholder="Enter Mobile Number"
									value={this.state.mobileNumber}
									onChange={(e) => this.mobileHandler(e)}
								/>
							</div>
							<button className="btn btn-primary col-auto" onClick={this.submitHandler}>
								Submit
							</button>
						</div>

					)}
					<div className="row">
					<label className='col-12 '>Preview</label>
					{data.sign_path!==null&&
					<img src={data.sign_path} alt='digiSign'style={{width:'25rem'}}/>}
					</div>
					</div>
					<div className="col-6">
					
					<div>
						<label>Signature</label>
					</div>
			<form onSubmit={this.signSubmitHandler}>	
				<div className={styles.container}>
				<div className={styles.sigContainer}>
					<SignaturePad
						canvasProps={{ className: styles.sigPad }}
						ref={(ref) => {
							this.sigPad = ref;
						}}
					/>
				</div>
				<div className="text-center mt-2">
					<button className="btn btn-primary mr-2" onClick={this.clear}>
						Clear
					</button>
					<button className="btn btn-primary" onClick={this.trim}>
						Submit
					</button>
				</div>
				
				{/* {trimmedDataURL ? <img className={styles.sigImage} src={trimmedDataURL} /> : null} */}
			</div></form>
			</div>
					
				
					</div>}</div></div></div></div>
		);
	}
}			
export default BasicTable;
