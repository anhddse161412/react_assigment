import React from "react";
import { Breadcrumb, BreadcrumbItem, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

function About(props) {
   return (
      <div className="container body-content">
         <div className="row">
            <Breadcrumb>
               <BreadcrumbItem>
                  <Link to="/home">Home</Link>
               </BreadcrumbItem>
               <BreadcrumbItem active>About Us</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
               <h3>About Us</h3>
               <hr />
            </div>
         </div>
         <div className="row row-content  text-justify">
            <div className="col-12 col-md-6">
               <h2>ABOUT US</h2>
               <p>
                  Hypergryph was founded on January 24, 2017 by Hai Mao and his
                  colleagues from Yostar and MICA Team (now Sunborn), the latter
                  of which is notable for being the developer of Girls'
                  Frontline. Most of them, including Hai Mao himself, are the
                  alumni of China Academy of Art; later on Hypergryph also hired
                  former members of Massive Black and Cygames branches in
                  mainland China. Early after their foundation, Hypergryph
                  started the development of Arknights, which is the first video
                  game they developed before Ex Astris.
               </p>
            </div>
            <div className="col-12 col-md-5">
               <h2>ARKNIGHT OVERVIEW</h2>
               <p>
                  Arknights is a mobile tower defense (TD) game developed by
                  Hypergryph, originally released in mainland China (CN) on May
                  1, 2019, before received a release in Japan, Korea, North
                  America, Europe, and Southeast Asia (collectively known as
                  Global) by Yostar on January 16, 2020, and in Taiwan, Hong
                  Kong, and Macau (TW) by Longcheng on June 29, 2020.
               </p>
            </div>
            <div className="col-12 text-center">
               <Card
                  style={{
                     backgroundColor: "#333",
                     borderColor: "#898989",
                  }}
               >
                  <CardBody className="bg-faded">
                     <blockquote className="blockquote">
                        <p className="mb-0">
                           Life is just like a gacha game, if something is not
                           100% then it's 50%
                        </p>
                        <footer className="blockquote-footer">
                           Nanashi Mumei --
                           <cite title="Source Title"> The Nameless </cite>
                        </footer>
                     </blockquote>
                  </CardBody>
               </Card>
            </div>
         </div>
         <div className="row row-content">
            <div className="col-12 text-justify"></div>

            <div className="col-12 text-justify row">
               {/* <Media list>{}</Media> */}
               <div className="col-12 col-md-6">
                  <h2>Notable employees</h2>
                  <p>
                     Hai Mao (海猫): Founder, Vice President, and Head Producer{" "}
                     <br />
                     Rua Niu (RUA牛): Real name Le Junwei (乐俊伟); Developer
                     and Game Designer
                     <br />
                     Huang Yifeng (黄一峰)/: CEO (current)
                     <br />
                     Fan Rundong (樊润冬): Head Developer
                     <br />
                     Wei@W (唯@W): Art Director; also known as Yui@W and
                     Hoshieve
                     <br />
                     Da Huang (大黄): Level Designer
                     <br />
                     STAR: Company Operations Director
                     <br />
                     William: Game Operations Director
                     <br />
                     Xiang Yangchao (巷陌曹): Merchandise Designer
                     <br />
                     BREAKLESS: Audio Engineer
                     <br />
                  </p>
               </div>

               <div className="col-12 col-md-6">
                  <img
                     src="/assets/images/lobby_bg.png"
                     alt=""
                     height={400}
                     width={530}
                  ></img>
               </div>
            </div>
         </div>
      </div>
   );
}

export default About;
