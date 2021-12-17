import React from "react";

function DurationInput(props) {
  return (
    <React.Fragment>
      <input
        type="number"
        placeholder="Duration in minutes"
        onChange={props.durationChanged}
      />
    </React.Fragment>
  );
}

export default DurationInput;
