import React, { Component } from 'react';

export class Spinner extends Component {
	render() {
		return (
			<div className="d-flex justify-content-center align-content-center">
				<div className="spinner-wrapper">
					<div className="donut" />
				</div>
			</div>
		);
	}
}

export default Spinner;
