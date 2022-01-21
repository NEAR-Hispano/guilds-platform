import React from "react";
import { Link } from "react-router-dom";
import {
    Col, 
    Card,
    CardBody,
    Row,
    UncontrolledTooltip
} from "reactstrap";

import JoinButton from './JoinButton';
import SocialNetworks from './SocialNetworks';
import { setJoinMsg } from "../utils";

export default function GuildCard({guild, guildsUser, setGuildsUser}) { 
    return (
        <Col className="mt-3" sm="4" key={`col-${guild.slug}`}>
            <Card >     
                <CardBody style={{height:'28.5em'}}>
                    <Row  style={{height:'21.5em'}}>
                        <Col>  
                            <div style={{height:'128px'}}>
                                {/*  Passing props through Link’s state */}
                                <Link to={{pathname: `detail/${guild.slug}`, state:{guild, guildsUser}}}>
                                    <img
                                        alt={guild.title}
                                        className="img-fluid rounded-circle shadow-lg"
                                        width="128"
                                        height="128"
                                        src={guild.logo}
                                        id="detailTooltip"
                                        onError={ 
                                            (e)=>{
                                                e.target.onerror = null;
                                                e.target.src=require("assets/img/logo-nf.png").default
                                            }
                                        }
                                    />  
                                    <UncontrolledTooltip delay={0} target="detailTooltip">
                                        More details
                                    </UncontrolledTooltip>
                                </Link>
                            </div>
                            <h5>
                                {guild.title} <br/>
                                <small className="text-muted">
                                    {guild.oneliner}
                                </small>
                            </h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="align-items-left">
                            <SocialNetworks joined={setJoinMsg(guildsUser, guild.slug)} guild={guild}/> 
                        </Col>
                        <JoinButton guild={guild} guildsUser={guildsUser || []} setGuildsUser={setGuildsUser} setNumSubs={null} btnSize={"sm"}/>
                    </Row>
                </CardBody>
            </Card>     
        </Col>
    );
}
