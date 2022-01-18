import React, { useEffect } from "react";
import { 
    Button, 
    UncontrolledAlert
  } from "reactstrap";
import { MAIN_GUILDS } from "variables/Constants";
import { setJoinMsg } from "../utils";
import { login } from '../services/NearRCP';


export default function JoinButton({guild, guildsUser, setGuildsUser}) {  
    const [show, setShow] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [alreadyAlert, setAlreadyAlert] = React.useState(false);
    const [joinAlert, setJoinAlert] = React.useState(false);
    const [errorAlert, setErrorAlert] = React.useState(false);
    const [msgJoin, setMsgJoin] = React.useState(undefined);


    
    
    const handleJoinUs = async () => {
        setShow(!window.walletConnection.isSignedIn());

        if(window.walletConnection.isSignedIn()){
            setLoading(true);
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
                        setMsgJoin(setJoinMsg(response, guild.slug));
                    });
                })
            }
        } 
    }

    useEffect(() => {
        const message = setJoinMsg(guildsUser, guild.slug);
        setMsgJoin(message);
    }, [ guildsUser, guild.slug ]);

    return(
        <>
        {
            MAIN_GUILDS.includes(guild.slug) ? 
            <Button
                className="btn-round"
                color={(msgJoin ==="JOINED") ? "warning" : "primary"}
                onClick={handleJoinUs}
                disabled={loading}
            > 
                <i 
                    className={loading ? "tim-icons icon-refresh-02": "tim-icons icon-tap-02" } 
                /> &nbsp;
                { msgJoin}
            </Button> :
            <Button
                className="btn-round"
                color="default"
                disabled={true}
            > 
                <i className="tim-icons icon-spaceship" /> JOIN SOON
            </Button>
        }

        
        <UncontrolledAlert  
            color="primary" 
            isOpen={show} 
            toggle={
                () => { 
                    setShow(false);
                    login();
                }
            }
        > Please Login with your Near Account! </UncontrolledAlert >
        <UncontrolledAlert  color="default" isOpen={alreadyAlert} toggle={() => setAlreadyAlert(false)}>You are already a member of <strong>{guild.title}</strong></UncontrolledAlert >
        <UncontrolledAlert  color="success" isOpen={joinAlert} toggle={() => setJoinAlert(false)}>You've successfully joined <strong>{guild.title}!</strong></UncontrolledAlert >
        <UncontrolledAlert  color="warning" isOpen={errorAlert} toggle={() => setErrorAlert(false)}>There was an error while processing your request.</UncontrolledAlert >
        </>
    );
  }