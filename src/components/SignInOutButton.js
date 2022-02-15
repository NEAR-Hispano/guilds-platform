import { Button, NavItem, NavLink } from "reactstrap";
import { login, logout } from './../services/NearRCP';

export default function SignInOutButton () {
    return (
        !window.walletConnection.isSignedIn() ?
        (
            <NavItem className="p-0">
                <NavLink
                    data-placement="bottom"
                    rel="noopener noreferrer"
                    target="_blank"
                    title="NEAR Sign In"
                >
                    <Button
                    className="nav-link"
                    color="primary"
                    onClick={login}
                    >  
                        <span className="px-2">
                            <i className="fas fa-sign-in-alt" />
                            Sign In
                        </span>
                    </Button>
                </NavLink>
            </NavItem>
        ):
        (
            <>
                <NavItem className="p-0">
                    <NavLink
                        data-placement="bottom"
                        rel="noopener noreferrer"
                        target="_blank"
                        title="NEAR Log Out" 
                    >        
                        <span className="py-2">
                            <i className="tim-icons icon-single-02" />
                            { window.contract.account.accountId }  
                        </span>
                    </NavLink>
                </NavItem>
                <NavItem className="p-0">
                    <NavLink
                        data-placement="bottom"
                        rel="noopener noreferrer"
                        target="_blank"
                        title="NEAR Log Out"
                    >        
                        <Button
                        className="nav-link"
                        color="success"
                        onClick={logout}
                        >  
                            <span className="px-2">
                                <i className="fas fa-sign-out-alt" />
                                Log Out
                            </span>
                        </Button>
                    </NavLink>
                </NavItem>
            </>
        )
    )
}