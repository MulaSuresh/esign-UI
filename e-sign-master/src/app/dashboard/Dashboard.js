import React from 'react';
import Spinner from '../shared/Spinner'
import ReactTable from 'react-table';
import axios from 'axios';
import 'react-table/react-table.css';
const cred=localStorage.getItem('userData')
const em=JSON.parse(cred)
class Table extends React.Component {
	constructor() {
		super();
		this.state = {
			data: []
		};
	}
	componentDidMount() {
		
		this.setState({ loading: true });
		
		axios.post('http://localhost:9016/esign/dashboard',em.email,{
			headers:{'Content-Type': 'text/plain','Authorization':em.token}
	})
			
			.then((res) => {
				console.log(res);
				this.setState({ data: res.data, loading: false });
			})
			.catch((error) => {
				console.log(error);
			});
	}
	
	handleSign = (e, row) => {
		axios({
			method: 'POST',
			url: 'http://localhost:9016/esign/digisigndocs',
			data: {
				"JSONFile" : {
				"userid": row.companyID,
				"email" : em.email,
				"document_id":row.DocumentID
				}
			},
			headers:{'Content-Type': 'application/json','Authorization':em.token}
		}).then((result) => {
			console.log(result);
		});
	};
	render() {
		var res=this.state.data.map((sta)=>sta.Status==='In Progress')
		console.log(res)
		const { data } = this.state;
		const col2 = [
			{
				Header: 'Details',
				accessor: 'Details'
			}
		];
		const col = [
			{
				Header: 'Name',
				columns: [
					{
						Header: 'Document ID',
						accessor: 'DocumentID'
					},
					{
						Header: 'Date',
						accessor: 'Date'
					}
				]
			},
			{
				Header: 'Info',
				columns: [
					{
						Header: 'Status',
						accessor: 'Status'
					},
					{
						Header: 'Company ID',
						accessor: 'companyID'
					},
					
					{
						Header: '',
						id: 'id',
						Cell: ({ row }) =>
							row.Status === 'In Progress' && (
								<a href={`http://4bfec917.ngrok.io/documentsign.html?document_id=${row.DocumentID}&email=${em.email}&sign_type=mt&token=${em.token}`} target="_blank" className="btn btn-primary">Sign</a>
							)
					},
					{
						Header: '',
						id: 'id2',
						Cell: ({ row }) =><a href={row._original.DocumentPath} target="_blank" className="btn btn-primary">View</a>
					}
					
				]
			}
		];
		return (
			<div>
				
 			<div className="page-header">
 				<h3 className="page-title"> Basic Tables </h3>
 				<nav aria-label="breadcrumb">
 					<ol className="breadcrumb">
 						<li className="breadcrumb-item">
 							<a href="!#" onClick={(event) => event.preventDefault()}>
 								Tables
 							</a>
 						</li>
 						<li className="breadcrumb-item active" aria-current="page">
 							Basic tables
 						</li>
 					</ol>
 				</nav>
 			</div>
 			<div className="row">
 				<div className="col-lg-12 grid-margin stretch-card">
 					<div className="card">
					 {this.state.loading?<Spinner/>:
 						<div className="card-body">
 							<h4 className="card-title">Hoverable Table</h4>
 							<p className="card-description">
 								{' '}
 								Add className <code>.table-hover</code>
 							</p>
				
							 
								<ReactTable
									data={data}
									columns={col}
									defaultPageSize={10}
									filterable
									SubComponent={(row) => {
										return <div style={{ padding: '20px' }}>Sub Component!</div>;
									}}
									SubComponent={(row) => {
										return (
											<div style={{ padding: '20px' }}>
												<ul>
													{this.state.data[row.index].Details.map((item, i) => (
														<li>{this.state.data[row.index].Details[i]}</li>
													))}
												</ul>
											</div>
										);
									}}
								/>
								</div>}</div></div></div></div>
							
		);
	}
}
export default Table;