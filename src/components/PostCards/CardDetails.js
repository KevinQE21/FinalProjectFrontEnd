import { Card } from 'react-bootstrap';

function CardDetails(props){
    const {first_name, last_name, email, twitter, phone_number} = props;
    
    return (
        <Card className="w-75 mx-auto mt-5">
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center">Information</Card.Title>
                <Card.Text>Complete Name: {first_name} {last_name}</Card.Text>
                <Card.Text>Phone number: {phone_number}</Card.Text>
                <Card.Text>Social Media: {twitter}</Card.Text>
                <Card.Text>Email: {email}</Card.Text>                
            </Card.Body>
            <Card.Footer className="text-muted small">This information is provided to the corresponding user, be careful what you do with it!</Card.Footer>
        </Card>
    );
}

export default CardDetails;