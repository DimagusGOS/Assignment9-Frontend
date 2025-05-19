import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function SearchForm() {
    const[from, setFrom] = useState('');
    const[to, setTo] = useState('');
    const navigate = useNavigate();
    const [msg] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        if (from == '' && to == '') {
            alert("please select at least destination or departure");
        }else {
            navigate(`/results?from=${from}&to=${to}`);
        }
    };

    return (

        <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="from">
                <Form.Label column sm="2">
                    <b>From:</b>
                </Form.Label>
                <Col sm="10">
                    <Form.Control type='text' placeholder="Departure" value={from} onChange={(e) => setFrom(e.target.value)}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="to">
                <Form.Label column sm="2">
                    <b>To:</b>
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder="Destination" value={to} onChange={(e) => setTo(e.target.value)} />
                </Col>
            </Form.Group>

            <button type="submit">Search Flights</button>
        </Form>
        
    );
}