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


//let ps = null;

export default function ProfilePage({match}) {
  const [guildData, setGuild] = React.useState({});
  const [ joined, setJoined ] = React.useState(undefined);
  //Query to get guild data
  const handleGuilds = async() => {
  
    if(window.walletConnection.isSignedIn()){
      await window.contract.get_guild_info({slug:match.params.slug})
      .then(response => {
        console.log(response);
        setGuild(response);
      });
    }  
          
  }

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

  React.useEffect(() => {
  
    handleGuilds(); 
    
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      //let tables = document.querySelectorAll(".table-responsive");
      /*for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }*/
    }
    document.body.classList.toggle("profile-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        //ps.destroy();
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
                  <CardBody>
                  <img
                      alt={guildData.title}
                      className="img-center img-fluid rounded-circle"
                      src={`https://github.com/near/ecosystem/blob/main${guildData.logo}?raw=true`}
                    />  
                    <Button
                        className="btn-round"
                        color="primary"
                        onClick={handleJoinUs}
                    >
                    <i 
                        className="tim-icons icon-tap-02" 
                    />
                    { joined ? <>JOINED</> : <>&nbsp;JOIN US</> }
                    </Button>           
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" md="6">
                <h6 className="text-on-back">{guildData.title}</h6>
                <p className="profile-description">
                  {guildData.description}
                </p>
                <div className="btn-wrapper profile pt-3 text-right">
                  <Button
                    className="btn-icon btn-round"
                    color="twitter"
                    href={guildData.twitter}
                    id="tooltip639225725"
                    target="_blank"
                  >
                    <i className="fab fa-twitter" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip639225725">
                    Follow us
                  </UncontrolledTooltip>
                  <Button
                    className="btn-icon btn-round"
                    color="telegram"
                    href={guildData.telegram}
                    id="tooltip982846143"
                    target="_blank"
                  >
                    <i className="fab fa-telegram-plane" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip982846143">
                    Contact us
                  </UncontrolledTooltip>
                  <Button
                    className="btn-icon btn-round"
                    color="warning"
                    href={guildData.youtube}
                    id="tooltip982846143"
                    target="_blank"
                  >
                    <i className="fab fa-youtube" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip982846143">
                    Like us
                  </UncontrolledTooltip>
                  <Button
                    className="btn-icon btn-round"
                    color="primary"
                    href={guildData.discord}
                    id="tooltip951161185"
                    target="_blank"
                  >
                    <i className="fab fa-discord" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip951161185">
                    Talk to us
                  </UncontrolledTooltip>

                  
                  <Button
                    className="btn-icon btn-round"
                    color="dribbble"
                    href={guildData.website}
                    id="tooltip951161185"
                    target="_blank"
                  >
                    <i className="fab fa-dribbble" />
                  </Button>
                  <UncontrolledTooltip delay={0} target="tooltip951161185">
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
                    <h2>MEMBERS</h2>
                  </CardHeader>
                  <CardBody>
                    {
                      ['John', 'Marc', 'Louis'].map((member, index) =>{
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
