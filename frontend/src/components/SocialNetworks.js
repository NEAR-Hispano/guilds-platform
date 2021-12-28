import { 
    Button, 
    UncontrolledTooltip
} from "reactstrap";
  
export default function SocialNetworks({joined, guild}) {
    const JOINED = 'JOINED';
    return (
        <>
            { (joined ===JOINED && guild.twitter) && <>
                <Button
                    className="btn-icon btn-round"
                    color="twitter"
                    href={guild.twitter}
                    id="twitterTooltip"
                    target="_blank"
                >
                    <i className="fab fa-twitter" />
                </Button>
                <UncontrolledTooltip delay={0} target="twitterTooltip">
                    Follow us
                </UncontrolledTooltip></> }
            
            { (joined ===JOINED && guild.telegram)  && <>
                <Button
                    className="btn-icon btn-round"
                    color="telegram"
                    href={guild.telegram}
                    id="telegramTooltip"
                    target="_blank"
                >
                    <i className="fab fa-telegram-plane" />
                </Button>
                <UncontrolledTooltip delay={0} target="telegramTooltip">
                    Contact us
                </UncontrolledTooltip> </> }

            { (joined ===JOINED && guild.youtube) && <>
                <Button
                    className="btn-icon btn-round"
                    color="warning"
                    href={guild.youtube}
                    id="youtubeTooltip"
                    target="_blank"
                >
                    <i className="fab fa-youtube" />
                </Button>
                <UncontrolledTooltip delay={0} target="youtubeTooltip">
                    Like us
                </UncontrolledTooltip> </> }

            { (joined === JOINED && guild.discord) && <>
                <Button
                    className="btn-icon btn-round"
                    color="primary"
                    href={guild.discord}
                    id="discordTooltip"
                    target="_blank"
                >
                    <i className="fab fa-discord" />
                </Button>
                <UncontrolledTooltip delay={0} target="discordTooltip">
                    Talk to us
                </UncontrolledTooltip> </> }
        </>

    );
}