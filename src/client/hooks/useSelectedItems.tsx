import React, { useState, createContext, useContext } from "react";
import { MenuItemData } from "../types";

type Context = {
  onAdd(item: MenuItemData): void;
  onRemove(item: MenuItemData): void;
  selectedItems: MenuItemData[];
};

const SelectedItemsContext = createContext<Context | null>(null);

/**
 * A simple wrapper around `useContext` that checks the provider is in scope
 */
export function useSelectedItemsContext() {
  const context = useContext(SelectedItemsContext);
  if (!context) {
    throw new Error("Must be used in scope of a SelectedItemsProvider");
  }

  return context;
}

export const SelectedItemsProvider: React.FC = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState<MenuItemData[]>([]);

  function onAdd(item: MenuItemData) {
    if (!selectedItems.find((_) => _.id === item.id)) {
      setSelectedItems((prev) => [...prev, item]);
    }
  }

  function onRemove(item: MenuItemData) {
    setSelectedItems((prev) => prev.filter((_) => _.id !== item.id));
  }

  return (
    <SelectedItemsContext.Provider value={{ onAdd, selectedItems, onRemove }}>
      {children}
    </SelectedItemsContext.Provider>
  );
};
