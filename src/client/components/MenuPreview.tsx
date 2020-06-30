import React from "react";
import { useSelectedItemsContext } from "../hooks/useSelectedItems";
import PreviewItem from "./PreviewItem";

const MenuPreview: React.FC = () => {
  const { selectedItems, onRemove } = useSelectedItemsContext();
  return (
    <ul className="menu-preview">
      {selectedItems.map((item) => (
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
