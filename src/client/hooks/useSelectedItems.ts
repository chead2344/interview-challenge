import { useState } from "react";
import { MenuItemData } from "../types";

export default function useSelectedItems() {
  const [selectedItems, setSelectedItems] = useState<MenuItemData[]>([]);

  function onAdd(item: MenuItemData) {
    if (!selectedItems.find((_) => _.id === item.id)) {
      setSelectedItems((prev) => [...prev, item]);
    }
  }

  function onRemove(item: MenuItemData) {
    setSelectedItems((prev) => prev.filter((_) => _.id !== item.id));
  }

  return { selectedItems, onAdd, onRemove };
}
