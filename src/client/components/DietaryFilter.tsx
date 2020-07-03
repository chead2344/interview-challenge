import React from "react";
import cx from "classnames";

type Props = {
  count?: number;
  name: string;
  onClick: () => void;
  selected?: boolean;
};

export default function DietaryFilter({
  name,
  count = 0,
  onClick,
  selected,
}: Props) {
  return (
    <React.Fragment>
      {count}x{" "}
      <span className={cx("dietary", { selected })} onClick={onClick}>
        {name}
      </span>
    </React.Fragment>
  );
}
