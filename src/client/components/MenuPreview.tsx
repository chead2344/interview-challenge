import React from "react";
import { useSelectedItemsContext } from "../hooks/useSelectedItems";
import PreviewItem from "./PreviewItem";

type Props = {
  selectedDietaryFilters: string[];
};

const MenuPreview: React.FC<Props> = ({ selectedDietaryFilters }) => {
  const { selectedItems, onRemove } = useSelectedItemsContext();
  const filteredItems = selectedDietaryFilters.length
    ? selectedItems.filter((selectedItem) => {
        if (
          selectedItem.dietaries.some((_) =>
            selectedDietaryFilters.find((x) => x === _)
          )
        ) {
          return true;
        }

        return false;
      })
    : selectedItems;

  return (
    <ul className="menu-preview">
      {filteredItems.map((item) => (
        <PreviewItem
          key={item.id}
          dietaries={item.dietaries}
          name={item.name}
          onRemove={() => onRemove(item)}
        />
      ))}
    </ul>
  );
};

export default MenuPreview;
