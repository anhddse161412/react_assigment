import React from "react";
import { Link } from "react-router-dom";

function Footer(props) {
   return (
      <footer className="footer">
         <div className="container text-justify">
            <div className="row justify-content-center">
               <img
                  src="/assets/images/logo_footer.png"
                  alt=""
                  width={580}
                  height={80}
               ></img>

               <div className="col-4 offset-1 col-sm-2">
                  <h5>Links</h5>
                  <ul className="list-unstyled">
                     <li>
                        <Link to="/home">Home</Link>
                     </li>
                     <li>
                        <Link to="/aboutus">About</Link>
                     </li>
                     <li>
                        <Link to="/news">News</Link>
                     </li>
                     <li>
                        <Link to="/contactus">Contact</Link>
                     </li>
                  </ul>
               </div>

               <div className="col-12 col-sm-4 align-self-center">
                  <div className="text-center m-2">
                     <h5>SOCIAL MEDIA LINKS</h5>
                     <a
                        className="btn btn-social-icon btn-google"
                        href="http://google.com/+"
                     >
                        <i className="fa fa-google-plus"></i>
                     </a>
                     <a
                        className="btn btn-social-icon btn-facebook"
                        href="http://www.facebook.com/profile.php?id="
                     >
                        <i className="fa fa-facebook"></i>
                     </a>
                     <a
                        className="btn btn-social-icon btn-linkedin"
                        href="http://www.linkedin.com/in/"
                     >
                        <i className="fa fa-linkedin"></i>
                     </a>
                     <a
                        className="btn btn-social-icon btn-twitter"
                        href="http://twitter.com/"
                     >
                        <i className="fa fa-twitter"></i>
                     </a>
                     <a
                        className="btn btn-social-icon btn-google"
                        href="http://youtube.com/"
                     >
                        <i className="fa fa-youtube"></i>
                     </a>
                     <a
                        className="btn btn-social-icon btn-github"
                        href="http://youtube.com"
                     >
                        <i className="fa fa-envelope-o"></i>
                     </a>
                  </div>
               </div>
            </div>
            <div className="row justify-content-center">
               <div className="col-auto">
                  <p>© Copyright 2019 Arknights</p>
               </div>
            </div>
         </div>
      </footer>
   );
}

export default Footer;
