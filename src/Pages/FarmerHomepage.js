// import 'bulma/css/bulma.css';
import { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import getHashFromIPFS from '../services/getHashFromIPFS';
import { Buffer } from 'buffer';

class FarmerHomepage extends Component {
	constructor(props) {
		super(props)
		// this.getUserDetails();
	}

	render() {

		return (
			<div>
				{/* <!--banner-area start--> */}
				<div className="banner-area bg-1 overlay">
					<div className="container">
						<div className="row align-items-center height-250 pb-111">
							<div className="col-sm-12">
								<div className="banner-text text-center">
									<h2>Services</h2>
									<p className="mt-30">Enjoy wonderful day in your farm</p>
									{/* <a className="venobox video-play" data-gall="gall-video" data-autoplay="true" data-vbtype="video" href="https://youtu.be/6rPPUmStKQ4">
                        <i className="fa fa-play"></i>
						</a> */}
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <!--banner-area end--> */}

				{/* <!--service-area start--> */}
				<div className="service-area mt-minus-100 sm-mt-80">
					<div className="container">
						<div className="row">
							<div className="col-lg-4 col-md-6 col-sm-12">
								<div className="sin-service">
									<img src="assets/images/promo/1.jpg" alt="promo" />
									<h3>Apply Now</h3>
									<p>Please fill in form to get organic certification of your farm.</p>
									<Link to={`/application`} className="readmore"> Apply Now</Link>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 col-sm-12">
								<div className="sin-service">
									<img src="assets/images/promo/2.jpg" alt="promo" />
									<h3>Track Application</h3>
									<p>Track the status of your application for certification in just one click</p>
									<Link to={`/track`} className="readmore"> Track</Link>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 col-sm-12 d-lg-block d-md-none">
								<div className="sin-service">
									<img src="assets/images/promo/3.jpg" alt="promo" />
									<h3>View Application</h3>
									<p>View all applications and its details submitted for certification</p>
									<Link to={`/viewapplication`} className="readmore"> View</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <!--service-area end--> */}




				<div>
					{/* */}
				</div>
			</div>

		);

	}

	async getUserDetails() {
		console.log('getUserDetails')
		let loginData = await this.props.signup.methods.logindata(this.props.account).call();
		const ipfsHash = await getHashFromIPFS(loginData);

		console.log('getting data back from ipfs');
		console.log(ipfsHash);
		console.log('***********')
		const ipfsConverted = JSON.parse(Buffer.from(ipfsHash.value.buffer).toString());
		var userHash = ipfsConverted;
		console.log('hash in backend')
		console.log(userHash);
		if (userHash) {
			console.log('getting data')
		}
	}

}

export default FarmerHomepage;