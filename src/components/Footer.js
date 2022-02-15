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
          <Container className="text-right" >
              <Row>
                <Col>
                    <h3><b>Follow us:</b></h3>
                    <div className="btn-wrapper profile">
                        <Button
                            className="btn-icon btn-neutral btn-round btn-simple"
                            color="default"
                            href="https://twitter.com/4NTSGuild"
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
                            href="https://www.youtube.com/channel/UCuiVANhh4shJrQbh2gNFV7w"
                            id="tooltip230450801"
                            target="_blank"
                        >
                            <i className="fab fa-youtube" />
                        </Button>
                        <UncontrolledTooltip delay={0} target="tooltip230450801">
                            Like us
                        </UncontrolledTooltip>
                        <Button
                            className="btn-icon btn-neutral btn-round btn-simple"
                            color="default"
                            href="https://nearguilds.com"
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
