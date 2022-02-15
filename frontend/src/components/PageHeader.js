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
import React from "react";

// reactstrap components
import { 
    Col, 
    Container, 
    Row } from "reactstrap";

export default function PageHeader() {
    return (
        <div>
            <div className="squares square1" />
            <div className="squares square2" />
            <div className="squares square3" />
            <div className="squares square4" />
            <div className="squares square5" />
            <div className="squares square6" />
            <div className="squares square7" />
            <div style={{height:'200px'}}/>
            <Container>
                <Row  className="justify-content-center">
                    <Col md="9" xl="8">
                        <h4 className="text-on-back">
                            Join awesome guilds on Blockchain
                        </h4>       
                        <hr className="line-info" />
                        <h3>
                            Guilds platform is  {" "}
                            <span className="text-info">an on chain DApp </span>
                            {" "} that allows you to start your path into NEAR communities.
                        </h3> 
                    </Col>

                    <Col md="3">
                        <img 
                            alt="NEAR"
                            src="https://s3-us-west-1.amazonaws.com/compliance-ico-af-us-west-1/production/token_profiles/logos/original/9d5/c43/cc-/9d5c43cc-e232-4267-aa8a-8c654a55db2d-1608222929-b90bbe4696613e2faeb17d48ac3aa7ba6a83674a.png" />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col lg="12" >
                        <Row className="row-grid justify-content-center">
                            <Col lg="4">
                                <div className="info" style={{padding:'25% 10% 20% 15%'}}>
                                    <div className="icon icon-danger">
                                        <i className="far fa-paper-plane" />
                                    </div>
                                    <h4 className="info-title">Community</h4>
                                    <hr className="line-danger" />
                                    <p>
                                        Join a guild and share with other community members.
                                    </p>
                                </div>
                            </Col>
                            <Col lg="4">
                                <div className="info" style={{padding:'25% 10% 20% 15%'}}>
                                    <div className="icon icon-warning">
                                        <i className="tim-icons icon-app" />
                                    </div>
                                    <h4 className="info-title">Blockchain</h4>
                                    <hr className="line-warning" />
                                    <p>
                                        Become an active member of guilds interacting with NEAR Blockchain.
                                    </p>
                                </div>
                            </Col>
                            <Col lg="4">
                                <div className="info" style={{padding:'25% 10% 20% 15%'}}>
                                    <div className="icon icon-success">
                                        <i className="fas fa-hand-paper" />
                                    </div>
                                    <h4 className="info-title">Participate</h4>
                                    <hr className="line-success" />
                                    <p>
                                        Participate and interact directly with your NEAR Account.
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
