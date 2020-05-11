import React, { Component } from 'react';

class Footer extends Component {
	render() {
		return (
			<footer className="footer fixed-bottom" style={{ zIndex: 1 }}>
				<div className="container-fluid">
					<div className="d-sm-flex justify-content-center ">
						<span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
							Copyright © 2020{' '}
							<a href="#" target="_blank" rel="noopener noreferrer">
								UT
							</a>. All rights reserved.
						</span>
						{/* <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
							Hand-crafted & made with <i className="mdi mdi-heart text-danger" />
						</span> */}
					</div>
				</div>
			</footer>
		);
	}
}

export default Footer;
