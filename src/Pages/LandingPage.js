import { Component } from "react";
import Header from "../components/Header";
import getHashFromIPFS from '../services/getHashFromIPFS';
import FarmerHomepage from "./FarmerHomepage";
import InspectorHomepage from "./InspectorHomepage";
import CertifierHomepage from "./CertifierHomepage";
import Main from "../components/Main";

import { Buffer } from 'buffer';

class LandingPage extends Component {
    async componentDidMount() {
        await this.getLoginDetails();
        await this.getUserInDetails();

    }
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            role: '',
            UName: ''
        }
        console.log(this);

    }
    render() {
        let contentLoad

        {

            if (this.state.isLoggedIn) {
                if (this.state.role === 'Farmer') {
                    contentLoad = <>
                        <FarmerHomepage account={this.props.account} signup={this.props.signup} certificateApplication={this.props.certificateApplication} />
                    </>

                }
                else if (this.state.role === 'Inspector') {
                    contentLoad = <>
                        {/*     return (<> */}
                        <InspectorHomepage account={this.props.account} signup={this.props.signup} certificateApplication={this.props.certificateApplication} />
                    </>
                    {/* ) */ }
                }
                else if (this.state.role === 'Certifier') {
                    // return (<>
                    contentLoad = <>
                        <CertifierHomepage account={this.props.account} signup={this.props.signup} certificateApplication={this.props.certificateApplication} />
                    </>
                    // )
                }
            }
            else {
                return (
                    <>
                        <Header isLoggedIn={this.state.isLoggedIn} />

                        <Main />
                    </>
                )

            }


        }
        return (
            <div>
                <Header isLoggedIn={this.state.isLoggedIn} UName={this.state.UName} Role={this.state.role} />
                {contentLoad}
            </div >
        )
    }

    async getLoginDetails() {
        console.log('getlogindetails in landing page')
        console.log(this)
        console.log('this.state.signup')
        console.log(this.props.signup)
        let loginUserType = await this.props.signup.methods.userRole(this.props.account).call();

        if (loginUserType) {
            console.log('loginData')
            console.log(loginUserType)

            this.setState({ isLoggedIn: true });
            this.setState({ role: loginUserType });

            console.log('logging in')

        }

    }
    async getUserInDetails() {
        console.log('getUserHash')
        console.log(this.props.signup);
        console.log(this.props.account);
        let loginHash = await this.props.signup.methods.logindata(this.props.account).call();
        console.log(loginHash)
        if (loginHash) {
            const ipfsHashData = await getHashFromIPFS(loginHash);
            console.log('getting data back from ipfs');
            console.log(ipfsHashData);
            console.log('***********')
            const ipfsConverted = JSON.parse(Buffer.from(ipfsHashData.value.buffer).toString());
            var userHash = ipfsConverted;
            console.log('hash in backend')
            console.log(userHash.UserName);
            this.setState({ UName: userHash.UserName })
            if (userHash) {
                console.log('getting data')
            }
        }
    }
}


export default LandingPage;