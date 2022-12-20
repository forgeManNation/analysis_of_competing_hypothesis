import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeCompatibility } from "../tableSlice";
import "./compatibilityInput.scss";
import { Tooltip } from "reactstrap";

const CompatibilityInput = (props) => {
  const { tableRowindex, cellIndex } = props;

  const dispatch = useDispatch();

  const [compatibleTooltipOpen, setcompatibleTooltipOpen] = useState(false);
  function toggleCompatibleTooltipOpen() {
    setcompatibleTooltipOpen(!compatibleTooltipOpen);
  }

  const [neutralTooltipOpen, setneutralTooltipOpen] = useState(false);
  function toggleNeutralTooltipOpen() {
    setneutralTooltipOpen(!neutralTooltipOpen);
  }

  const [incompatibleTooltipOpen, setincompatibleTooltipOpen] = useState(false);
  function toggleIncompatibleTooltipOpen() {
    setincompatibleTooltipOpen(!incompatibleTooltipOpen);
  }

  return (
    <div className="d-flex flex-row justify-content-center">
      <button
        className="compatibilityButton compatible"
        id={"compatible" + tableRowindex + cellIndex}
        onClick={() => {
          dispatch(
            changeCompatibility({
              compatibility: "C",
              tableRowindex,
              cellIndex,
            })
          );
        }}
      >
        C
      </button>
      <Tooltip
        delay={400}
        placement="bottom"
        isOpen={compatibleTooltipOpen}
        target={"compatible" + tableRowindex + cellIndex}
        toggle={toggleCompatibleTooltipOpen}
      >
        Evidence <strong>compatible</strong> with hypothesis
      </Tooltip>

      <button
        className="compatibilityButton neutral"
        id={"neutral" + tableRowindex + cellIndex}
        onClick={() => {
          dispatch(
            changeCompatibility({
              compatibility: "N",
              tableRowindex,
              cellIndex,
            })
          );
        }}
      >
        N
      </button>
      <Tooltip
        delay={400}
        placement="bottom"
        isOpen={neutralTooltipOpen}
        target={"neutral" + tableRowindex + cellIndex}
        toggle={toggleNeutralTooltipOpen}
      >
        Evidence <strong>neutral</strong> to hypothesis
      </Tooltip>

      <button
        className="compatibilityButton incompatible"
        id={"incompatible" + tableRowindex + cellIndex}
        onClick={() => {
          dispatch(
            changeCompatibility({
              compatibility: "I",
              tableRowindex,
              cellIndex,
            })
          );
        }}
      >
        I
      </button>
      <Tooltip
        delay={400}
        placement="bottom"
        isOpen={incompatibleTooltipOpen}
        target={"incompatible" + tableRowindex + cellIndex}
        toggle={toggleIncompatibleTooltipOpen}
      >
        Evidence <strong>incompatible</strong> with hypothesis
      </Tooltip>
    </div>
  );
};

export default CompatibilityInput;
