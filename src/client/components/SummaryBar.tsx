import React from "react";
import { useSelectedItemsContext } from "../hooks/useSelectedItems";
import { MenuItemData } from "../types";
import DietaryFilter from "./DietaryFilter";
import { flattenDietaries, countUniqueDietaries } from "../utils";

type Props = {
  items: MenuItemData[];
  onDietaryFilterClicked: (name: string) => void;
  selectedDietaryFilters: string[];
};

export default function SummaryBar({
  items,
  onDietaryFilterClicked,
  selectedDietaryFilters,
}: Props) {
  const uniqueDietaries = new Set(flattenDietaries(items));
  const { selectedItems } = useSelectedItemsContext();
  const groupedDietaries = countUniqueDietaries(
    flattenDietaries(selectedItems)
  );

  return (
    <div className="menu-summary">
      <div className="container">
        <div className="row">
          <div className="col-6 menu-summary-left">
            <span data-testid="selected-items-count">
              {selectedItems.length} items
            </span>
          </div>
          <div
            className="col-6 menu-summary-right"
            data-testid="selected-items-dietaries"
          >
            {Array.from(uniqueDietaries).map((dietary) => {
              const count = groupedDietaries[dietary];
              const selected = selectedDietaryFilters.some(
                (_) => _ === dietary
              );

              return (
                <DietaryFilter
                  key={dietary}
                  count={count || 0}
                  name={dietary}
                  onClick={() => onDietaryFilterClicked(dietary)}
                  selected={selected}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
