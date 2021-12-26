import { 
  Button, 
  UncontrolledTooltip
} from "reactstrap";
import ReactDOM from 'react-dom';

export default function SocialNetworks({guild}) {
  let isMember = false;
  let socialNets = "";
  let idSocialNets = `socialNetworks-${guild.slug}`;
  if(window.walletConnection.isSignedIn()){
    window.contract.check_if_member({slug: guild.slug})
    .then(response => {
      if(response){
        isMember = true
        socialNets = (
          <>
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
          </>
        );
        ReactDOM.render(socialNets, document.getElementById(idSocialNets));
        } else {
          console.log(`User: ${window.walletConnection.getAccountId()} not in ${guild.slug}`);
        }
    })
    .catch(error => {
      console.log("Error checking user for guild " + error);
    });
  }
  return (<span id={idSocialNets}></span>);
}

