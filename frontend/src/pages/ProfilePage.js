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
import JoinButton from '../components/JoinButton'

export default function ProfilePage({match}) {
  const [guildData, setGuild] = React.useState({});
  const [ joined, setJoined ] = React.useState(undefined);

  const [numSubs, setNumSubs] = React.useState('Loading...');

 
  //Getting state passed by link route
  const location = useLocation();
  const info = location.state?.guild;

  //Query to get guild subscribers amount
  const handleSubs = async() => {
      if(window.walletConnection.isSignedIn()){
          await window.contract.get_num_members({slug:match.params.slug || ''})
          .then(response => {
            setNumSubs(`${response}`);
          }).catch(() => {
              setNumSubs('0');
          });
      }        
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
  
 
  const handleJoinUs = async () => {
    if(window.walletConnection.isSignedIn()){
        await window.contract.join_guild({slug:match.params.slug || ''})
        .then(response => {
            setJoined(response);
        }).catch(error => {
            setJoined(undefined);
        });   
    }  
}

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
                    <JoinButton guild={guildData}/>          
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" md="6">
                <h6 className="text-on-back">{guildData.title}</h6>
                <p className="profile-description">
                  {guildData.description || guildData.oneliner}
                </p>
                <div className="btn-wrapper profile pt-3 text-right">
                  <Button
                    className="btn-icon btn-round"
                    color="twitter"
                    href={guildData.twitter}
                    id="twitterTooltip"
                    target="_blank"
                  >
                    <i className="fab fa-twitter" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="twitterTooltip">
                    Follow us
                  </UncontrolledTooltip>
                  <Button
                    className="btn-icon btn-round"
                    color="telegram"
                    href={guildData.telegram}
                    id="telegramTooltip"
                    target="_blank"
                  >
                    <i className="fab fa-telegram-plane" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="telegramTooltip">
                    Contact us
                  </UncontrolledTooltip>
                  <Button
                    className="btn-icon btn-round"
                    color="warning"
                    href={guildData.youtube}
                    id="youtubeTooltip"
                    target="_blank"
                  >
                    <i className="fab fa-youtube" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="youtubeTooltip">
                    Like us
                  </UncontrolledTooltip>
                  <Button
                    className="btn-icon btn-round"
                    color="primary"
                    href={guildData.discord}
                    id="discordTooltip"
                    target="_blank"
                  >
                    <i className="fab fa-discord" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="discordTooltip">
                    Talk to us
                  </UncontrolledTooltip>

                  
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
                    Follow us
                  </UncontrolledTooltip>
                </div>
              </Col>
              
            </Row>
          </Container>
        </div>
        <div className="section">
          <Container>
            <Row>
              
              <Col sm="4">
                <Card  bg='primary' style={{ width: '25rem' }} className="mb-6">
                  <CardHeader>
                    <h2>MEMBERS:&nbsp;&nbsp;<strong>{numSubs}</strong></h2>
                  </CardHeader>
                  <CardBody>
                    {
                      !joined ? '' :
                       Array(joined).fill('').map((member, index) =>{
                        return(
                          <>
                          <Button
                              className="btn-icon btn-round"
                              color="twitter"
                              href={`${member}.near`}
                              id={`tooltip63922573${index}`}
                              target="_blank"
                          >
                              <i className="tim-icons icon-single-02" />
                          </Button>
                          <UncontrolledTooltip delay={0} target={`tooltip63922573${index}`}>
                              {member}
                          </UncontrolledTooltip>
                          </>
                        )
                      })
                    }
                  </CardBody>
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
