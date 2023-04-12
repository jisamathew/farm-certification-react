// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

/// @title User Registration
/// @author Jisa
/// @notice Use this contract for saving and retreiving registered users

contract UserSignup {
    //sign up or login
    struct reg {
        string role;
        string userHash;
    }
    mapping(address => reg) public register;

    function savesignup(
        address account,
        string memory hash,
        string memory urole
    ) public payable returns (bool) {
        register[account].userHash = hash;
        register[account].role = urole;
        return true;
    }

    function userRole(address account) public view returns (string memory) {
        return (register[account].role);
    }

    function logindata(address account) public view returns (string memory) {
        return (register[account].userHash);
    }
}
