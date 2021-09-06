import axios from "axios";
import { Alert, Button, Form} from 'react-bootstrap';
import { useState, useRef } from 'react';
import CardDetails from "./CardDetails";
import { HiSearch } from 'react-icons/hi';
import { useAuth } from "../../context/authContext";
import { useHistory } from "react-router-dom";

function Cards() {
    const { currentUser } = useAuth();
    const history = useHistory(); 
    const personalInfo = [];
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState('');
    const nameRef = useRef();
    const lastNameRef = useRef();
    const apiKey = process.env.REACT_APP_APP_API_KEY;        

    const getData = async () => {
        try {
            personalInfo.pop();
            const url = `https://api.hunter.io/v2/email-finder?domain=reddit.com&first_name=${nameRef.current.value}&last_name=${lastNameRef.current.value}&api_key=${apiKey}`;
            const result = await axios.get(url);
            console.log(result);
            personalInfo.push(result.data.data);
            console.log(personalInfo);
            setLoading(false);
        }
        catch{
            setError('Please, try again');
            setLoading(false);
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        try{
            if (!currentUser){
                return history.push('/login');
            }
            setError('');
            setLoading(true);            
            getData();
        }
        catch{
            setError('Please, try again');
            setLoading(false);
        }
    }
    
    return (
        <div style={{ marginBottom: '10em' }}>
            <h3 className="display-4 text-center my-5">Search Personal Information </h3>
            <div className="w-75 mx-auto mt-5">
                { error && <Alert variant="danger">{ error }</Alert> }
                <Form onSubmit={ handleSubmit }>
                            <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                        ref={ nameRef } 
                                        type="text"
                                        placeholder="Enter name" 
                                        autoComplete="off" 
                                        required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formLastname">
                            <Form.Label>Lastname</Form.Label>
                            <Form.Control 
                                        ref={ lastNameRef } 
                                        type="text"
                                        placeholder="Enter lastname" 
                                        autoComplete="off" 
                                        required />
                            </Form.Group>
                            
                            <Button 
                                className="w-100" 
                                variant="dark" 
                                type="submit" 
                                disabled={ loading }>
                            Search.... <HiSearch />
                        </Button>
                </Form>
            </div>
            <div>
            {
                personalInfo.map(info => (
                    <CardDetails 
                        key={info.score}
                        last_name={info.last_name} 
                        first_name={info.first_name} 
                        email={info.email}
                        twitter={info.twitter}
                        phone_number={info.phone_number} />
                ))
            }
            </div>
        </div>
    );
}

export default Cards; 