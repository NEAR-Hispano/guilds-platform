/*!

=========================================================
* BLK Design System React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// reactstrap components
import {
    Button,
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    UncontrolledTooltip
} from "reactstrap";

export default function SocialCards({joined, guild}) {
  const JOINED = 'JOINED';
  
  
  return joined !==JOINED ? <></> :
     (
        <div className="section section-lg">
            <Container>
                <Row>
                    <Col className="ml-auto mr-auto" md="8" xl="11">
                        <h1 id="content">
                            OUR SOCIAL MEDIA {" "}
                            <small className="text-muted">Check out the latest news and join the conversation on our social media channels...</small>
                        </h1>
                    </Col>
                </Row>
                <Row>
                    { (guild.telegram || guild.discord)  &&
                        <Col className="ml-auto mr-auto" md="10" xl="5">
                            <hr className="line-info" />
                            <h2>
                                Join our {" "}
                                <span className="text-info">Community</span>
                            </h2>
                            <Card>
                                <CardHeader>
                                    <div className="content-center">
                                        <h3>
                                            Interact with us on our Telegram and Discord channels, too!
                                        </h3>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    { (guild.telegram)  && <>
                                        <Button
                                            color="info"
                                            href={guild.telegram}
                                            id="telegramTooltip"
                                            target="_blank"
                                        >
                                            <i className="fab fa-telegram-plane" /> {" "} Telegram
                                        </Button>
                                        <UncontrolledTooltip delay={0} target="telegramTooltip">
                                            Contact us
                                        </UncontrolledTooltip> </> 
                                    }
                                    { (guild.discord) && <>
                                        <Button
                                            color="primary"
                                            href={guild.discord}
                                            id="discordTooltip"
                                            target="_blank"
                                        >
                                            <i className="fab fa-discord" /> {" "} Discord
                                        </Button>
                                        <UncontrolledTooltip delay={0} target="discordTooltip">
                                            Talk to us
                                        </UncontrolledTooltip> </> 
                                    }
                                </CardBody>
                            </Card>
                        </Col> 
                    } 

                    { (guild.twitter || guild.youtube || guild.medium)  &&                
                        <Col className="ml-auto mr-auto" md="10" xl="5">
                            <hr className="line-warning" />
                            <h1>
                                Follow us on {" "}
                                <span className="text-warning">Social Networks</span>
                            </h1>
                            <Card>
                                <CardHeader>
                                    <div className="content-center">
                                        <h3>
                                            For breaking news and exclusive content, follow us at: Twitter and Medium.
                                        </h3>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    { (guild.twitter) && <>
                                        <Button
                                            color="twitter"
                                            href={guild.twitter}
                                            id="twitterTooltip"
                                            target="_blank"
                                        >
                                            <i className="fab fa-twitter" /> {"   "} Twitter
                                        </Button>
                                        <UncontrolledTooltip delay={0} target="twitterTooltip">
                                            Follow us
                                        </UncontrolledTooltip></> 
                                    }
                                    { (guild.medium) && <>
                                        <Button
                                            color="default"
                                            href={guild.medium}
                                            id="mediumTooltip"
                                            target="_blank"
                                        >
                                            <i className="fab fa-medium" /> {" "} Medium
                                        </Button>
                                        <UncontrolledTooltip delay={0} target="mediumTooltip">
                                            Follow us
                                        </UncontrolledTooltip> </> 
                                    }
                                    { (guild.youtube) && <>
                                        <Button
                                            color="dribbble"
                                            href={guild.youtube}
                                            id="youtubeTooltip"
                                            target="_blank"
                                        >
                                            <i className="fab fa-youtube" /> {" "} Youtube
                                        </Button>
                                        <UncontrolledTooltip delay={0} target="youtubeTooltip">
                                            Like us
                                        </UncontrolledTooltip> </> 
                                    }
                                </CardBody>
                            </Card>
                        </Col>
                    }
                </Row>
                <Row>
                { (guild.github) &&
                    <Col className="ml-auto mr-auto" md="10" xl="5">
                        <hr className="line-primary" />
                        <h1>
                            Fork us at{" "}
                            <span className="text-primary">GitHub</span>
                        </h1>
                        <Card>
                            <CardHeader>
                                <div className="content-center">
                                    <h3>
                                        We invite you to join our development efforts on GitHub.
                                    </h3>
                                </div>
                            </CardHeader>
                            <CardBody >
                                { (guild.github) && <>
                                    <Button
                                        color="default"
                                        href={guild.github}
                                        id="githubTooltip"
                                        target="_blank"
                                    >
                                        <i className="fab fa-github" /> {" "} GitHub
                                    </Button>
                                    <UncontrolledTooltip delay={0} target="githubTooltip">
                                        Join us
                                    </UncontrolledTooltip> </> 
                                }
                            
                            </CardBody>
                        </Card>
                    </Col>
                }
                { (guild.website) &&
                    <Col className="ml-auto mr-auto" md="10" xl="5">
                        <hr className="line-success" />
                        <h1>
                            Visit our {" "}
                            <span className="text-success">WebSite</span>
                        </h1>
                        <Card>
                            <CardHeader>
                                <div className="content-center">
                                    <h3>
                                        For more information, visit our website.
                                    </h3>
                                </div>
                            </CardHeader>
                            <CardBody>
                                { (guild.website) && <>
                                    <Button
                                        color="warning"
                                        href={guild.website}
                                        id="websiteTooltip"
                                        target="_blank"
                                    >
                                        <i className="fab fa-dribbble" /> {" "} Official Page
                                    </Button>
                                    <UncontrolledTooltip delay={0} target="websiteTooltip">
                                        Visit us
                                    </UncontrolledTooltip> </> 
                                }
                            </CardBody>
                        </Card>
                    </Col>
                }
                </Row>
            </Container>
        </div>
    );
}
