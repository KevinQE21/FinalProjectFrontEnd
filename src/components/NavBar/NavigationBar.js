import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { HiCode, HiOutlineLogin } from 'react-icons/hi';

function NavigationBar(){
    const { currentUser } = useAuth();

    return (
        <Navbar bg="dark" variant="dark" expand="sm">
            <Container>          
                <Navbar.Brand as={ Link } to="/">Code News <HiCode /> </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    {
                    currentUser
                    ? 
                    <>                        
                        <Navbar.Brand as={ Link } to="/">Profile <HiOutlineLogin /> </Navbar.Brand>
                    </>
                    : <Nav.Link as={ Link } to="/signup">Sign Up</Nav.Link>
                    }
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>        
    );
}

export default NavigationBar;