import { Card, Form, Button, Alert} from 'react-bootstrap';
import { useRef, useState } from 'react';
import { useAuth } from '../../context/authContext';

function Signup(){
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState('');
    const { signup } = useAuth(); 

    async function handleSubmit(e){
        e.preventDefault();

        if ( passwordRef.current.value !== confirmPasswordRef.current.value )
            return setError(`Password don't match`);

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);  
        } catch (e) {
            setError(`Error: ${e.message}`);
            setLoading(false);
        }
    }

    return (
        <Card className="w-75 mx-auto mt-5">
            <Card.Body>
                <h1>Sign Up</h1>
                { error && <Alert variant="danger">{ error }</Alert> }
                <Form onSubmit={ handleSubmit }>                    
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email"
                                        placeholder="Enter Email"
                                        ref={ emailRef }
                                        autoComplete="off"
                                        required>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                                        placeholder="Password"
                                        ref={ passwordRef }
                                        required>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="Password"
                                        placeholder="Confirm Password" 
                                        ref={ confirmPasswordRef }
                                        required>
                        </Form.Control>
                    </Form.Group>

                    <Button className="w-100" 
                            variant="primary"
                            type="submit"
                            disabled={ loading }>
                        Sign Up
                    </Button>
                </Form>
                <Card.Text className="text-muted text-center my-3"> 
                    Got an account? Log In
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Signup;