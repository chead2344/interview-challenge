import React from "react";
import cx from "classnames";

type IProps = {
  dietaries: string[];
  name: string;
  onClick: () => void;
  selected: boolean;
};

const FilterItem: React.FC<IProps> = ({
  dietaries,
  name,
  onClick,
  selected,
}) => (
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

export default FilterItem;
