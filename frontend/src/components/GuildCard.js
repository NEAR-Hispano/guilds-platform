import React from "react";
import { Link } from "react-router-dom";
import { 
  Button, 
  Col, 
  Card,
  CardBody,
  UncontrolledTooltip

} from "reactstrap";

import JoinButton from './JoinButton';
import SocialNetworks from './SocialNetworks';

export default function GuildCard({guild}) {
    return (
        <Col sm="3" key={`col-${guild.slug}`}>
            
            <Card className="card-plain">     
                <CardBody>
                
                <div className="btn-wrapper profile pt-3">
                {/*  Passing props through Link’s state */}
                <Link to={{pathname: `profile-page/${guild.slug}`, state:{guild}}}>
                    <img
                        alt={guild.title}
                        className="img-center img-fluid"
                        width="128"
                        height="128"
                        src={guild.logo}
                        onError={ 
                            (e)=>{
                                e.target.onerror = null;
                                e.target.src=require("assets/img/logo-nf.png").default
                            }
                        }
                    />  
                </Link>
                <h4 className="title">{guild.title}</h4>
                <SocialNetworks guild={guild}/>
                <Button
                    className="btn-icon btn-round"
                    color="dribbble"
                    href={guild.website}
                    id="tooltip951161185"
                    target="_blank"
                >
                    <i className="fab fa-dribbble" />
                </Button>
                    <UncontrolledTooltip delay={0} target="tooltip951161185">
                        Follow us
                    </UncontrolledTooltip>
                </div>
                <br/>
                <JoinButton guild={guild}/>
                </CardBody>
            </Card>
                             
        </Col>
    );
}
