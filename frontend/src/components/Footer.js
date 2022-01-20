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
import { Link } from "react-router-dom";
// reactstrap components
import {
    Button,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
    UncontrolledTooltip,
} from "reactstrap";

export default function Footer() {
    return (
        <footer className="footer">
          <Container>
              <Row>
                  <Col md="3">
                      <h1 className="title">NEAR•</h1>
                      <img 
                          style={{width: "45%"}}
                          alt="NEAR"
                          src="https://s3-us-west-1.amazonaws.com/compliance-ico-af-us-west-1/production/token_profiles/logos/original/9d5/c43/cc-/9d5c43cc-e232-4267-aa8a-8c654a55db2d-1608222929-b90bbe4696613e2faeb17d48ac3aa7ba6a83674a.png" />
                    </Col>
                    <Col md="3">
                        <Nav>
                            <NavItem>
                                <NavLink to="/" tag={Link}>
                                    Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/landing-page" tag={Link}>
                                    Landing
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/register-page" tag={Link}>
                                    Register
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/detail" tag={Link}>
                                    Profile
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col md="3">
                        <Nav>
                            <NavItem>
                                <NavLink href="https://creative-tim.com/contact-us?ref=blkdsr-footer">
                                    Contact Us
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://creative-tim.com/about-us?ref=blkdsr-footer">
                                    About Us
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://creative-tim.com/blog?ref=blkdsr-footer">
                                    Blog
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://opensource.org/licenses/MIT">
                                    License
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col md="3">
                        <h3 className="title">Follow us:</h3>
                        <div className="btn-wrapper profile">
                            <Button
                                className="btn-icon btn-neutral btn-round btn-simple"
                                color="default"
                                href="https://twitter.com/creativetim"
                                id="tooltip622135962"
                                target="_blank"
                            >
                                <i className="fab fa-twitter" />
                            </Button>
                            <UncontrolledTooltip delay={0} target="tooltip622135962">
                                Follow us
                            </UncontrolledTooltip>
                            <Button
                                className="btn-icon btn-neutral btn-round btn-simple"
                                color="default"
                                href="https://www.facebook.com/creativetim"
                                id="tooltip230450801"
                                target="_blank"
                            >
                                <i className="fab fa-facebook-square" />
                            </Button>
                            <UncontrolledTooltip delay={0} target="tooltip230450801">
                                Like us
                            </UncontrolledTooltip>
                            <Button
                                className="btn-icon btn-neutral btn-round btn-simple"
                                color="default"
                                href="https://dribbble.com/creativetim"
                                id="tooltip318450378"
                                target="_blank"
                            >
                                <i className="fab fa-dribbble" />
                            </Button>
                            <UncontrolledTooltip delay={0} target="tooltip318450378">
                                Follow us
                            </UncontrolledTooltip>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
