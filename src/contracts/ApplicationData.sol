// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

contract ApplicationData is ERC721Full {
    constructor() public ERC721Full("MyNFT", "MNFT") {}
    
    uint256[] ApplicationReceived;
    //struct to save applicationhash
    struct Application {
        string applicationHash;
    }
    mapping(uint256 => Application) ApplicationTable;

    /// @dev used to save order for consignee
    struct ApplicationList {
        uint256[] applicationNumberList;
        string[] appHash;
    }
    mapping(address => ApplicationList) UserApplications;

    function saveApplication(
        uint256 ApplicationNo,
        address wallet_address,
        string memory hash
    ) public returns (bool) {
        ApplicationTable[ApplicationNo].applicationHash = hash; // Mapping Application No with Application Hash value

        // UserApplications[wallet_address].appHash.push(hash); // Mapping Wallet with Application Hash value

        UserApplications[wallet_address].applicationNumberList.push(
            ApplicationNo
        ); //Mapping User Wallet with applicationno.

        ApplicationReceived.push(ApplicationNo); //push all application to an array

        mintToken(wallet_address, ApplicationNo, hash);

        return true;
    }

    function updateApplication(
        uint256 ApplicationNo,
        string memory hash
    ) public returns (bool) {
        ApplicationTable[ApplicationNo].applicationHash = hash; // Mapping Application No with Application Hash value
        return true;
    }

    // Get Application Hash for an Application No.
    function getApplicationData(
        uint256 ApplicationNo
    ) public view returns (string memory) {
        return ApplicationTable[ApplicationNo].applicationHash;
    }

    //Get application no for a user
    function getUserApplication(
        address wallet_address
    ) public view returns (uint256[] memory) {
        return (UserApplications[wallet_address].applicationNumberList);
    }

    //  //Get application hash array for a user
    // function getUserApplicationHashList(
    //     address wallet_address
    // ) public view returns (string[] memory) {
    //     return (
    //                    UserApplications[wallet_address].appHash

    //     );
    // }

    //Return total applcations received
    function getApplicationList() public view returns (uint256[] memory) {
        return ApplicationReceived;
    }

    //ERC721 Token Starts
    function mintToken(
        address toAddress,
        uint256 tokenId,
        string memory tokenURI
    ) public returns (uint256) {
        // uint256 newItemId = _tokenIds.current();
        uint256 newItemId = tokenId;
        _mint(toAddress, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function checkIfTokenExist(uint _tokenId) external view returns (address) {
        require(_exists(_tokenId), "Error!");
        return ownerOf(_tokenId);
    }

    //ERC721 Ends
    //********************unique token id for application************************************ */
    struct Tokens {
        uint256[] ERC721Tokens;
    }
    mapping(address => Tokens) TokenData;

    function saveTokenData(
        address acc,
        uint256[] memory tArray
    ) public returns (bool) {
        for (uint k = 0; k < tArray.length; k++) {
            TokenData[acc].ERC721Tokens.push(tArray[k]);
        }
        return true;
    }

    function popToken(address acc) public view returns (uint256) {
        return TokenData[acc].ERC721Tokens[0];
    }
}
