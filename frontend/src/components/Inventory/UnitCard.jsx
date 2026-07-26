function UnitCard({ unit, onClick }) {

    return (

        <div
            className={`unit-card ${unit.status.toLowerCase()}`}
            onClick={onClick}
        >

            <h3>{unit.unitNumber}</h3>

            <p>{unit.status}</p>

        </div>

    );

}

export default UnitCard;