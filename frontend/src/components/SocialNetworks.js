import { 
    Button, 
    UncontrolledTooltip
} from "reactstrap";
  
export default function SocialNetworks({joined, guild}) {
    const JOINED = 'JOINED';
    if (joined === JOINED ) {
        return (
            <>
                { (guild.twitter) && <>
                    <Button
                        className="btn-icon btn-round"
                        color="twitter"
                        href={guild.twitter}
                        id="twitterTooltip"
                        target="_blank"
                        size="sm"
                    >
                        <i className="fab fa-twitter" />
                    </Button>
                    <UncontrolledTooltip delay={0} target="twitterTooltip">
                        Follow us
                    </UncontrolledTooltip></> 
                }
                
                { (guild.telegram)  && <>
                    <Button
                        className="btn-icon btn-round"
                        color="telegram"
                        href={guild.telegram}
                        id="telegramTooltip"
                        target="_blank"
                        size="sm"
                    >
                        <i className="fab fa-telegram-plane" />
                    </Button>
                    <UncontrolledTooltip delay={0} target="telegramTooltip">
                        Contact us
                    </UncontrolledTooltip> </> 
                }
    
                { (guild.youtube) && <>
                    <Button
                        className="btn-icon btn-round"
                        color="warning"
                        href={guild.youtube}
                        id="youtubeTooltip"
                        target="_blank"
                        size="sm"
                    >
                        <i className="fab fa-youtube" />
                    </Button>
                    <UncontrolledTooltip delay={0} target="youtubeTooltip">
                        Like us
                    </UncontrolledTooltip> </> 
                }
    
                { (guild.discord) && <>
                    <Button
                        className="btn-icon btn-round"
                        color="primary"
                        href={guild.discord}
                        id="discordTooltip"
                        target="_blank"
                        size="sm"
                    >
                        <i className="fab fa-discord" />
                    </Button>
                    <UncontrolledTooltip delay={0} target="discordTooltip">
                        Talk to us
                    </UncontrolledTooltip> </> 
                }

                { guild.website && <>
                        <Button
                            className="btn-icon btn-round"
                            href={guild.website}
                            id="websiteTooltip"
                            target="_blank"
                            size="sm"
                        >
                            <i className="fab fa-dribbble"  href={guild.website}/>
                        </Button>
                        <UncontrolledTooltip delay={0} target="websiteTooltip">
                            Visit us
                        </UncontrolledTooltip>
                    </>
                }
            </>
    
        );
    } else {
        return <>
            { guild.website && <>
                    <Button
                        className="btn-icon btn-round"
                        href={guild.website}
                        id="websiteTooltip"
                        target="_blank"
                        size="sm"
                    >
                        <i className="fab fa-dribbble"  href={guild.website}/>
                    </Button>
                    <UncontrolledTooltip delay={0} target="websiteTooltip">
                        Visit us
                    </UncontrolledTooltip>
                </>
            }
        </>;
    }
    
}