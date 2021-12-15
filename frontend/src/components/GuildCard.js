import React from "react";
import { Link } from "react-router-dom";
import { 
  Button, 
  Col, 
  Card,
  CardBody,
  UncontrolledAlert,
  UncontrolledTooltip

} from "reactstrap";

export default function GuildCard({guild}) {
    const [numSubs, setNumSubs] = React.useState(0);
    const [ joined, setJoined ] = React.useState(undefined);
    const [show, setShow] = React.useState(false);

    //Query to get guild subscribers amount
    const handleSubs = async() => {
        if(window.walletConnection.isSignedIn()){
            await window.contract.get_num_members({slug:guild.slug || ''})
            .then(response => {
                setNumSubs(response);
            }).catch(error => {
                console.log(error);
            });
        }        
    }

    React.useEffect(() => {
       //handleSubs();
    }, []);

    const handleJoinUs = async () => {
        setShow(!window.walletConnection.isSignedIn());
        if(window.walletConnection.isSignedIn()){
            await window.contract.join_guild({slug:guild.slug || ''})
            .then(response => {
                setJoined(response);
            }).catch(error => {
                setJoined(undefined);
            });   
        } 
          
    }
    
    return (
        <Col sm="3" key={`col-${guild.slug}`}>
            
            <Card className="card-plain">     
                <CardBody>
                
                <div className="btn-wrapper profile pt-3">
                <Link to={`profile-page/${guild.slug}`}>
                    <img
                        alt={guild.title}
                        className="img-center img-fluid"
                        src={`https://github.com/near/ecosystem/blob/main${guild.logo}?raw=true`}
                    />  
                </Link> 
                    <h4 className="title">{guild.title}</h4>
                    <p>{`${numSubs} subscribers`}</p>
                    <Button
                        className="btn-icon btn-round"
                        color="twitter"
                        href={guild.twitter}
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
                        color="warning"
                        href={guild.youtube}
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
                <UncontrolledAlert  color="primary" isOpen={show} onClose={() => setShow(false)} dismissible>Please Login with your Near Account!</UncontrolledAlert >
                </CardBody>
            </Card>
                             
        </Col>
    );
}
