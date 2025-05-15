export default function NoResults({ from, to }) {
    return (
        <div>
            <h2>No Results</h2>
            <p>Sorry, we couldn't find any flights from {from.toUpperCase()} to {to.toUpperCase()}.</p>
        </div>
    );
}