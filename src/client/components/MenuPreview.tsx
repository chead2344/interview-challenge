import React from "react";
import { MenuItemData } from "../types";
import PreviewItem from "./PreviewItem";

type IProps = {
  items: MenuItemData[];
  onItemRemoved: (item: MenuItemData) => void;
};

const MenuPreview: React.FC<IProps> = ({ items, onItemRemoved }) => (
  <ul className="menu-preview">
    {items.map((item) => (
      <PreviewItem
        key={item.id}
        dietaries={item.dietaries}
        name={item.name}
        onRemove={() => onItemRemoved(item)}
      />
    ))}
  </ul>
);

export default MenuPreview;
