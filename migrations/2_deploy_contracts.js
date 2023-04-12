var userSignup = artifacts.require("UserSignup");
var applicationData = artifacts.require("ApplicationData");

module.exports =async function(deployer) {
  deployer.deploy(userSignup);
  deployer.deploy(applicationData);
};
