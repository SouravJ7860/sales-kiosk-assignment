import UnitCard from "./UnitCard";

function TowerCard({ tower, units, onUnitClick }) {

    return (

        <div className="tower-card">

            <h2>
                🏢 Tower {tower}
            </h2>

            <div className="unit-grid">

                {units.map((unit) => (

                    <UnitCard
                        key={unit._id}
                        unit={unit}
                        onClick={() => onUnitClick(unit)}
                    />

                ))}

            </div>

        </div>

    );

}

export default TowerCard;