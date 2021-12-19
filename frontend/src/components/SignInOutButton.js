import { NavLink } from "reactstrap";
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
                onClick={login}
            >
                <i className="tim-icons icon-key-25" />
                <p className="d-lg-none d-xl-none">SignIn</p>
            </NavLink>
        ):
            <NavLink
                data-placement="bottom"
                rel="noopener noreferrer"
                target="_blank"
                title="NEAR Log Out"
                onClick={logout}
            >
                <i className="tim-icons icon-key-25" />
                <p className="d-lg-none d-xl-none">LogOut</p>
            </NavLink>
    )
}