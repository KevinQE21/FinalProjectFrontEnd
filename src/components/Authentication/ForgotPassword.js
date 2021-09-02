import { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { useAuth } from '../../context/authContext';
import { useHistory } from 'react-router-dom';
import NavigationBar from '../NavBar/NavigationBar';

function ForgotPassword(){
    const emailRef = useRef();
    const { resetPassword } = useAuth();
    const [ error, setError ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ loading, setLoading ] = useState('');
    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('Check your email to change your password');
            setLoading(true);   
            history.push('/login');
        }
        catch (e) {
            setError(e.message);
            setLoading(false);
        }        
    }

    return (        
        <>
            <NavigationBar />
            <Card className="w-75 mx-auto mt-5">
                <Card.Body>
                <h1 className="display-4 text-center my-3">Password Reset</h1>
                { error && error !== '' && <Alert variant="danger">{ error }</Alert> }
                { message && message !== '' && <Alert variant="success">{ message }</Alert> }
                    <Form onSubmit={ handleSubmit }>
                        <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                                    ref={ emailRef } 
                                    type="email" 
                                    placeholder="Enter email" 
                                    autoComplete="off" 
                                    required />
                        </Form.Group>

                        <Button 
                                className="w-100" 
                                variant="dark" 
                                type="submit" 
                                disabled={ loading }>
                            Reset password
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>            
    );
}

export default ForgotPassword;