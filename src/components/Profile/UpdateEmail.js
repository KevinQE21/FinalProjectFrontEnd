import { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { useAuth } from '../../context/authContext';
import { Link } from 'react-router-dom';
import NavigationBar from "../NavBar/NavigationBar";
import { HiDatabase } from 'react-icons/hi'; 

function UpdateEmail(){
    const newEmailRef = useRef();   
    const { currentUser, updateEmail } = useAuth();
    const [ error, setError ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ loading, setLoading ] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        
        if (newEmailRef.current.value === currentUser.email){
            return setError('Is the same email')
        }

        const promises = [];
        setError('')
        setLoading(true)

        if(newEmailRef.current.value !== '' && newEmailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(newEmailRef.current.value));
        }

        Promise.all(promises)
            .then(() => setMessage('Success!'))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }

    return (
        <>
            <NavigationBar />
            <Card className="w-75 mx-auto mt-5" style={{ marginBottom: '10em' }}>
                <Card.Body>
                <h1 className="display-4 text-center my-3">Update Email</h1>
                { error && error !== '' && <Alert variant="danger">{ error }</Alert> }
                { message && message !== '' && <Alert variant="success">{ message }</Alert> }
                <Form onSubmit={ handleSubmit }>
                    <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>New email address</Form.Label>
                    <Form.Control 
                        ref={ newEmailRef } 
                        type="email" 
                        placeholder="Email" 
                        autoComplete="off" 
                        required/>
                    </Form.Group>

                    <Button className="w-100" variant="dark" type="submit" disabled={ loading }>
                        Save <HiDatabase />
                    </Button>
                </Form>
                <Card.Text className="text-muted text-center my-3">
                    <Link to="/profile">Back</Link>
                </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}

export default UpdateEmail;