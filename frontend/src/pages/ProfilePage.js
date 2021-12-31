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
import { useLocation } from "react-router-dom"
// javascript plugin used to create scrollbars on windows
//import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    UncontrolledTooltip
} from "reactstrap";

// core components
import Navigationbar from "components/Navigationbar.js";
import Footer from "components/Footer.js";
import JoinButton from '../components/JoinButton';
import SocialNetworks from '../components/SocialNetworks';
import { setJoinMsg } from "../utils";

export default function ProfilePage({match}) {
    const [guildData, setGuild] = React.useState({});
    const [guildsUser, setGuildsUser] = React.useState("Validating...");
    const [numSubs, setNumSubs] = React.useState('Loading...');


    //Getting state passed by link route
    const location = useLocation();
    const info = location.state?.guild;

    const getGuildUser = async () => {
        /* If member was joining a guild is successfully, 
        * re-query all guilds by user to confirm that user has joined successfully
        */
        await window.contract.get_guilds_by_user()
        .then((response) => {
            setGuildsUser(response);
        });
    }

    useEffect(() => {
        if(location.state?.guildsUser) {
            setGuildsUser(location.state.guildsUser);
        } else {
            getGuildUser();
        }
        
    }, []);

    //Query to get guild subscribers amount
    const handleSubs = async() => {
        await window.contract.get_num_members({slug:match.params.slug || ''})
        .then(response => {
            setNumSubs(`${response}`);
        }).catch(() => {
            setNumSubs('0');
        });   
    }
  
    useEffect(() => {
        if (info) {
            localStorage.setItem('GUILD', JSON.stringify(info));
        }    
      
    }, [info]);

    useEffect(() => {
        setGuild(info || JSON.parse(localStorage.getItem('GUILD')));
    }, [info]);

    useEffect(() => {
        handleSubs();
    }, []);
    

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
            <Navigationbar />
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
                            <Col className="ml-auto mr-auto" lg="4" md="6">
                                <Card className="card-plain">
                                    <CardHeader>
                                        <img
                                            alt={guildData.title}
                                            className="img-center img-fluid rounded-circle"
                                            src={guildData.logo}
                                            onError={ 
                                                (e)=>{
                                                    e.target.onerror = null;
                                                    e.target.src=require("assets/img/logo-nf.png").default
                                                }
                                          }
                                          />  
                                    </CardHeader>
                                    <CardBody className="text-center">
                                    <   JoinButton 
                                        guild={guildData} 
                                        guildsUser={location.state?.guildsUser || guildsUser} 
                                        setGuildsUser={setGuildsUser}/>          
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" md="6" style={{margin: "auto"}}>
                                <h6 className="text-on-back">{guildData.title}</h6>
                                <br/>
                                <p className="profile-description">
                                    {guildData.oneliner}
                                </p>
                                <div className="btn-wrapper profile pt-3 text-left">
                                    <SocialNetworks 
                                        joined={setJoinMsg(guildsUser, guildData.slug)} 
                                        guild={guildData}
                                    /> 
                                    <Button
                                        className="btn-icon btn-round"
                                        color="dribbble"
                                        href={guildData.website}
                                        id="websiteTooltip"
                                        target="_blank"
                                    >
                                        <i className="fab fa-dribbble" />
                                    </Button>
                                    <UncontrolledTooltip delay={0} target="websiteTooltip">
                                        Visit us
                                    </UncontrolledTooltip>
                                    
                                </div>
                            </Col>
                        </Row>
                    </Container>
                  </div>
                  <div className="section">
                      <Container>
                          <Row>
                              <Col sm="6">
                                  <Card  bg='primary' style={{ width: '25rem' }} className="mb-6">
                                      <CardHeader>
                                          <h2>MEMBERS:&nbsp;&nbsp;<strong>{numSubs}</strong></h2>
                                      </CardHeader>
                                  </Card>
                              </Col>
                          </Row>
                      </Container>
                  </div>       
                  <Footer />
            </div>
        </>
    );
}
