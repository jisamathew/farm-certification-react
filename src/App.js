import { Component } from "react";
import { Buffer } from 'buffer';
import './App.css'
import Web3 from 'web3';
// import Route from "./components/Route";
import UserSignup from './truffle_abis/UserSignup.json'
import ApplicationData from './truffle_abis/ApplicationData.json'

import Loader from "./components/Loader";
import LandingPage from "./Pages/LandingPage"

import getHashFromIPFS from "./services/getHashFromIPFS";
import Signup from "./Pages/SignUp";

class App extends Component {
    async componentDidMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
        // await this.getLoginDetails()


    }
    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert('No ethereum browser detected ! You can checkout Metamask')
        }
    }
    async loadBlockchainData() {
        const web3 = window.web3
        const account = await web3.eth.getAccounts()
        this.setState({ account: account[0] })
        const networkId = await web3.eth.net.getId()
        console.log(networkId, 'Network ID')

        //Load userSignup Contract
        const userSignupData = UserSignup.networks[networkId]
        if (userSignupData) {
            const signup = new web3.eth.Contract(UserSignup.abi, userSignupData.address)
            this.setState({ signup })
            console.log(signup)
        }
        else {
            window.alert('UserSignup contract not deployed - no detected network')
        }

        //Load ApplicationData Contract
        const applicationData = ApplicationData.networks[networkId]
        if (applicationData) {
            const certificateApplication = new web3.eth.Contract(ApplicationData.abi, applicationData.address)
            this.setState({ certificateApplication })
            console.log(certificateApplication)

        }
        else {
            window.alert('ApplicationData contract not deployed - no detected network')
        }

        this.setState({ loading: false });
    }

    constructor(props) {
        super(props)
        this.state = {
            account: '0x0',
            signup: {},
            certificateApplication:{},
            loading: true,          
        }
        // this.getLoginDetails();
    }
    render() {
        let content

        {
            console.log(this.state.loading)
            if(this.state.loading)
                return <Loader />
            else{
                return(
                    <>
                 
                    {/* <Route path="/"> */}

                    <LandingPage signup={this.state.signup} account={this.state.account} certificateApplication={this.state.certificateApplication}/>
                   
                {/* </Route> */}
                    {/* <Route path="/signup">
                     <Signup account={this.state.account} signup={this.state.signup} />
                </Route>
                <Route path="/application" >
                      <ApplicationForm account={this.state.account} signup={this.state.signup} certificateApplication={this.state.certificateApplication}/>
                </Route>
                <Route path="/track" >
                      <Track account={this.state.account} signup={this.state.signup} certificateApplication={this.state.certificateApplication}/>
                </Route>
                <Route path="/viewapplication" >
                      <ViewApplication account={this.state.account} signup={this.state.signup} certificateApplication={this.state.certificateApplication}/>
                </Route> */}
               
                </>
                )
               
            }
               
        }
    }

   
}
export async function myWeb3(){
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    }
    else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        window.alert('No ethereum browser detected ! You can checkout Metamask')
    }
}
export async function myBlockchainData() {
    await myWeb3();
    let sendData = [];
    const web3 = window.web3
    const account = await web3.eth.getAccounts()
    // this.setState({ account: account[0] })
    sendData = sendData.concat(account[0])
    const networkId = await web3.eth.net.getId()
    console.log(networkId, 'Network ID')
    //Load userSignup Contract
    const userSignupData = UserSignup.networks[networkId]
    if (userSignupData) {
        const signup = new web3.eth.Contract(UserSignup.abi, userSignupData.address)
        // this.setState({ signup })
        console.log(account[0]);
        console.log(signup)
        sendData = sendData.concat(signup)
        //fetch user data
        let loginHash = await signup.methods.logindata(account[0]).call();
        if(loginHash){
        const ipfsHashData = await getHashFromIPFS(loginHash);
        const ipfsConverted = JSON.parse(Buffer.from(ipfsHashData.value.buffer).toString());
        var userHash = ipfsConverted;
        console.log('hash in backend')
        if (userHash) {
          console.log('getting data')

        console.log(userHash.UserName);
        sendData = sendData.concat(userHash)

    }
}

    }
    else {
        window.alert('UserSignup contract not deployed - no detected network')
    }

    //Load ApplicationData Contract
    const applicationData = ApplicationData.networks[networkId]
    if (applicationData) {
        const certificateApplication = new web3.eth.Contract(ApplicationData.abi, applicationData.address)
        // this.setState({ certificateApplication })
        console.log(certificateApplication)
        sendData = sendData.concat(certificateApplication)
        return(sendData)

    }
    else {
        window.alert('ApplicationData contract not deployed - no detected network')
    }


// console.log(signup)
    // this.setState({ loading: false });
}


export default App;