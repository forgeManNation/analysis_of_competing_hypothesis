import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { selectTableHeadData } from "../tableSlice";

const InformationIconAndPopover = (props) => {
  const viewInformationIcon = <i className="bi bi-info-circle-fill"></i>;

  const tableHeadData = useSelector(selectTableHeadData);
  const [popoverToggled, setpopoverToggled] = useState(false);

  function changePopoverToggled() {
    setpopoverToggled(!popoverToggled);
  }

  return (
    <>
      <span
        id={"Popover" + props.index}
        onClick={changePopoverToggled}
        role="button"
      >
        {viewInformationIcon}
      </span>
      <Popover
        placement="bottom"
        isOpen={popoverToggled}
        target={"Popover" + props.index}
        toggle={changePopoverToggled}
      >
        <PopoverHeader>{tableHeadData[props.index].name}</PopoverHeader>
        <PopoverBody>{tableHeadData[props.index].information}</PopoverBody>
      </Popover>
    </>
  );
};

export default InformationIconAndPopover;
