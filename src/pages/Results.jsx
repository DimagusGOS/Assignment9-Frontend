import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FlightList from '../components/FlightList';
import NoResults from './NoResults';
import Spinner from 'react-bootstrap/Spinner';

export default function Results() {
    const [searchParams] = useSearchParams();
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const [flights, setFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        fetch(`http://localhost:4000/flights?from=${from}&to=${to}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                // if (to == '') {
                //     var results = data.data.filter(
                //         (flight) =>
                //             flight.from.toLowerCase() === from.toLowerCase()
                //     );
                // } else if (from == '') {
                //     var results = data.data.filter(
                //         (flight) =>
                //             flight.to.toLowerCase() === to.toLowerCase()
                //     );
                // } else {
                //     var results = data.data.filter(
                //         (flight) =>
                //             flight.from.toLowerCase() === from.toLowerCase() &&
                //             flight.to.toLowerCase() === to.toLowerCase()
                //     );
                // }

                setFlights(data);
                setTimeout(() => setIsLoading(false), 1000);

            });
    }, [from, to]);
    if (isLoading) return (
        <div>
            <Spinner animation="border" color='white'>
                <span className="visually-hidden">Loading Flights...</span>
            </Spinner>
        </div>
    )
    if (flights.length === 0) {
        return <NoResults from={from} to={to} />;
    } else {
        return (
            <div>
                <h2>Flights from {from.toUpperCase()} to {to.toUpperCase()}</h2>
                <FlightList flights={flights} />
                <a href="/"><button>Search for Other Flights</button></a>
            </div>
        );
    }
   
}