import { create } from 'ipfs-http-client';


const saveToIpfs = async (file) => {
  
    // const ipfs =  create({ host: 'localhost', port: '5001', protocol: 'http' });
    const ipfs = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

  console.log('saveToIpfs')
  console.log(file);
  const files_json = JSON.stringify(file);
  console.log(files_json);
  const ipfsHash = await ipfs.add(files_json);
 
  return ipfsHash.path;
}
export default saveToIpfs;
