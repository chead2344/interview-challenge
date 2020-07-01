import React, { useState } from "react";
import "./App.css";
import FilterPanel from "./components/FilterPanel";
import MenuPreview from "./components/MenuPreview";
import SummaryBar from "./components/SummaryBar";
import useFetchItems from "./hooks/useFetchItems";
import { SelectedItemsProvider } from "./hooks/useSelectedItems";

export default function App() {
  const [selectedDietaryFilters, setSelectedDietaryFilters] = useState<
    string[]
  >([]);

  const { data, error } = useFetchItems();
  if (error) {
    return <p style={{ color: "red" }}>Failed to load data!</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  function handleDietaryFilterClicked(dietary: string) {
    setSelectedDietaryFilters((prev) => {
      if (prev.find((_) => _ === dietary)) {
        return prev.filter((_) => _ !== dietary);
      }

      return [...prev, dietary];
    });
  }

  return (
    <div className="wrapper">
      <SelectedItemsProvider>
        <SummaryBar
          items={data.items}
          onDietaryFilterClicked={handleDietaryFilterClicked}
          selectedDietaryFilters={selectedDietaryFilters}
        />
        <div className="container menu-builder">
          <div className="row">
            <div className="col-4">
              <FilterPanel initialItems={data.items} />
            </div>
            <div className="col-8">
              <h2>Menu preview</h2>
              <MenuPreview selectedDietaryFilters={selectedDietaryFilters} />
            </div>
          </div>
        </div>
      </SelectedItemsProvider>
    </div>
  );
}
