import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { HiCode, HiOutlineLogin, HiCog } from 'react-icons/hi';
import { useState } from 'react';

function NavigationBar(){
    const { currentUser, logout } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const history = useHistory(); 

    async function handleLogout(e){
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await logout();
            history.push('/');
        }
        catch (e){
            setError(e.message);
            setLoading(false);
        }
    }

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