import { useState, useEffect } from "react";
import { useLoaderData, Link, redirect, useNavigate } from "react-router-dom";
import Table from "../components/Table";
import { Buffer } from 'buffer';
import 'bootstrap';
import Loader from '../components/Loader';
import getHashFromIPFS from "../services/getHashFromIPFS";
import Header from "../components/Header";
import Swal from "sweetalert2";
let applicationContract, metamaskAddress, userData;
let applicationNumberArray;


function ViewApplication() {
	const { fetchBlockchainData } = useLoaderData();
	const [dataTable, setDataTable] = useState([]);
	const navigate = useNavigate();
	const [applicationDetails, setApplicationDetails] = useState([]);
	const [showme, setShowme] = useState(false);

	console.log(fetchBlockchainData);

	metamaskAddress = fetchBlockchainData[0];
	applicationContract = fetchBlockchainData[3];
	userData = fetchBlockchainData[2];
	useEffect(() => {
		fetchData()
			.then((res) => {
				console.log('res')
				console.log(res)
				setDataTable(res)
				// if (res === undefined) {
				// 	console.log('No data found')
				// 	Swal.fire({
				// 		title: "Sorry,No Application Found",
				// 		icon: 'error'
				// 	}).then(() => {
				// 		console.log('Redirection doesnt work here')

				// 		navigate("/");


				// 	})
				// }
			})
			.catch(err => console.log(err))
	}, [])

	//Fetch Details of an application Number
	const GetApplication = async (appno) => {
		const appDataHash = await applicationContract.methods.getApplicationData(appno).call();
		const ipfsData = await getHashFromIPFS(appDataHash);
		return JSON.parse(Buffer.from(ipfsData.value.buffer).toString());
	}
	const fetchData = async () => {
		const renderApplication = await applicationContract.methods.getUserApplication(metamaskAddress).call();
		// Fires off the promises...
		const applicationPromises = renderApplication.map((appNo) => GetApplication(appNo));
		// ... waits for them to finish and gathers the data.
		return await Promise.all(applicationPromises);
	}

	if (dataTable.length === 0) return <div><Loader /></div>;
	console.log('dataTable')
	console.log(dataTable)
	let data = dataTable
	console.log(data.length)
	const handleClick = async (event) => {
		event.preventDefault();
		console.log('Show other details of Application')
		console.log(event.target.name);
		const applnno = event.target.name
		const appInDetails = await GetApplication(applnno);
		console.log('appInDetails')
		console.log(appInDetails)
		// setApplicationDetails(applicationDetails.concat([appInDetails]));
		setApplicationDetails([appInDetails]);

		setShowme(true);
		// return (
		// <>
		// <ProfileCard title="dsa"/>
		// </>

		// )
	}

	if (data.length > 0) {
		const config = [
			{ label: 'Application No.', render: (data) => data.applicationno },
			// { label: 'Name', render: (data) => data.name, },
			{ label: 'Requirement', render: (data) => data.requirement, },
			{ label: 'Standard', render: (data) => data.standard, },
			{ label: 'Crop', render: (data) => data.crop, },
			{ label: 'Status', render: (data) => data.status, },
			{
				label: '', render: (data) => <>
					<div className="d-flex justify-content-center">
						<button className="btn btn-info " data-bs-target="#myModal" data-bs-toggle="modal" name={data.applicationno} onClick={handleClick}>
							View More
						</button></div></>
			},
			{
				label: 'Certificate', render: (data) =>
				((data.status === 'Certified') ? <>

					<button data-toggle="tooltip" data-placement="left" title="Click to View Certificate" className="btm  btn-outline-light" name={data.applicationno} ><Link target="_blank" to={`/certificate/` + data.applicationno} ><i className="fa fa-file"></i></Link></button>

				</>
					:
					<>
					</>)
			}
		];
		const keyFn = (data) => {
			return data.applicationno;
		};
		let renderValues;

		if (applicationDetails) {
			applicationDetails.map((info) => {
				console.log('info')
				console.log(info)
				console.log(info.applicationno)
				renderValues = <>
					<form >
						<div className="row">
							<div className="col-lg-3">
								<label> APPLICATION NO. *</label>
							</div>
							<div className="col-lg-3">
								<input type="text" value={info.applicationno} readOnly />
							</div>
							{/* </div> */}
							{/* <div className="row"> */}
							<div className="col-lg-3">
								<label> NAME *</label>
							</div>
							<div className="col-lg-3">
								<input type="text" value={info.name} readOnly />
							</div>
						</div>
						<div className="row">
							<div className="col-lg-3">
								<label>ADDRESS *</label>
							</div>
							<div className="col-lg-9">
								<input type="text" value={info.address} readOnly />
							</div>
						</div>
						<div className="row">
							<div className="col-lg-3">
								<label>PHONE *</label>
							</div>
							<div className="col-lg-9">
								<input type="text" value={info.contact} readOnly />
							</div>
						</div>
						<div className="row">
							<div className="col-lg-3">
								<label>REQUIREMENT</label>
							</div>
							<div className="col-lg-3">
								<input type="text" value={info.requirement} readOnly />
							</div>
							{/* </div>
					<div className="row"> */}
							<div className="col-lg-3">
								<label>STANDARD</label>
							</div>
							<div className="col-lg-3">
								<input type="text" value={info.standard} readOnly />
							</div>
						</div>
						<div className="row">
							<div className="col-lg-3">
								<label>CROP NAME</label>
							</div>
							<div className="col-lg-3">
								<input type="text" value={info.crop} readOnly />
							</div>
							{/* </div>
					<div className="row"> */}
							<div className="col-lg-3">
								<label>EXTENT OF EACH CROP GROWN</label>
							</div>
							<div className="col-lg-3">
								<input type="text" value={info.extent} readOnly />
							</div>
						</div>
						<div className="row">
							<div className="col-lg-3">
								<label>INPUT GIVEN TO CROP</label>
							</div>
							<div className="col-lg-3">
								<input type="text" value={info.inputToCrop} readOnly />
							</div>
							{/* </div>
					<div className="row"> */}
							<div className="col-lg-3">
								<label>SOURCE OF MANURE</label>
							</div>
							<div className="col-lg-3">
								<input type="text" value={info.manureSource} readOnly />
							</div>
						</div>
						<div className="row">
							<div className="col-lg-6">
								<label>CROP PROTECTION MEASURES FOLLOWED</label>
							</div>
							<div className="col-lg-6">
								<input type="text" value={info.protectionMeasure} readOnly />
							</div>
						</div>

						<div className="row">
							<div className="col-lg-3">
								<label>SOURCE OF SEED</label>
							</div>
							<div className="col-lg-3">
								<input type="text" value={info.seedSource} readOnly />
							</div>
							{/* </div>
					<div className="row"> */}
							<div className="col-lg-3">
								<label>TYPE OF SOIL</label>
							</div>
							<div className="col-lg-3">
								<input type="text" value={info.soilType} readOnly />
							</div>
						</div>
						<div className="row">
							<div className="col-lg-12">
								<p>Farm Location</p>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-3">
								<label>LATITUDE</label>
							</div>
							<div className="col-lg-3">
								<input type="text" value={info.latitude} readOnly />
							</div>
							{/* </div>
					<div className="row"> */}
							<div className="col-lg-3">
								<label>LONGITUDE</label>
							</div>
							<div className="col-lg-3">
								<input type="text" value={info.longitude} readOnly />
							</div>
						</div>
					</form>
				</>


			})

		}
		return (
			<>
				<Header isLoggedIn={true} UName={userData.UserName} Role={userData.UserType} />
				{/* <!--page-banner start--> */}
				<div className="banner-area page-banner">
					<div className="container">
						<div className="row align-items-center height-50">
							<div className="col-sm-12">
								<div className="page-banner-text text-black text-center">
									<h2>Applications List</h2>
									<ul className="site-breadcrumb text-black">
										<li> <Link to={`/`}>Home</Link> <span>{">"}</span></li>
										<li>View Applications</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <!--page-banner end--> */}
				<div className="checkout-area mt-10 sm-mt-40">
					<div className="container">
						<div className="row">
							<div className="col-lg-12">
								<p>  <Link to={`/`}>Back</Link>
								</p>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-12 col-md-12 col-sm-12">
								<h4>
									{/* Application List */}

								</h4>
								<Table data={data} config={config} keyFn={keyFn} />


							</div>
							{/* </div>
	<div className="row mt-10"> */}
							{/* <div className="col-lg-6 col-md-6 col-sm-12" >
							
							</div> */}



						</div>
					</div>

				</div>

				{/* <!-- Modal --> */}
				<div className="modal fade bd-example-modal-lg" role="dialog" aria-labelledby="exampleModalLongTitle" tabIndex="-1" id="myModal">
					<div className="modal-dialog modal-lg" >
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLongTitle">Application Information</h5>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
									{/* <i className="fa fa-close"></i> */}
								</button>

							</div>
							{/*  */}
							<div className="modal-body">
								<div className="billing-form" >

									{showme && (

										renderValues

									)}
								</div>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
								{/* <button type="button" className="btn btn-primary">Save changes</button> */}
							</div>
						</div>
					</div>
				</div>
			</>

		)

	}


}
export default ViewApplication;