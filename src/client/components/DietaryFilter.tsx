import React from "react";

type Props = {
  count?: number;
  name: string;
  onClick: () => void;
  selected?: boolean;
};

const DietaryFilter: React.FC<Props> = ({ name, count, onClick, selected }) => {
  return (
    <React.Fragment>
      {count || 0}x{" "}
      <span
        className="dietary"
        onClick={onClick}
        style={selected && { backgroundColor: "red" }}
      >
        {name}
      </span>
    </React.Fragment>
  );
};

export default DietaryFilter;
