import React from "react";
import "./App.css";
import FilterPanel from "./components/FilterPanel";
import MenuPreview from "./components/MenuPreview";
import SummaryBar from "./components/SummaryBar";
import useFetchItems from "./hooks/useFetchItems";
import { SelectedItemsProvider } from "./hooks/useSelectedItems";

export default function App() {
  const { data, error } = useFetchItems();
  if (error) {
    return <p style={{ color: "red" }}>Failed to load data!</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <div className="wrapper">
      <SelectedItemsProvider>
        <SummaryBar />
        <div className="container menu-builder">
          <div className="row">
            <div className="col-4">
              <FilterPanel initialItems={data.items} />
            </div>
            <div className="col-8">
              <h2>Menu preview</h2>
              <MenuPreview />
            </div>
          </div>
        </div>
      </SelectedItemsProvider>
    </div>
  );
}
