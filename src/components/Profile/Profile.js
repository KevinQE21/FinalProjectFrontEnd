import { Button, Card, NavLink } from 'react-bootstrap';
import { useAuth } from '../../context/authContext';
import { Link } from 'react-router-dom';
import NavigationBar from '../NavBar/NavigationBar';
import { HiPencil } from  'react-icons/hi';

function Profile() {
    const { currentUser } = useAuth();

    return (
        <>
            <NavigationBar />
            <div className="w-75 mx-auto mt-5">
                <h1 className="display-4 text-center my-3">Hi Coder!</h1>
                <Card className="m-2">
                    <Card.Body>
                        <h2 className="display-5 text-center my-3">Profile Information</h2>
                        <Card.Text className="lead text-center my-3">                                
                                <NavLink as={ Link } to="/update-email">
                                    Email: { currentUser.email }
                                    <HiPencil />
                                </NavLink>                                                
                        </Card.Text>
                        <Card.Text className="lead text-center my-3">
                                <NavLink as={ Link } to="/update-password">
                                    Password: *********
                                    <HiPencil />
                                </NavLink> 
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default Profile;