import React, { useState } from "react";
import SweetAlert from 'sweetalert2';
import saveToIpfs from "../services/saveToIpfs";
import { myBlockchainData } from "../App";

import {
    Outlet,
    Link,
    Form,
    useLoaderData,
    redirect, useNavigate
} from "react-router-dom";

let navigate, signupContract, metamaskAddress;

function SignUp() {
    const { fetchBlockchainData } = useLoaderData();
    navigate = useNavigate();
    console.log('fetchBlockchainData')
    console.log(fetchBlockchainData)
    metamaskAddress = fetchBlockchainData[0];
    signupContract = fetchBlockchainData[1];
    // function saveUser(){
    // console.log(signupContract)
    // }
    return (
        <div>
            <div className="contact-area bg-1 ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 offset-md-2 col-sm-12">
                            <div className="section-title">
                                <h2>SignUp</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-32 sm-mt-2">
                        <div className="col-lg-8 offset-lg-2 col-md-12 col-sm-12">
                            <div className="contact-form style-1 text-center">
                                <Form method="post" onSubmit={(event) => {
                                    console.log(event)
                                }}>
                                    {/* <form onSubmit={(event) => {
                                    event.preventDefault()
                                    saveUser('UName', 'Role',metamaskAddress,signupContract);
                                }}> */}
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <input type="text" name="UserName" placeholder="UserName" required />
                                        </div>

                                        <div className="col-sm-6">
                                            <input type="email" name="Email" placeholder="Email" required />
                                        </div>
                                        <div className="col-sm-12">
                                            <textarea type="text" name="Address" placeholder="Address" required />
                                        </div>
                                        <div className="col-sm-12">
                                            <input type="number" className="form-control" name="ContactNumber" placeholder="ContactNumber" maxLength={10} required />
                                        </div>
                                        <div className="col-sm-12">
                                            <input type="text" name="MetamaskAddress" defaultValue={metamaskAddress} placeholder="Wallet Address" required />
                                        </div>
                                        <div className="col-sm-12">
                                            <select name="UserType">
                                                <option value="">Choose Your Role</option>
                                                <option value="Farmer">Farmer</option>
                                                <option value="Inspector">Inspector</option>
                                                <option value="Certifier">Certifier</option>

                                            </select>
                                        </div>
                                        <div className="col-sm-12">
                                            <button type="submit" className="btn-common btn-border">Signup</button>
                                        </div>
                                    </div>
                                    {/* </form> */}
                                </Form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );


}
async function SaveUser(formData) {
    let user_json_data = formData
    //     profilePic: "convertedImage",
    console.log('File to converted into ipfs hash')
    console.log(user_json_data);

    const Role = formData.UserType;
    const metamaskAddress = formData.MetamaskAddress
    const ipfsHash = await saveToIpfs(user_json_data);
    signupContract.methods.savesignup(metamaskAddress, ipfsHash, Role).send({ from: metamaskAddress }).on('transactionHash', (hash) => {
        console.log(hash);

        SweetAlert.fire({
            title: "Success",
            text: "Registration Completed Successfully!",
            // type: "success"
            // title: <strong>Success</strong>,
            // html: <i>Registration Completed Successfully!</i>,
            icon: 'success'
        }).then(() => navigate(`/`))

    });
}

export async function loader() {
    const fetchBlockchainData = await myBlockchainData();
    return { fetchBlockchainData };
}
export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    console.log('action')
    console.log(updates)
    await SaveUser(updates);

    return redirect(`/signup`);
}


export default SignUp;