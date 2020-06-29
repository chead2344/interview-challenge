import "./App.css";
import React from "react";
import FilterPanel from "./components/FilterPanel";
import MenuPreview from "./components/MenuPreview";
import SummaryBar from "./components/SummaryBar";
import useFetchItems from "./hooks/useFetchItems";
import useSelectedItems from "./hooks/useSelectedItems";

export default function App() {
  const { onAdd, onRemove, selectedItems } = useSelectedItems();
  const { data, error } = useFetchItems();
  if (error) {
    return <p style={{ color: "red" }}>Failed to load data!</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="wrapper">
      <SummaryBar items={selectedItems} />
      <div className="container menu-builder">
        <div className="row">
          <div className="col-4">
            <FilterPanel
              initialItems={data.items}
              onItemClicked={onAdd}
              selectedItems={selectedItems}
            />
          </div>
          <div className="col-8">
            <h2>Menu preview</h2>
            <MenuPreview items={selectedItems} onItemRemoved={onRemove} />
          </div>
        </div>
      </div>
    </div>
  );
}
