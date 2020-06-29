import React, { useEffect, useState } from "react";
import { MenuItemData } from "../types";
import FilterItem from "./FilterItem";

type IProps = {
  initialItems: MenuItemData[];
  selectedItems: MenuItemData[];
  onItemClicked: (item: MenuItemData) => void;
};

const FilterPanel: React.FC<IProps> = ({
  initialItems,
  onItemClicked,
  selectedItems,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(initialItems);

  useEffect(() => {
    const filtered = initialItems.filter((x) =>
      x.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setResults(filtered);
  }, [searchTerm, initialItems]);

  return (
    <>
      <div className="filters">
        <input
          aria-label="Name"
          className="form-control"
          placeholder="Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className="item-picker">
        {results.map((item) => (
          <FilterItem
            key={item.id}
            dietaries={item.dietaries}
            name={item.name}
            onClick={() => onItemClicked(item)}
            selected={Boolean(selectedItems.find((_) => _.id === item.id))}
          />
        ))}
      </ul>
    </>
  );
};

export default FilterPanel;
