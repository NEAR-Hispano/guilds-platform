import React, { useEffect } from "react";
import { 
    Button,
    Col,
    UncontrolledAlert, 
  } from "reactstrap";
import { MAIN_GUILDS } from "variables/Constants";
import { login } from '../services/NearRCP';


export default function JoinButton({guild, guildsUser, setGuildsUser, setNumSubs, btnSize}) {  
    const [show, setShow] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [alreadyAlert, setAlreadyAlert] = React.useState(false);
    const [joinAlert, setJoinAlert] = React.useState(false);
    const [errorAlert, setErrorAlert] = React.useState(false);
    const [msgJoin, setMsgJoin] = React.useState("Validating...");


    
    
    const handleJoinUs = async () => {
        setShow(!window.walletConnection.isSignedIn());

        if(window.walletConnection.isSignedIn()){
            setLoading(true);
            setMsgJoin("Loading...")
            //If we are, we show this to the user
            if(guildsUser.includes(guild.slug)){
                setAlreadyAlert(true);
                setLoading(false);
            }
            //Else, we try to join the guild
            else{
                // Calling join_guild method to record a member on the guild's members
                await window.contract.join_guild({slug:guild.slug || ''})
                .then(() => {
                    /* If member was joining a guild is successfully, 
                    * re-query all guilds by user to confirm that user has joined successfully
                    */
                    window.contract.get_guilds_by_user()
                    .then((response) => {
                        setJoinAlert(true);
                        setGuildsUser(response);
                        setLoading(false);
                        response.includes(guild.slug) ? setMsgJoin("JOINED") : setMsgJoin("JOIN US")

                        //To recalculate the number of subs
                        //ONLY if the set function was sent
                        if(setNumSubs !== null){
                            window.contract.get_num_members({slug:guild.slug})
                            .then(response => {
                                setNumSubs(response)
                            })
                        }
                    });
                })
            }
        } else {
            login();
        }
    }

    useEffect(() => {
        if(window.walletConnection.isSignedIn()){
            if(typeof guildsUser == 'object'){
            
                if(guildsUser.includes(guild.slug)){
                    setMsgJoin("JOINED")
                }
                else{
                    setMsgJoin("JOIN US")
                }
                setLoading(false)
            }
        }
        else{
            setLoading(false)
            setMsgJoin("JOIN US")
        }
    }, [ guildsUser, guild.slug ]);

    return(
        <>
            <Col className="align-items-right">
                {
                    MAIN_GUILDS.includes(guild.slug) ? 
                    <Button
                        className="btn-round"
                        color={(msgJoin ==="JOINED") ? "success" : "warning"}
                        onClick={handleJoinUs}
                        size={btnSize}
                        disabled={(msgJoin ==="JOINED")}
                    > 
                        <i 
                            className={loading ? "tim-icons icon-refresh-02": 
                            ((msgJoin === "JOINED") ? "tim-icons icon-check-2" : "tim-icons icon-tap-02") } 
                        /> &nbsp;
                        { msgJoin}
                    </Button> :
                    <Button
                        className="btn-simple"
                        color={(msgJoin ==="JOINED") ? "success" : "warning"}
                        size={btnSize}
                        disabled={true}
                    > 
                        <i className="tim-icons icon-spaceship" /> JOIN SOON
                    </Button>
                    
                }
            </Col>
            <Col className="d-flex align-items-left" sm="8">
                <UncontrolledAlert  
                    color="primary" 
                    isOpen={show} 
                    toggle={
                        () => { 
                            setShow(false);
                        }
                    }
                > Please Login with your Near Account! </UncontrolledAlert>
                <UncontrolledAlert  color="default" placement="top" isOpen={alreadyAlert} toggle={() => setAlreadyAlert(false)}>You are already a member of <strong>{guild.title}</strong></UncontrolledAlert>
                <UncontrolledAlert  color="success" placement="top" isOpen={joinAlert} toggle={() => setJoinAlert(false)}>You've successfully joined <strong>{guild.title}!</strong></UncontrolledAlert>
                <UncontrolledAlert  color="warning" placement="top" isOpen={errorAlert} toggle={() => setErrorAlert(false)}>There was an error while processing your request.</UncontrolledAlert>
            </Col>
        </>
    );
  }