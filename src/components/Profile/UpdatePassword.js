import { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { useAuth } from '../../context/authContext';
import { Link } from 'react-router-dom';
import NavigationBar from '../NavBar/NavigationBar';
import { HiDatabase } from 'react-icons/hi'; 

function UpdatePassword() {
    const newPasswordRef = useRef();
    const confirmNewPasswordRef = useRef();
    const { currentUser, updateEmail, updatePassword } = useAuth();
    const [ error, setError ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ loading, setLoading ] = useState('');

    async function handleSubmit(e){
        e.preventDefault();

        if (newPasswordRef.current.value !== confirmNewPasswordRef.current.value) {
            return setError(`Passwords don't match!`);
        }

        const promises = [];
        setError('')
        setLoading(true)

        if(newPasswordRef.current.value !== '') {
        promises.push(updatePassword(newPasswordRef.current.value));
        }

        Promise.all(promises)
        .then(() => setMessage('Credenciales actualizadas!'))
        .catch(e => setError('Error al actualizar perfil: ' + e))
        .finally(() => setLoading(false));



    }

    return (
        <>
            <NavigationBar />
            <Card className="w-75 mx-auto mt-5" style={{ marginBottom: '10em' }}>
                <Card.Body>
                <h1 className="display-4 text-center my-3">Update Password</h1>
                { error && error !== '' && <Alert variant="danger">{ error }</Alert> }
                { message && message !== '' && <Alert variant="success">{ message }</Alert> }
                <Form onSubmit={ handleSubmit }>  
                    <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>New password</Form.Label>
                    <Form.Control 
                        ref={ newPasswordRef } 
                        type="password" 
                        placeholder="Password" 
                        autoComplete="off" 
                        required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>Confirm new password</Form.Label>
                    <Form.Control 
                        ref={ confirmNewPasswordRef } 
                        type="password" 
                        placeholder="Confirm password" 
                        autoComplete="off" 
                        required />
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

    export default UpdatePassword;