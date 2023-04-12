import { useState, useEffect } from "react";
import { Form, useParams, useLoaderData, useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import getHashFromIPFS from "../services/getHashFromIPFS";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./OrganicCertificate.css";
// import styles from './index.module.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import imageFile from "../images/NPOP.jpg";

let applicationContract, metamaskAddress, userData, navigate;

function OrganicCertificate() {
  const [isPrinting, setIsPrinting] = useState(false);
  const [fetchedData, setFetchedData] = useState("");
  const { fetchBlockchainData } = useLoaderData();
  navigate = useNavigate();

  let { id } = useParams();
  var isMobile = false; //initiate as false
  let qrsize = 100;
  let data = id;
  let imgqr =
    "http://chart.googleapis.com/chart?cht=qr&chs=" +
    qrsize +
    "x" +
    qrsize +
    "&choe=UTF-8&chld=L|0&chl=" +
    data;

  metamaskAddress = fetchBlockchainData[0];
  applicationContract = fetchBlockchainData[3];
  userData = fetchBlockchainData[2];

  useEffect(() => {
    fetchData(id)
      .then((res) => {
        console.log("res");
        console.log(res);
        setFetchedData(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const fetchData = async (appno) => {
    console.log("id");
    console.log(id);
    const appDataHash = await applicationContract.methods
      .getApplicationData(appno)
      .call();
    const ipfsData = await getHashFromIPFS(appDataHash);
    console.log(ipfsData);
    return JSON.parse(Buffer.from(ipfsData.value.buffer).toString());
  };
  // console.log(match.params.id)
  // //Check if Mobile view
  // if (
  //   /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
  //     navigator.userAgent
  //   ) ||
  //   /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
  //     navigator.userAgent.substr(0, 4)
  //   )
  // ) {
  //   isMobile = true;
  //   console.log(isMobile);
  //   // alert('Sorry page cannot be rendered in mobile,Can be only available in desktop view');
  //   // Swal.fire(
  //   //   'Oops',
  //   //   'Document available only in Fullscreen mode',
  //   //   'error'
  //   // )
  //   console.log("back");
  // } else {
  //   isMobile = false;
  //   console.log("desktop view");
  //   console.log("isMobile");
  //   console.log(isMobile);
  // }

  const downloadAsPDF = () => {
    // let base64Image = document.getElementById("imgqr").attr('src');
    var data = document.getElementById("pdfTable");
    html2canvas(data).then((canvas) => {
      var imgWidth = 208;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jsPDF("p", "mm", "a4");
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.addImage(imgqr, "png", 170, 10, 20, 20);
      pdf.save("OrganicCertificate.pdf");
    });
  };
  const hidePrintButton = () => {
    setIsPrinting(true);
    return 1;
  };

  const handlePrint = async () => {
    await hidePrintButton();
    window.print();
    window.close();
  };
  return (
    <>
      <Form method="get" className=" position-relative ">
        <div id="pdfTable">
          <div id="" className="container top-100 start-100 ">
            {/* <center> */}
            <div
              className="row object-fit-cover border rounded"
              id="content"
              style={{ border: "1px solid" }}
            >
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-10">
                    <div className="d-flex justify-content-center">
                      <h1>CERTIFICATE</h1>
                    </div>
                    <p className=" text-left fst-italic">
                      This is to certify that the field is Organic
                    </p>
                  </div>
                  <div className="col d-flex justify-content-end">
                    <img
                      id="qr"
                      className="img-fluid"
                      src={imgqr}
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                </div>

                <div className="row ">
                  <div className="d-flex justify-content-start p-4">
                    <h5>FARM DETAILS</h5>
                  </div>
                </div>

                <div className="row ">
                  <div className="col-3">Application No.</div>
                  <div className="col-3">
                    <label id="fieldID">{id}</label>
                  </div>

                  <div className="col-6 justify-content-center ">
                    <img
                      id="standardLogo"
                      src={imageFile}
                      width={"100px"}
                      height={"100px"}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-3 mx-auto p-3">Ownership</div>
                  <div className="col-3  mx-auto p-3">
                    <label id="name">{fetchedData.name}</label>
                  </div>
                  <div className="col-3 mx-auto p-3">Certification for </div>
                  <div className="col-3  mx-auto p-3">
                    <label htmlFor="requirement">
                      {fetchedData.requirement}
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3 mx-auto p-3">Address</div>
                  <div className="col-3  mx-auto p-3">
                    <label htmlFor="Address">{fetchedData.address}</label>
                  </div>
                  <div className="col-3 mx-auto p-3">
                    Certification Standard
                  </div>
                  <div className="col-3  mx-auto p-3">
                    <label htmlFor="Standard">{fetchedData.standard}</label>
                  </div>
                </div>
                <div className="row ">
                  <div className="d-flex p-4 justify-content-start">
                    <h5>INSPECTION DETAILS</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3 mx-auto p-3">Inspected By</div>
                  <div className="col-3  mx-auto p-3">
                    <label id="name">{fetchedData.inspectorName}</label>
                  </div>
                  <div className="col-3 mx-auto p-3">Inspected On </div>
                  <div className="col-3  mx-auto p-3">
                    <label htmlFor="requirement">
                      {fetchedData.inspectionDate}
                    </label>
                  </div>
                </div>
                <div className="row ">
                  <div className="d-flex justify-content-start p-4">
                    <h5>CERTIFICATION DETAILS</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3 mx-auto p-3">Validity </div>
                  <div className="col-3  mx-auto p-3">
                    <label htmlFor="requirement">
                      {fetchedData.expiryInYears}
                    </label>
                  </div>
                  <div className="col-3 mx-auto p-3">Expiry Date </div>
                  <div className="col-3  mx-auto p-3">
                    <label htmlFor="requirement">
                      {fetchedData.expiryDate}
                    </label>
                  </div>
                </div>
                <div className="row"></div>
                <div className="row">
                  <div className="col-1 mx-auto p-3 text-md-start">
                    Place
                    <br />
                    <br />
                    Issue Date
                  </div>
                  <div className="col-2 mx-auto p-3 text-md-start">
                    <label id="name">Singapore</label>
                    <br />
                    <br />
                    <label id="name">{fetchedData.issueDate}</label>
                  </div>
                  <div className="col-4  mx-auto p-3 text-end">
                    <br />
                    <label id="name">{fetchedData.certifierName}</label>
                    <br />
                    <label id="name">(Certifying Authority)</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
      {!isPrinting && (
        <div className="row">
          <div className="col-6 btnrow d-flex justify-content-center">
            {/* <div className=" text-md-right"> */}
            <button className="btn btn-info" onClick={handlePrint}>
              PRINT
            </button>
            {/* </div> */}
          </div>
          <div className="col-6 btnrow d-flex justify-content-center">
            {/* <div className="text-md-left"> */}
            <button className="btn btn-success " onClick={downloadAsPDF}>
              Download <i className="fa fa-download"></i>
            </button>
            {/* </div> */}
          </div>
        </div>
      )}
    </>
  );
}
export default OrganicCertificate;
