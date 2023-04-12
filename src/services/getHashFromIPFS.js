import { create } from 'ipfs-http-client';


const getHashFromIPFS = async (id) => {
  // const ipfs = await create({ host: 'localhost', port: '5001', protocol: 'http' });
  const ipfs = createClient({ host: "ipfs.infura.io", port: 5001, protocol: "https" });


  console.log('getFromIpfs')
  const ipfsHash = await ipfs.cat(id);
  console.log(ipfsHash)
  return ipfsHash.next();
}
export default getHashFromIPFS;