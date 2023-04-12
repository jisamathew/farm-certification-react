import { useState, useEffect } from "react";
import {redirect, Link,useNavigate,Form } from "react-router-dom";
import Table from "../components/Table";
import { Buffer } from 'buffer';
import 'bootstrap';
import Loader from '../components/Loader';
import getHashFromIPFS from "../services/getHashFromIPFS";
import Swal from 'sweetalert2';
import saveToIpfs from "../services/saveToIpfs";
// import $ from 'jquery';
// declare var $ :any;
let navigate,applicationContract, metamaskAddress, userData;


function InspectorHomepage({account,signup,certificateApplication}) {
	// const { fetchBlockchainData } = useLoaderData();
	const [dataTable, setDataTable] = useState([]);
	 navigate = useNavigate();
	const [applicationDetails, setApplicationDetails] = useState([]);
	const [showme, setShowme] = useState(false);

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
				if (res === undefined) {
					console.log('No data found')
					// Swal.fire({
					// 	title: "Sorry,No Application Found",
					// 	icon: 'error'
                    // }).then(() => navigate(`/`))
				}
                else{
                    const filteredArray = res.filter(person => {
                        if (person.status === 'Pending') return person;
    
                        if (person.status === 'Inspected') return false;
    
                        if (person.status === "Certified") return false;
    
                    })
				setDataTable(filteredArray)
      }
        
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
        const renderApplication = await applicationContract.methods.getApplicationList().call();
        // Fires off the promises...
        const applicationPromises = renderApplication.map((appNo) => GetApplication(appNo));
        // ... waits for them to finish and gathers the data.
        return await Promise.all(applicationPromises);
    }
   

	if (dataTable.length === 0)return <div><Loader/></div>;
    // {
    //     Swal.fire({
    //     title: "Sorry,No Application Found",
    //     icon: 'error'
    // }).then(() =>{ return <div><Loader/></div>})
        
    // } 
    // 
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
            let inspectionDetails

			applicationDetails.map((info) => {
				console.log('info')
				console.log(info)
				console.log(info.applicationno)
                if (info.status === 'Inspected') {
                    inspectionDetails = <>
                        <div className="row">


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
                        </div></>
                }
                else {
                    inspectionDetails = <>
                        <div className="row">

                            <div className="col-lg-3">
                                <label>INSPECTED BY</label>
                            </div>
                            <div className="col-lg-3">
                                <input type="text" 
                                 name="inspectorName"
                                 className="form-control"
                                 id="inspectorName"
                                 required
                                // value={this.state.inspectorName} onChange={(event) => this.handleChange(event, "inspectorName")} 
                                />
                            </div>
                            <div className="col-lg-3">
                                <label>DATE OF INSPECTION</label>
                            </div>
                            <div className="col-lg-3">
                                <input type="date" 
                                  name="inspectionDate"
                                  className="form-control"
                                  id="inspectionDate"
                                  required
                                // value={this.state.inspectionDate} onChange={(event) => this.handleChange(event, "inspectionDate")}
                                 />
                            </div>
                        </div>
                        <div className="text-right">

                            <button type='submit' className='btn-common '>VERIFY</button>
                        </div>
                    </>

                }
					renderValues = <>
						<Form method="post" action="/update"  >
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
        <div className="modal bd-example-modal-lg" role="dialog" aria-labelledby="exampleModalLongTitle" tabIndex="-1" id="myModal">
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

  const updateApplicationToBC = async (formData) => {
    console.log('updateApplicationToBC');
    console.log('this.state.applicationInfo in update')
    // console.log(applicationDetails);
    console.log(metamaskAddress)
    console.log(applicationContract)
    console.log(formData);
//         if (applicationDetails) {
//             applicationInfo.map(async (prevData) => {
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
                    'status': 'Inspected',
                    'inspectorName': formData.inspectorName,
                    'inspectionDate': formData.inspectionDate
                };
                console.log('File to converted into ipfs hash')
                console.log(application_json);
                const ipfsHash = await saveToIpfs(application_json);
                console.log('getting ipfs hash back');
                console.log(ipfsHash);
                console.log('***********')
//                 console.log(prevData.applicationno)
//                 console.log(this.props.account)
                applicationContract.methods.updateApplication(formData.applicationno, ipfsHash).send({ from: metamaskAddress }).on('transactionHash', (hash) => {
                    console.log(hash);
                    Swal.fire({
                        title: 'Inspection Completed Successfully',
                        icon: 'success'
                    }).then(() => navigate(`/`));
                     
                });
            // })

//         }
}
export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    console.log('action')
    console.log(updates)
    console.log(updates.inspectorName)
    console.log(updates.inspectionDate)
    await updateApplicationToBC(updates);
    // return redirect(`/`);
    return window.$('#myModal').modal('hide');
    // <Loader />;

  }
export default InspectorHomepage;