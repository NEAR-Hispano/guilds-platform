import { Button, NavLink } from "reactstrap";
import { login, logout } from './../services/NearRCP';

export default function SignInOutButton () {
    return (
        !window.walletConnection.isSignedIn() ?
        (
            <NavLink
                data-placement="bottom"
                rel="noopener noreferrer"
                target="_blank"
                title="NEAR Sign In"
            >
                <Button
                className="btn-round"
                color="warning"
                onClick={login}
                >  
                    <i className="tim-icons icon-key-25" />
                    Sign In
                </Button>
            </NavLink>
        ):
            <NavLink
                data-placement="bottom"
                rel="noopener noreferrer"
                target="_blank"
                title="NEAR Log Out"
                
            >              
                <Button
                className="btn-round"
                color="success"
                onClick={logout}
                >  
                    <i className="tim-icons icon-single-02" />
                    { window.contract.account.accountId } &nbsp;
                    <i className="tim-icons icon-key-25" />
                   
                </Button>
            </NavLink>
    )
}