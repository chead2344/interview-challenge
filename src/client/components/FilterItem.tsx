import React from "react";
import cx from "classnames";

type Props = {
  dietaries: string[];
  name: string;
  onClick: () => void;
  selected: boolean;
};

export default function FilterItem({
  dietaries,
  name,
  onClick,
  selected,
}: Props) {
  return (
    <li
      aria-label={`Search result - ${name}`}
      className={cx("item", { selected })}
      onClick={onClick}
    >
      <h2>{name}</h2>
      <p>
        {dietaries.map((dietary) => (
          <span key={dietary} className="dietary">
            {dietary}
          </span>
        ))}
      </p>
    </li>
  );
}
