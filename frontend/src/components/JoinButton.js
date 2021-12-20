import React from "react";
import { 
    Button, 
    UncontrolledAlert
  } from "reactstrap";
import { MAIN_GUILDS } from "variables/Constants";

  export default function JoinButton({guild}) {
    const [show, setShow] = React.useState(false);

    const [loading, setLoading] = React.useState(false);
    const [joinMsg, setJoinMsg] = React.useState("JOIN US")

    const [alreadyAlert, setAlreadyAlert] = React.useState(false);
    const [joinAlert, setJoinAlert] = React.useState(false);
    const [errorAlert, setErrorAlert] = React.useState(false);

    const handleJoinUs = async () => {
        setShow(!window.walletConnection.isSignedIn());

        if(window.walletConnection.isSignedIn()){
            //We set the button to loading
            setJoinMsg("Loading...")
            setLoading(true)

            //First, we check if we are already a member of the guild
            window.contract.check_if_member({slug:guild.slug})
            .then(response => {
                //If we are, we show this to the user
                if(response){
                    setAlreadyAlert(true)
                    setJoinMsg("JOINED")
                    setLoading(false);
                }
                //Else, we try to join the guild
                else{
                    window.contract.join_guild({slug:guild.slug || ''})
                    .then(() => {
                        setJoinAlert(true)
                        setJoinMsg("JOINED")
                        setLoading(false);
                    })
                }
            })
            .catch(() => {
                setErrorAlert(true)
                setJoinMsg("JOIN US")
                setLoading(false)
            })
        } 
    }

    return(
        <>
        {
            MAIN_GUILDS.includes(guild.slug) ? 
            <Button
                className="btn-round"
                color="primary"
                onClick={handleJoinUs}
                disabled={loading}
            > 
                <i 
                    className={loading ? "tim-icons icon-refresh-02" : "tim-icons icon-tap-02"} 
                />
                {joinMsg}
            </Button> :
            <Button
                className="btn-round"
                color="default"
                disabled={true}
            > 
                <i className="tim-icons icon-spaceship" /> JOIN SOON
            </Button>
        }

        
        <UncontrolledAlert  color="primary" isOpen={show} toggle={() => setShow(false)}>Please Login with your Near Account!</UncontrolledAlert >
        <UncontrolledAlert  color="default" isOpen={alreadyAlert} toggle={() => setAlreadyAlert(false)}>You are already a member of <strong>{guild.title}</strong></UncontrolledAlert >
        <UncontrolledAlert  color="success" isOpen={joinAlert} toggle={() => setJoinAlert(false)}>You've successfully joined <strong>{guild.title}!</strong></UncontrolledAlert >
        <UncontrolledAlert  color="warning" isOpen={errorAlert} toggle={() => setErrorAlert(false)}>There was an error while processing your request.</UncontrolledAlert >
        </>
    );
  }