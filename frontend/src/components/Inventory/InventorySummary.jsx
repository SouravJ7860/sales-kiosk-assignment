function InventorySummary({ inventory }) {
  const totalUnits = inventory.length;

  const availableUnits = inventory.filter(
    (unit) => unit.status === "AVAILABLE"
  ).length;

  const bookedUnits = inventory.filter(
    (unit) => unit.status === "BOOKED"
  ).length;

  const towerSummary = inventory.reduce((acc, unit) => {
    if (!acc[unit.tower]) {
      acc[unit.tower] = {
        total: 0,
        available: 0,
      };
    }

    acc[unit.tower].total++;

    if (unit.status === "AVAILABLE") {
      acc[unit.tower].available++;
    }

    return acc;
  }, {});

  return (
    <>
      <div className="inventory-summary">
        <div className="summary-card">
          <h3>Total Units</h3>
          <p>{totalUnits}</p>
        </div>

        <div className="summary-card">
          <h3>Available</h3>
          <p className="available-count">{availableUnits}</p>
        </div>

        <div className="summary-card">
          <h3>Booked</h3>
          <p className="booked-count">{bookedUnits}</p>
        </div>
      </div>

      <div className="tower-summary">
        <h3>🏢 Tower Availability</h3>

        <div className="tower-summary-grid">
          {Object.entries(towerSummary).map(([tower, data]) => (
            <div className="tower-summary-card" key={tower}>
              <h4>Tower {tower}</h4>

              <p>
                <strong>{data.available}</strong> / {data.total} Available
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default InventorySummary;