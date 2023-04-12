import React from "react";
// import Link from "./Link";
import { Outlet, Link } from "react-router-dom";

// import { Outlet, Link,useLoaderData } from "react-router-dom";

const Header = ({ isLoggedIn ,UName,Role}) => {
  const links = [
    { label: "Home", path: "/" },
  ];
  console.log("isLoggedIn in header");
  console.log(isLoggedIn);

  const renderedLinks = links.map((link) => {
    return (
      <>
        {link.label}

      </>
      );
  });
  let signupbtn;
  if (!isLoggedIn) {
    signupbtn = (
      <div className="contact-form cart-link">
        <button className=" btn-common btn-border">
        <Link to={`/signup`} > Sign Up</Link>
        </button>
      </div>
    );
  }
  else{
	signupbtn = (
		<>
		Welcome,
    <b>{UName}</b>
      {/* Role :<b>{Role}</b> */}
			{/* <p>Role:Farmer</p>	 */}
				</>
	)
  }

  return (
    <div>
      
      <header className="header-area">
        {/* <!--header-bottom--> */}
        <div id="sticker" className="header-bottom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-sm-2">
                <div className="logo">
                  <a href="index.html">
                    <img src="assets/images/logo.png" alt="logo" />
                  </a>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mainmenu text-center">
                  <nav>
                    <ul>
                      {/* 


                      <li>
                        <a href="contact.html">Contact Us</a>
                      </li> */}
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="search-and-cart">
                  {/* <!--search-box--> */}
               
                  {/* <!--shopping-cart--> */}

                  {signupbtn}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* <!--header-area end--> */}
    </div>
  );
};
export default Header;
