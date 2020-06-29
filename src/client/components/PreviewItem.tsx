import React from "react";
import cx from "classnames";

type IProps = {
  dietaries: string[];
  name: string;
  onRemove: () => void;
};

const PreviewItem: React.FC<IProps> = ({ dietaries, name, onRemove }) => (
  <li aria-label={`Selected item - ${name}`} className={cx("item")}>
    <h2>{name}</h2>
    <p>
      {dietaries.map((dietary) => (
        <span key={dietary} className="dietary">
          {dietary}
        </span>
      ))}
    </p>
    <button
      className="remove-item"
      onClick={onRemove}
      aria-label={`Remove item - ${name}`}
    >
      x
    </button>
  </li>
);

export default PreviewItem;
