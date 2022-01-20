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
    Card,
    CardBody,
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
                <Row>
                    <Col md="10" xl="8">
                        
                        <h4 className="text-on-back">
                            Join to awesome guilds on Blockchain
                        </h4>       
                        <hr className="line-info" />
                        <h3>
                            Guilds platform is  {" "}
                            <span className="text-info">on chain DApp </span>
                            {" "} that allows you to start your path into NEAR communities.
                        </h3> 
                    </Col>

                    <Col md="3">
                        <img 
                            alt="NEAR"
                            src="https://s3-us-west-1.amazonaws.com/compliance-ico-af-us-west-1/production/token_profiles/logos/original/9d5/c43/cc-/9d5c43cc-e232-4267-aa8a-8c654a55db2d-1608222929-b90bbe4696613e2faeb17d48ac3aa7ba6a83674a.png" />
                    </Col>
                </Row>
                <section className="section section-lg section-safe" >
                    <img
                        alt="..."
                        className="path"
                        src={require("assets/img/path5.png").default}
                    />
                    <Container  className="text-center" >
                        <Row className="row-grid justify-content-between">
                            <Col>
                                <img
                                    alt="..."
                                    className="d-block img-fluid floating"
                                    src="https://images.unsplash.com/photo-1450609283058-0ec52fa7eac4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                                    style={{marginLeft:'auto', marginRight:'auto', width:'65%'}}
                                />
                                <Card className="card-stats card-plain">
                                    <CardBody>
                                        <div className="justify-content-center">
                                            <img
                                                alt="..."
                                                className="d-block img-fluid rounded shadow-lg"
                                                src="https://www.pngall.com/wp-content/uploads/10/NEAR-Protocol-Crypto-Logo-PNG.png"
                                                style={{ width: "270px", height:'150px'}}
                                            />
                                            <p className="d-block text-uppercase font-weight-bold mt-2">
                                                Join a guild and share with other community members.
                                            </p>
                                        </div>
                                    </CardBody>
                                </Card>
                                <Card className="card-stats card-plain">
                                    <CardBody>
                                        <div className="justify-content-center">
                                            <img
                                                alt="..."
                                                className="d-block img-fluid rounded shadow-lg"
                                                src="https://miro.medium.com/max/1400/1*zQgsVdOm0AhVwI2OQt3w4w.jpeg"
                                                style={{ width: "560px", height:'230px'}}
                                            />
                                            <p className="d-block text-uppercase font-weight-bold mt-3">
                                                Participate and interact directly with your NEAR Account.
                                            </p>
                                        </div>
                                    </CardBody>
                                </Card>
                                <Card className="card-stats card-plain">
                                    <CardBody>
                                        <div className="justify-content-center">
                                            <img
                                                alt="..."
                                                className="d-block  img-fluid rounded shadow-lg"
                                                src="https://news.bitcointalk.com/wp-content/uploads/2021/10/NEAR-Protocol.jpg"
                                                style={{ width: "560px", height:'230px'}}
                                            />
                                            <p className="d-block text-uppercase font-weight-bold mt-3">
                                                Become an active member of guilds interacting with NEAR Blockchain.
                                            </p>
                                        </div>
                                        
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>
                
            </Container>
            
        </div>
        
    );
}
