import { useState, useEffect } from "react";
import {redirect, Link,useNavigate,Form } from "react-router-dom";
import { Buffer } from 'buffer';
import Swal from 'sweetalert2';
import 'bootstrap';
// import $ from 'jquery';

import Table from "../components/Table";
import Loader from '../components/Loader';
import getHashFromIPFS from "../services/getHashFromIPFS";
import saveToIpfs from "../services/saveToIpfs";
import calcDate from '../services/calcDate';

let navigate,applicationContract, metamaskAddress, userData;


function InspectorHomepage({account,signup,certificateApplication}) {
	// const { fetchBlockchainData } = useLoaderData();
	const [dataTable, setDataTable] = useState([]);
	const [applicationDetails, setApplicationDetails] = useState([]);
	const [showme, setShowme] = useState(false);
	 navigate = useNavigate();


	// console.log(fetchBlockchainData);
	
	metamaskAddress =account
    //  fetchBlockchainData[0];
	applicationContract = certificateApplication;
    // fetchBlockchainData[3];
	useEffect(() => {
		fetchData()
			.then((res) => {
				console.log('res')
				console.log(res)
				if (res === undefined || res === 0) {
					console.log('No data found')
					Swal.fire({
						title: "Sorry,No Application Found",
						icon: 'error'
                    })
				}
                else{
                    const filteredArray = res.filter(person => {
                        if (person.status === 'Pending') return false;
    
                        if (person.status === 'Inspected') return person;
    
                        if (person.status === "Certified") return false;
    
                    })
				setDataTable(filteredArray)

                    // this.setState({ arrayvar: this.state.arrayvar.concat(filteredArray) })
    
                }
        
			})
			.catch(err => console.log(err))
	}, [])
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
    function formatDate(date = new Date()) {
        return [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-');
    }
  
	//Fetch Details of an application Number
    const GetApplication = async (appno) => {
        const appDataHash = await applicationContract.methods.getApplicationData(appno).call();
        const ipfsData = await getHashFromIPFS(appDataHash);
        return JSON.parse(Buffer.from(ipfsData.value.buffer).toString());
    }
    const fetchData = async () => {
        const renderApplication = await applicationContract.methods.getApplicationList().call();
        // Fires off the promises...
        const applicationPromises = renderApplication.map((appNo) => GetApplication(appNo));
        // ... waits for them to finish and gathers the data.
        return await Promise.all(applicationPromises);
    }
   

	if (dataTable.length === 0) return <div><Loader/></div>;
    // {
    //     Swal.fire({
    //     title: "Sorry,No Application Found",
    //     icon: 'error'
    // }).then(() =>{ return <div><Loader/></div>})
        
    // }
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
		setApplicationDetails([appInDetails]);

		setShowme(true);
		
	}

	if (data.length > 0) {
		const config = [
			{ label: 'Application No.', render: (data) => data.applicationno },
			{ label: 'Applicant', render: (data) => data.name, },
			{ label: 'Requirement', render: (data) => data.requirement, },
			{ label: 'Standard', render: (data) => data.standard, },
			{ label: 'Crop', render: (data) => data.crop, },
			{ label: 'Status', render: (data) => data.status, },
			{
				label: '', render: (data) => <>
					<button className="btn btn-info" data-bs-target="#myModal" data-bs-toggle="modal" name={data.applicationno} onClick={handleClick}>
						View More
					</button></>
			}
			
		];
		const keyFn = (data) => {
			return data.applicationno;
		};
		let renderValues;

		if (applicationDetails) {
            let inspectionDetails,certificationDetails;

			applicationDetails.map((info) => {
				console.log('info')
				console.log(info)
				console.log(info.applicationno)
                if (info.status === 'Pending') {
                    inspectionDetails = ' ';
                    certificationDetails = ' ';
                }
                if (info.status === 'Inspected') {
                    inspectionDetails = <>
                        <div className="row">


                            <div className="col-lg-3">
                                <label>INSPECTED BY</label>
                            </div>
                            <div className="col-lg-3">
                                <input type="text"   className="form-control"
                                 name="inspectorName"
                                 id="inspectorName" value={info.inspectorName} readOnly />

                            </div>
                            <div className="col-lg-3">
                                <label>DATE OF INSPECTION</label>
                            </div>
                            <div className="col-lg-3">
                                <input type="date"   className="form-control"
                                 name="inspectionDate"
                                 id="inspectionDate"  value={info.inspectionDate} readOnly />
                            </div>
                        </div></>
                         certificationDetails = <>
                         <div className="row">
 
                             <div className="col-lg-3">
                                 <label>CERTIFIED BY</label>
                             </div>
                             <div className="col-lg-3">
                                 <input type="text" 
                                 className="form-control"
                                 name="certifierName"
                                 id="certifierName" 
                                //  value={this.state.certifierName} 
                                //  onChange={(event) => this.handleChange(event, "certifierName")}
                                  />
                             </div>
 
                             <div className="col-lg-3">
                                 <label>CERTIFICATION DATE</label>
                             </div>
                             <div className="col-lg-3">
                                 <input type="date" 
                                    className="form-control"
                                    name="issueDate"
                                    id="issueDate" 
                                //  defaultValue={this.state.issueDate} 
                                />
                             </div>
                         </div>
                         <div className="row">
 
                             <div className="col-lg-3">
                                 <label>DATE OF EXPIRY</label>
                             </div>
                             <div className="col-lg-3">
                                 <input type="date" 
                                className="form-control"
                                name="expiryDate"
                                id="expiryDate" 
                             />
                             </div>
                         </div>
                         <div className="text-right">
 
                             <button type='submit' className='btn-common '>VERIFY</button>
                         </div>
                     </>
                }
                if (info.status === 'Certified') {
                    inspectionDetails = <div className="row">
                        <div className="col-lg-3">
                            <label>INSPECTED BY</label>
                        </div>
                        <div className="col-lg-3">
                            <input type="text" value={info.inspectorName} readOnly />

                        </div>
                        <div className="col-lg-3">
                            <label>DATE OF INSPECTION</label>
                        </div>
                        <div className="col-lg-3">
                            <input type="date" value={info.inspectionDate} readOnly />
                        </div>
                    </div>
                    certificationDetails = <>
                        <div className="row">
                            <div className="col-lg-3">
                                <label>CERTIFIED BY</label>
                            </div>
                            <div className="col-lg-3">
                                <input type="text" value={info.certifierName} readOnly />

                            </div>
                            <div className="col-lg-3">
                                <label>YEAR OF EXPIRY</label>
                            </div>
                            <div className="col-lg-3">
                                <input type="date" value={info.expiryDate} readOnly />
                            </div>
                        </div></>
                }

					renderValues = <>
						<Form method="post" action="/updatecertifier"  >
							<div className="row">
								<div className="col-lg-3">
									<label> APPLICATION NO. *</label>
								</div>
								<div className="col-lg-3">
									<input type="text" defaultValue={info.applicationno}
                                    name="applicationno"
                                    className="form-control" readOnly />
								</div>
								{/* </div> */}
								{/* <div className="row"> */}
								<div className="col-lg-3">
									<label> NAME *</label>
								</div>
								<div className="col-lg-3">
									<input type="text"
                                    defaultValue={info.name}
                                    name="name"
                                    className="form-control" 
                                    readOnly />
								</div>
							</div>
							<div className="row">
								<div className="col-lg-3">
									<label>ADDRESS *</label>
								</div>
								<div className="col-lg-9">
									<input type="text" defaultValue={info.address}
                                    className="form-control"
                                    name="address"
                                     readOnly />
								</div>
							</div>
							<div className="row">
								<div className="col-lg-3">
									<label>PHONE *</label>
								</div>
								<div className="col-lg-9">
									<input type="text" value={info.contact} 
                                    className="form-control"
                                    name="contact"
                                    id="contact"
                                    readOnly />
								</div>
							</div>
							<div className="row">
								<div className="col-lg-3">
									<label>REQUIREMENT</label>
								</div>
								<div className="col-lg-3">
									<input type="text" defaultValue={info.requirement} 
                                    name="requirement"
                                    readOnly />
								</div>
								{/* </div>
					<div className="row"> */}
								<div className="col-lg-3">
									<label>STANDARD</label>
								</div>
								<div className="col-lg-3">
									<input type="text" defaultValue={info.standard}  name="standard" readOnly />
								</div>
							</div>
							<div className="row">
								<div className="col-lg-3">
									<label>CROP NAME</label>
								</div>
								<div className="col-lg-3">
									<input type="text" defaultValue={info.crop} 
                                    name="crop"
                                    className="form-control"
                                    id="crop" readOnly />
								</div>
								{/* </div>
					<div className="row"> */}
								<div className="col-lg-3">
									<label>EXTENT OF EACH CROP GROWN</label>
								</div>
								<div className="col-lg-3">
									<input type="text" defaultValue={info.extent}
                                    className="form-control"
                                    name="extent"
                                    id="extent" readOnly />
								</div>
							</div>
							<div className="row">
								<div className="col-lg-3">
									<label>INPUT GIVEN TO CROP</label>
								</div>
								<div className="col-lg-3">
									<input type="text" defaultValue={info.inputToCrop} className="form-control"
                          name="inputToCrop"
                          id="inputToCrop" readOnly />
								</div>
								{/* </div>
					<div className="row"> */}
								<div className="col-lg-3">
									<label>SOURCE OF MANURE</label>
								</div>
								<div className="col-lg-3">
									<input type="text" defaultValue={info.manureSource} className="form-control"
                          name="manureSource"
                          id="manureSource" readOnly />
								</div>
							</div>
							<div className="row">
								<div className="col-lg-6">
									<label>CROP PROTECTION MEASURES FOLLOWED</label>
								</div>
								<div className="col-lg-6">
									<input type="text" defaultValue={info.protectionMeasure} name="protectionMeasure"
                          className="form-control"
                          id="protectionMeasure" readOnly />
								</div>
							</div>

							<div className="row">
								<div className="col-lg-3">
									<label>SOURCE OF SEED</label>
								</div>
								<div className="col-lg-3">
									<input type="text" defaultValue={info.seedSource}  name="seedSource"
                          className="form-control"
                          id="seedSource" readOnly />
								</div>
								{/* </div>
					<div className="row"> */}
								<div className="col-lg-3">
									<label>TYPE OF SOIL</label>
								</div>
								<div className="col-lg-3">
									<input type="text" defaultValue={info.soilType}  className="form-control"
                          name="soilType"
                          id="soilType" readOnly />
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
									<input type="text" defaultValue={info.latitude} name="latitude"
                          className="form-control"
                          id="latitude" readOnly />
								</div>
								{/* </div>
					<div className="row"> */}
								<div className="col-lg-3">
									<label>LONGITUDE</label>
								</div>
								<div className="col-lg-3">
									<input type="text" defaultValue={info.longitude} name="longitude"
                          className="form-control"
                          id="longitude" readOnly />
								</div>
							</div>
                            {inspectionDetails}
                            {certificationDetails}


						</Form>
					</>

				
			})

		}
        return <><div className="checkout-area mt-95 sm-mt-75">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <h4>Application List</h4>
                    <Table data={data} config={config} keyFn={keyFn} />

                </div>
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

	}


}

//Verification by Certifier
  const updateApplicationToBC = async (formData) => {
    console.log('updateApplicationToBC');
    console.log('this.state.applicationInfo in update')
    // console.log(applicationDetails);
    console.log(metamaskAddress)
    console.log(applicationContract)
    console.log(formData);

    var date1_issue = new Date(formData.issueDate);
    let fromDate=((date1_issue.getMonth() > 8) ? (date1_issue.getMonth() + 1) : ('0' + (date1_issue.getMonth() + 1))) + '-' + ((date1_issue.getDate() > 9) ? date1_issue.getDate() : ('0' + date1_issue.getDate())) + '-' + date1_issue.getFullYear();
    
    var date2_expiry = new Date(formData.expiryDate);
    let toDate=((date2_expiry.getMonth() > 8) ? (date2_expiry.getMonth() + 1) : ('0' + (date2_expiry.getMonth() + 1))) + '-' + ((date2_expiry.getDate() > 9) ? date2_expiry.getDate() : ('0' + date2_expiry.getDate())) + '-' + date2_expiry.getFullYear();

    const expiryInYears = await calcDate(fromDate,toDate)
    console.log('expiryin years')
    console.log(expiryInYears);
  
                let application_json = {
                    'applicationno': formData.applicationno,
                    'name': formData.name,
                    'address': formData.address,
                    'contact': formData.contact,
                    'crop': formData.crop,
                    'extent': formData.extent,
                    'inputToCrop': formData.inputToCrop,
                    'latitude': formData.latitude,
                    'longitude': formData.longitude,
                    'manureSource': formData.manureSource,
                    'protectionMeasure': formData.protectionMeasure,
                    'requirement': formData.requirement,
                    'seedSource': formData.seedSource,
                    'soilType': formData.soilType,
                    'standard': formData.standard,
                    'inspectorName': formData.inspectorName,
                    'inspectionDate': formData.inspectionDate,
                    certifierName: formData.certifierName,
                    issueDate: formData.issueDate,
                    expiryDate: formData.expiryDate,
                    expiryInYears: expiryInYears.result,
                    'status': 'Certified',

                };
                console.log('File to converted into ipfs hash')
                console.log(application_json);
                const ipfsHash = await saveToIpfs(application_json);
                console.log('getting ipfs hash back');
                console.log(ipfsHash);
                console.log('***********')
                applicationContract.methods.updateApplication(formData.applicationno, ipfsHash).send({ from: metamaskAddress }).on('transactionHash', (hash) => {
                    console.log(hash);
                    Swal.fire({
                        title: 'Inspection Completed Successfully',
                        icon: 'success'
                    }).then(() => navigate('/'));
                     
                });

}
export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    console.log('action')
    console.log(updates)
    await updateApplicationToBC(updates);
    return window.$('#myModal').modal('hide');
    // <Loader />;
  }
export default InspectorHomepage;