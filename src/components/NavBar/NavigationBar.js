import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { HiOutlineFingerPrint, HiOutlineLogin, HiCog } from 'react-icons/hi';

function NavigationBar(){
    const { currentUser, logout } = useAuth();
    const history = useHistory(); 

    async function handleLogout(e){
        e.preventDefault();

        try {
            await logout();
            history.push('/');
        }
        catch (e){
            console.log(e);
        }
    }

    return (
        <Navbar bg="dark" variant="dark" expand="sm">
            <Container>          
                <Navbar.Brand as={ Link } to="/">Spy-On-Web <HiOutlineFingerPrint /> </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {
                        currentUser
                        ? 
                        <>
                            <Nav.Link as={ Link } to="/profile">
                                Profile <HiCog/>               
                            </Nav.Link>
                            <Nav.Link as={ Link } to="/login" onClick={handleLogout}>
                                Logout <HiOutlineLogin/>               
                            </Nav.Link>
                        </>
                        :
                        <Nav.Link as={ Link } to="/signup">Sign Up</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>        
    );
}

export default NavigationBar;