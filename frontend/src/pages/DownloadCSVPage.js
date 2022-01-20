/*!

************************************************************
* BLK Design System React - v1.2.0
************************************************************

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

************************************************************

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect} from "react";
// javascript plugin used to create scrollbars on windows
//import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import {
    Card,
    CardHeader,
    Container,
    Row,
    Col,
} from "reactstrap";

// core components
import IndexNavbar from "components/IndexNavbar";
import Footer from "components/Footer";
import DownloadCsv from '../components/DownloadCsv';

export default function DownloadCSVPage({match}) {
    
    console.log(match);
    useEffect(() => {       
        if (navigator.platform.indexOf("Win") > -1) {
            document.documentElement.className += " perfect-scrollbar-on";
            document.documentElement.classList.remove("perfect-scrollbar-off");
        }
        document.body.classList.toggle("profile-page");
        // Specify how to clean up after this effect:
        return function cleanup() {
            if (navigator.platform.indexOf("Win") > -1) {
                document.documentElement.className += " perfect-scrollbar-off";
                document.documentElement.classList.remove("perfect-scrollbar-on");
            }
            document.body.classList.toggle("profile-page");
        };
    }, [match.params.slug]);

    return (
        <>
            <IndexNavbar />
            <div className="wrapper">
                <div className="page-header">
                    <img
                        alt="..."
                        className="dots"
                        src={require("assets/img/dots.png").default}
                    />
                    <img
                        alt="..."
                        className="path"
                        src={require("assets/img/path4.png").default}
                    />
                    <Container className="align-items-center">
                        <Row>
                            <Col className="ml-auto mr-auto" lg="3" md="4">
                                <Card className="card-plain">
                                    <CardHeader>
                                        <img
                                            alt="Download NEAR ID's CSV"
                                            className="img-center img-fluid rounded-circle"
                                            src="https://c.neh.tw/thumb/f/720/comvecteezy366213.jpg"
                                            onError={ 
                                                (e)=>{
                                                    e.target.onerror = null;
                                                    e.target.src=require("assets/img/logo-nf.png").default
                                                }
                                          }
                                          />  
                                    </CardHeader>
                                </Card>
                            </Col>
                            <Col lg="7" md="6" style={{margin: "auto"}}>
                                <h6 className="text-on-back">Download NEAR ID's CSV</h6>
                                <br/>
                                <p className="profile-description">
                                    Please select where you want to download your info from.
                                </p>
                                <DownloadCsv slug={match.params.slug}/>
                            </Col>
                        </Row>
                    </Container>
                  </div>
                  <br/>

                  <Footer />
            </div>
        </>
    );
}
