import { Component, useState, useEffect } from "react";
import Header from "../components/Header";
import saveToIpfs from "../services/saveToIpfs";
import { Form, useLoaderData, redirect, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import ReactLeaflet from "../map/ReactLeaflet";
let navigate ;
let applicationContract, signupContract, metamaskAddress;
let userData = [];
function ApplicationForm() {
  const { fetchBlockchainData } = useLoaderData();
  const [lat,setLat] = useState('');
  const [long,setLong] = useState('');
  navigate = useNavigate();
  console.log('fetchBlockchainData')
  console.log(fetchBlockchainData);
  metamaskAddress = fetchBlockchainData[0];
  signupContract = fetchBlockchainData[1];
  applicationContract = fetchBlockchainData[3];

  userData = fetchBlockchainData[2]
  console.log(userData.UserName);

function handleChange(evt, field){
    if(field === 'latitude')
       setLat(evt.target.value );
    else if(field === 'longitude')
        setLong(evt.target.value)
}
  return (

    <div>
      <Header isLoggedIn={true} UName={userData.UserName} Role={userData.UserType} />

      {/* <!--page-banner start--> */}
      <div className="banner-area page-banner">
        <div className="container">
          <div className="row align-items-center height-50">
            <div className="col-sm-12">
              <div className="page-banner-text text-black text-center">
                <h2>Application Form</h2>
                <ul className="site-breadcrumb text-black">
                  <li> <Link to={`/`}>Home</Link> <span>{">"}</span></li>
                  <li>Appication Form</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--page-banner end--> */}

      {/* <!--checkout-area start--> */}
      <div className="checkout-area mt-10 sm-mt-40">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <p>  <Link to={`/`}>Back</Link>
              </p>
            </div>
          </div>
          <div className="row ">

            <div className="col-lg-12">

              <div className="order-details sm-mt-50">
                {/* <h4>Application</h4> */}
                <h4></h4>
                <div className="order-details-inner">
                  <Form
                    method="post"
                    role="form"
                    style={{ padding: '10px' }}
                  >
                    <div className="row">
                      <div className="form-group col-md-4">
                        <label htmlFor="name">Application No.</label>
                        <input
                          // value={this.state.applicationno} onChange={(event) => this.handleChange(event, "applicationno")}
                          defaultValue={Math.floor(Math.random() * 100000)}
                          type="text"
                          name="applicationno"
                          className="form-control"

                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="name">Name</label>
                        <input
                        defaultValue={userData.UserName}
                          // value={this.state.name} onChange={(event) => this.handleChange(event, "name")}
                          type="text"
                          name="name"
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="form-group col-md-4">

                        <label htmlFor="name">Contact Information</label>
                        <input
                          // value={this.state.contact} onChange={(event) => this.handleChange(event, "contact")}
                          defaultValue={userData.ContactNumber}
                          type="number"
                          className="form-control"
                          name="contact"
                          id="contact"
                          maxLength={10}
                          required
                        />
                      </div>
                    </div>
                    {/* <div className="form-group">
                   
                  </div> */}
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="name">Address</label>
                        <textarea
                          // value={this.state.address} onChange={(event) => this.handleChange(event, "address")}
                          defaultValue={userData.Address}
                          className="form-control"
                          name="address"
                          rows="5"
                          required
                        ></textarea>
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="name">Location</label>
                        <input
                          type="text"
                          placeholder="Latitude"
                          // value={this.state.latitude}
                           onChange={(event) => handleChange(event, "latitude")}
                          name="latitude"
                          className="form-control"
                          id="latitude"
                          required
                        />
                        <br />
                        <input
                          type="text"
                          placeholder="Longitude"
                          // value={this.state.longitude} 
                          onChange={(event) => handleChange(event, "longitude")}
                          name="longitude"
                          className="form-control"
                          id="longitude"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="name">Certification Requirement </label>
                        <br />

                        <div name="requirement">
                          {/* onChange={(event) => this.handleChange(event, "requirement")} > */}
                          <div className="single-payment-gateway">
                            <input type="radio" value="Crop Production" name="requirement" id="requirement1" />
                            <label htmlFor="requirement1">Crop Production</label>
                          </div>
                          <div className="single-payment-gateway">
                            <input type="radio" value="Honey" name="requirement" id="requirement2" />
                            <label htmlFor="requirement2">Honey</label>
                          </div>
                          <div className="single-payment-gateway">
                            <input type="radio" value="Wild Collection" name="requirement" id="requirement3" />
                            <label htmlFor="requirement3">Wild Collection</label>
                          </div>
                          <div className="single-payment-gateway">
                            <input type="radio" value="Dairy" name="requirement" id="requirement4" />
                            <label htmlFor="requirement4">Dairy and other livestock</label>
                          </div>
                        </div>


                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="name">Certification Requirement under which Standard ?</label>
                        <br />

                        <div name="standard">
                          <div className="single-payment-gateway">
                            <input type="radio" value="NPOP" name="standard" id="standard1" />
                            <label htmlFor="standard1">NPOP</label>
                          </div>
                          <div className="single-payment-gateway">
                            <input type="radio" value="NOP" name="standard" id="standard2" />
                            <label htmlFor="standard2">NOP</label>
                          </div>
                          <div className="single-payment-gateway">
                            <input type="radio" value="JAS" name="standard" id="standard3" />
                            <label htmlFor="standard3">JAS</label>
                          </div>
                          <div className="single-payment-gateway">
                            <input type="radio" value="EO" name="standard" id="standard4" />
                            <label htmlFor="standard4">EO</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-4">
                        <label htmlFor="name">Name of the Crops</label>
                        <input
                          type="text"
                          // value={this.state.crop} onChange={(event) => this.handleChange(event, "crop")}
                          name="crop"
                          className="form-control"
                          id="crop"
                          required
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="name">Extent of each crop grown</label>
                        <input
                          type="text"
                          // value={this.state.extent} onChange={(event) => this.handleChange(event, "extent")}
                          className="form-control"
                          name="extent"
                          id="extent"
                          required
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="name">Input applied to previous crops</label>
                        <input
                          type="text"
                          // value={this.state.inputToCrop} onChange={(event) => this.handleChange(event, "inputToCrop")}
                          className="form-control"
                          name="inputToCrop"
                          id="inputToCrop"
                          required
                        />
                      </div>
                    </div>


                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="name">Plant Protection measures followed </label>
                        <input
                          // value={this.state.protectionMeasure} onChange={(event) => this.handleChange(event, "protectionMeasure")}
                          type="text"
                          name="protectionMeasure"
                          className="form-control"
                          id="protectionMeasure"
                          required
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="name">Source of manure</label>
                        <input
                          type="text"
                          // value={this.state.manureSource} onChange={(event) => this.handleChange(event, "manureSource")}
                          className="form-control"
                          name="manureSource"
                          id="manureSource"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="name">Source of seed</label>
                        <input
                          type="text"
                          // value={this.state.seedSource} onChange={(event) => this.handleChange(event, "seedSource")}
                          name="seedSource"
                          className="form-control"
                          id="seedSource"
                          required
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="name">Soil Type</label>
                        <input
                          type="text"
                          // value={this.state.soilType} onChange={(event) => this.handleChange(event, "soilType")}
                          className="form-control"
                          name="soilType"
                          id="soilType"
                          required
                        />
                      </div>
                      <div className="form-group col-md-6">
                        {/* <label htmlFor="name">Status</label> */}
                        <input
                          type="text"
                          // value={this.state.soilType} onChange={(event) => this.handleChange(event, "soilType")}
                          className="form-control"
                          name="status"
                          id="status"
                          defaultValue='Pending'
                          hidden
                        />
                      </div>
                    </div>

                    <div className="payment-gateways mt-30">
                      <div className="single-payment-gateway">
                        <input type="checkbox" id="system1" />
                        <label htmlFor="system1">Create an account?</label>
                        <div className="payment-gateway-desc" >
                          <div id="map" ></div>
                          <ReactLeaflet latitude={lat} longitude={long}/>
                          {/* <p>Lorem ipsum dolor sit amet, consectetur adip elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
                        </div>
                      </div>

                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        {/* <div className="contact-form cart-link text-left">
                          <button className="btn-common text-center">
                          <Link to={`/`}>Back</Link> 
                            </button>
                        </div> */}
                      </div>

                      <div className="form-group col-md-6">

                        <div className="text-right mt-30">
                          <button type="submit" className="btn-common ">APPLY</button>

                          {/* <a href="#" class="btn-common width-180">place porder</a> */}
                        </div>
                      </div>
                    </div>
                  </Form>



                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--checkout-area end--> */}

    </div>
  );



}

const saveApplicationToBC = async (formData) => {
  console.log('saveApplicationToBC');
  console.log(formData)
  let application_json = formData;
  console.log('File to converted into ipfs hash')
  console.log(application_json);
  // console.log(Ipfs)

  const ipfsHash = await saveToIpfs(application_json);
  console.log('getting ipfs hash back');
  console.log(ipfsHash);
  console.log('***********')
  console.log(formData.applicationno)
  // console.log(this.props.account)
  applicationContract.methods.saveApplication(formData.applicationno, metamaskAddress, ipfsHash).send({ from: metamaskAddress }).on('transactionHash', (hash) => {
    console.log(hash);
    Swal.fire(
      {
        title: 'Application Submitted Successfully',
        text: 'Your Appication Number :' + formData.applicationno,
        icon: 'success'
      }).then(() => navigate(`/`))


  });

}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  console.log('action')
  console.log(updates)
  await saveApplicationToBC(updates);
  return redirect(`/application`);
}

export default ApplicationForm;