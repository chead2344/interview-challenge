import React from "react";
import { MenuItemData } from "../types";
import { useSelectedItemsContext } from "../hooks/useSelectedItems";

const flattenDietaries = (items: MenuItemData[]) =>
  items.reduce((acc, val) => acc.concat(val.dietaries), [] as string[]);

const countUniqueEntries = (dietaries: string[]) =>
  dietaries.reduce(
    (acc, current) => ({
      ...acc,
      [current]: acc[current] ? acc[current] + 1 : 1,
    }),
    {} as { [field: string]: number }
  );

const SummaryBar: React.FC = () => {
  const { selectedItems } = useSelectedItemsContext();
  const groupedDietaries = countUniqueEntries(flattenDietaries(selectedItems));
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
            {Object.keys(groupedDietaries).map((dietary) => {
              const count = groupedDietaries[dietary];
              return (
                <React.Fragment key={dietary}>
                  {count}x <span className="dietary">{dietary}</span>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryBar;
