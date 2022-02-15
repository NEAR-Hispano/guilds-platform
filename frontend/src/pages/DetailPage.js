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
    Card,
    CardHeader,
    Container,
    Row,
    Col,
} from "reactstrap";

// core components
import IndexNavbar from "components/IndexNavbar.js";
import Footer from "components/Footer.js";
import JoinButton from '../components/JoinButton';
import { setJoinMsg } from "../utils";
import SocialCards from "components/SocialCards";
import { FloatingButton } from "components/FloatingButton";
import { getInfoSlug } from "services/GuildsEntities";

export default function DetailPage({match}) {
    const [guildData, setGuild] = React.useState({});
    const [guildsUser, setGuildsUser] = React.useState("Validating...");
    const [numSubs, setNumSubs] = React.useState('Loading...');


    //Getting state passed by link route
    const location = useLocation();
    

    const getGuildUser = async () => {
        /* If member was joining a guild is successfully, 
        * re-query all guilds by user to confirm that user has joined successfully
        */
       try {
            // await GuildsByUser(window.accountId)
            // .then((response) => {
            //     let processedData = [];
            //     response.data.members.map(data => {
            //         processedData.push({member: data.member})
            //     })
            //     setGuildsUser(processedData);
            // });
            await window.contract.get_guilds_by_user({user: window.contract.account.accountId})
            .then((response) => {
                setGuildsUser(response);
            });
       } catch (error) {
           console.log(error)
       }
        
    }
    useEffect(() => {
        document.body.classList.toggle("landing-page");
        // Specify how to clean up after this effect:
        return function cleanup() {
          document.body.classList.toggle("landing-page");
        };
    },[]);

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
        getInfoSlug(match.params.slug).then(response => {
            setGuild(response);
        });
    }, [match.params.slug]);

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
            <IndexNavbar />
            <FloatingButton/>
            <div className="wrapper">
                <div className="py-lg-5">
                    <img
                        alt="..."
                        className="shapes circle"
                        src={require("assets/img/cercuri.png").default}
                    />
                </div>
                <section className="section section-lg">
                    <img
                        alt="..."
                        className="path"
                        src={require("assets/img/path5.png").default}
                    />
                    <Container>
                        <Row className="row-grid justify-content-between align-items-center text-left">
                            <Col className="ml-auto mr-auto" lg="4" md="5">
                                <Card className="card-plain">
                                    <CardHeader>
                                        <img
                                            alt={guildData.title}
                                            className="img-center img-fluid rounded-circle"
                                            src={guildData.logo}
                                            style={{width:'100%', height: '100%'}}
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
                        </Row>
                        <Row  className="row-grid justify-content-between align-items-center text-center">
                            <Col className="ml-auto mr-auto" lg="10" md="5">
                                <h6 className="text-on-back">{guildData.title}</h6>
                                <br/>
                                <h4>
                                    {guildData.oneliner}
                                </h4>     
                                <div className="ml-3">
                                    <h4>
                                        <span  className="icon icon-success mb-4 mr-3">
                                            <i className="tim-icons icon-single-02" />
                                        </span> 
                                        {numSubs} members
                                    </h4>
                                </div>
                                <div className="float-center">      
                                    <JoinButton 
                                        guild={guildData} 
                                        guildsUser={location.state?.guildsUser || guildsUser} 
                                        setGuildsUser={setGuildsUser}
                                        setNumSubs={setNumSubs}
                                        btnSize={"lg"}/>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <section className="section">
                        <img
                            alt="..."
                            className="path"
                            src={require("assets/img/path4.png").default}
                        />
                        <SocialCards 
                            joined={setJoinMsg(guildsUser, guildData.slug)} 
                            guild={guildData}
                        />
                    </section>
                </section>
                <Footer />
            </div>
        </>
    );
}
