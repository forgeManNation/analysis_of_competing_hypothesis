import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectTableHeadData, deleteSpecifiedHypothesis } from "../tableSlice";

import ProbabilityNumbersRow from "./ProbabilityNumbersRow";

import InformationIconAndPopover from "./InformationIconAndPopover";
import { changeModalHypothesisOpen } from "../../modals/modalSlice";

const TableHead = () => {
  const dispatch = useDispatch();

  const tableHeadData = useSelector(selectTableHeadData);

  const deleteHypothesisIcon = <i className="bi bi-trash3-fill "></i>;

  function deleteHypothesis(index) {
    if (window.confirm("do you really want to delete the hypothesis")) {
      dispatch(deleteSpecifiedHypothesis(index));
    }
  }

  const editIcon = <i className=" bi bi-pen-fill"></i>;

  return (
    <thead>
      <tr>
        <th>Evidence</th>
        <th>Evidence Type</th>
        <th>Credibility</th>
        <th>Relevance</th>
        {tableHeadData.map((tableHeadUpperRowCell, index) => {
          //incrementing index by one so that there is no zero index hypothesis in the UI
          const UIIndex = index + 1;

          return (
            <th key={tableHeadUpperRowCell + index}>
              <div className="tableHeadCellContainer d-flex flex-row justify-content-center align-items-center">
                <div>
                  {/* number of hypothesis */}
                  {"H" + UIIndex}
                  &nbsp;
                  {/* name of hypothesis */}
                  {tableHeadUpperRowCell.name}
                  &nbsp;
                  <div className="d-flex flex-row justify-content-center">
                    {/* button to see additional information about hypothesis / appear only when any information exist */}
                    {tableHeadUpperRowCell.information ? (
                      <InformationIconAndPopover
                        index={index}
                      ></InformationIconAndPopover>
                    ) : (
                      <></>
                    )}
                    &nbsp;
                    {/* button to edit information about hypothesis */}
                    <span
                      role="button"
                      onClick={() => {
                        dispatch(
                          changeModalHypothesisOpen({
                            open: true,
                            index: index,
                            name: tableHeadUpperRowCell.name,
                            additionalInformation:
                              tableHeadUpperRowCell.information,
                          })
                        );
                      }}
                      id={"informationPopover" + index}
                    >
                      {editIcon}
                    </span>
                    &nbsp;
                    {/* button to delete hypothesis */}
                    <span
                      role="button"
                      onClick={() => deleteHypothesis({ index: index })}
                      id={"informationPopover" + index}
                    >
                      {deleteHypothesisIcon}
                    </span>
                  </div>
                </div>
              </div>
            </th>
          );
        })}
      </tr>

      <tr>
        <th>#</th>
        <th>#</th>
        <th>#</th>
        <th>#</th>
        <ProbabilityNumbersRow></ProbabilityNumbersRow>
      </tr>
    </thead>
  );
};

export default TableHead;
