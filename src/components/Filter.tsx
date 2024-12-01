import React, { ChangeEvent, FC, useState, useEffect } from "react";

import { VehicleFilter, vehicleTypeTitles } from "../data/vehicles/contracts";

import { VehicleApi } from "../data/vehicles/api";

interface FilterProps {
  filter: VehicleFilter;
  setVehicles: Function;
}

export const Filter: FC<FilterProps> = ({ filter, setVehicles }) => {
  const [vehicleType, setVehicleType] = useState(filter.type ?? -1);
  const [vehicleName, setVehicleName] = useState(filter.title);

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setVehicleType(Number(event.target.value));
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setVehicleName(event.target.value);
  };

  useEffect(() => {
    const data = VehicleApi.search({
        title: vehicleName,
        type: vehicleType == -1 ? null : vehicleType
    });

    setVehicles(data);
  }, [vehicleName, vehicleType]);

  return (
    <div>
      <input value={vehicleName} onChange={handleInput} />
      <select value={vehicleType} onChange={handleSelect}>
        <option value={-1}>Все</option>
        {Object.entries(vehicleTypeTitles).map((vehicleTypeTitle) => (
          <option key={vehicleTypeTitle[0]} value={vehicleTypeTitle[0]}>
            {vehicleTypeTitle[1]}
          </option>
        ))}
      </select>
    </div>
  );
};
