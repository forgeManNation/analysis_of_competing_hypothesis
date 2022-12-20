import React, { useState, useRef } from "react";
import TableHead from "./tableHead/TableHead.js";
import TableBody from "./tableBody/TableBody.js";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "reactstrap";
import { changeModalHypothesisOpen } from "../modals/modalSlice";
import {
  deleteLastEvidence,
  deleteLastHypothesis,
  selectAnalysisName,
} from "./tableSlice";
import { useReactToPrint } from "react-to-print";
import "./table.scss";
import { changeModalEvidenceOpen } from "../modals/modalSlice";

const Table = () => {
  const analysisName = useSelector(selectAnalysisName);
  const dispatch = useDispatch();

  function launchHypothesisModal() {
    dispatch(
      changeModalHypothesisOpen({
        open: true,
      })
    );
  }

  function launchEvidenceModal() {
    dispatch(changeModalEvidenceOpen({ open: true }));
  }

  const [deleteLastRowButtonTooltipOpen, setdeleteLastRowButtonTooltipOpen] =
    useState(false);
  const [addNewRowButtonTooltipOpen, setaddNewRowButtonTooltipOpen] =
    useState(false);
  const [
    deleteLastHypothesisButtonTooltipOpen,
    setdeleteLastHypothesisButtonTooltipOpen,
  ] = useState(false);
  const [addNewColumnButtonTooltipOpen, setaddNewColumnButtonTooltipOpen] =
    useState(false);

  const printerIcon = (
    <i className="bi bi-printer-fill table-alternating-icon"></i>
  );

  const informationIcon = (
    <i className="bi bi-info-circle-fill table-alternating-icon"></i>
  );

  function deleteEvidence() {
    if (window.confirm("Do you really want to delete evidence?")) {
      dispatch(deleteLastEvidence());
    }
  }

  function deleteHypothesis() {
    if (window.confirm("Do you really want to delete last hypothesis?")) {
      dispatch(deleteLastHypothesis());
    }
  }

  //printing table using extrnal library react-to-print by passing it table ref
  const tableRef = useRef();

  const printPageStyle = "textAlign: center!important";

  const handlePrint = useReactToPrint({
    pageStyle: printPageStyle,
    content: () => tableRef.current,
    copyStyles: true,
  });

  return (
    <>
      <div
        className="d-flex flex-column justify-content-center tableSegment"
        ref={tableRef}
      >
        <div>
          <h2 className="analysisNameAboveTable">{analysisName}</h2>
        </div>
        <div className="tableContainer d-flex flex-direction-row justify-content-center ">
          <table className="table">
            <TableHead></TableHead>
            <TableBody></TableBody>
          </table>

          <div className="nonprint align-items-center d-flex flex-column justify-content-center m-4">
            {/* add new column */}
            <div
              role="button"
              id="addNewColumnButton"
              className="table-alternating-button"
              aria-label="add hypotesis"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={launchHypothesisModal}
            >
              <i className="bi bi-plus-square-fill table-alternating-icon"></i>
            </div>
            <Tooltip
              delay={300}
              placement="bottom"
              isOpen={addNewColumnButtonTooltipOpen}
              target="addNewColumnButton"
              toggle={() => {
                setaddNewColumnButtonTooltipOpen(
                  !addNewColumnButtonTooltipOpen
                );
              }}
            >
              Add new hypotesis
            </Tooltip>

            {/* delete last column*/}
            {/* -/delete last hypotesis  */}
            <div
              role="button"
              id="deleteLastHypothesisButton"
              className="table-alternating-button"
              aria-label="delete last hypotesis"
              onClick={deleteHypothesis}
            >
              <i className="bi bi-dash-square-fill table-alternating-icon"></i>
            </div>
            <Tooltip
              delay={300}
              placement="bottom"
              isOpen={deleteLastHypothesisButtonTooltipOpen}
              target="deleteLastHypothesisButton"
              toggle={() => {
                setdeleteLastHypothesisButtonTooltipOpen(
                  !deleteLastHypothesisButtonTooltipOpen
                );
              }}
            >
              Delete last hypothesis
            </Tooltip>
          </div>
        </div>
        <div className="nonprint">
          <div className="align-items-center d-flex justify-content-center ">
            {/* add new row */}
            <div
              role="button"
              id="addNewRowButton"
              className="table-alternating-button"
              aria-label="add evidence"
              onClick={launchEvidenceModal}
            >
              <i className="bi bi-plus-square-fill table-alternating-icon"></i>
            </div>
            <Tooltip
              delay={300}
              placement="bottom"
              isOpen={addNewRowButtonTooltipOpen}
              target="addNewRowButton"
              toggle={() => {
                setaddNewRowButtonTooltipOpen(!addNewRowButtonTooltipOpen);
              }}
            >
              Add new evidence
            </Tooltip>

            {/* delete last row */}
            <div
              role="button"
              id="deleteLastRowButton"
              className="table-alternating-button"
              aria-label="delete last evidence"
              onClick={deleteEvidence}
            >
              <i className="bi bi-dash-square-fill table-alternating-icon"></i>
            </div>
          </div>
          <Tooltip
            delay={300}
            placement="bottom"
            isOpen={deleteLastRowButtonTooltipOpen}
            target="deleteLastRowButton"
            toggle={() => {
              setdeleteLastRowButtonTooltipOpen(
                !deleteLastRowButtonTooltipOpen
              );
            }}
          >
            Delete last evidence
          </Tooltip>
        </div>

        <div className="nonprint bottom-right-buttons">
          <div
            className="table-alternating-button "
            role="button"
            onClick={handlePrint}
          >
            {printerIcon}
          </div>

          <a target="_blank" href="./about">
            <div className="table-alternating-button " role="button">
              {informationIcon}
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Table;
