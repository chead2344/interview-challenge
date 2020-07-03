import React from "react";
import { useSelectedItemsContext } from "../hooks/useSelectedItems";
import PreviewItem from "./PreviewItem";

type Props = {
  selectedDietaryFilters: string[];
};

export default function MenuPreview({ selectedDietaryFilters }: Props) {
  const { selectedItems, onRemove } = useSelectedItemsContext();
  const filteredItems = selectedDietaryFilters.length
    ? selectedItems.filter((selectedItem) => {
        const isFiltered = selectedItem.dietaries.some((_) =>
          selectedDietaryFilters.find((x) => x === _)
        );

        return isFiltered;
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
}
