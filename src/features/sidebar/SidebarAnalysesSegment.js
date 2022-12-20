import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAddNewAnalysisInputOpen,
  changeAddNewAnalysisInput,
} from "../../userSlice";
import { changeModalNameOpen } from "../modals/modalSlice";

import {
  selectActiveAnalysisIndex,
  changeActiveAnalysisIndex,
  selectAnalyses,
  removeLastAnalysis,
  createNewAnalysis,
  deleteAnalysis,
} from "../table/tableSlice";

const SidebarAnalysesSegment = () => {
  const analyses = useSelector(selectAnalyses);
  const activeAnalysisIndex = useSelector(selectActiveAnalysisIndex);
  const dispatch = useDispatch();

  const deleteIcon = <i className=" bi bi-trash-fill"></i>;

  //continue on getting data from redux
  const addNewAnalysisInputOpen = useSelector(selectAddNewAnalysisInputOpen);
  const addAnalysisIcon = (
    <i className="bi bi-plus-circle-fill sidebarIcon" role="button"></i>
  );
  const removeAnalysisIcon = (
    <i className="bi bi-dash-circle-fill sidebarIcon" role="button"></i>
  );

  const checkMarkIcon = (
    <i className="bi bi-check sidebarIcon" role="button"></i>
  );

  const xMarkIcon = <i className="bi bi-x sidebarIcon" role="button"></i>;

  const [newAnalysisInputValue, setnewAnalysisInputValue] = useState("");
  function addNewAnalysis() {
    const newAnalysisNameIsAlreadyUsed = analyses.some(
      (analysis) => analysis.analysisName === newAnalysisInputValue
    );
    const limitOfCharactersInAnalysisName = 40;

    if (newAnalysisNameIsAlreadyUsed)
      alert("This name is already used, try a unique one instead");
    else if (newAnalysisInputValue === "") {
      alert("Please provide value to the input box");
    } else if (newAnalysisInputValue.length > limitOfCharactersInAnalysisName) {
      alert(
        "Analysis lenght can not exceed " +
          limitOfCharactersInAnalysisName +
          " characters, you are " +
          (newAnalysisInputValue.length - limitOfCharactersInAnalysisName) +
          " characters over the limit."
      );
    } else {
      //if inputed analysis name is unique, new analysis can be created
      dispatch(createNewAnalysis({ analysisName: newAnalysisInputValue }));

      //than the open input can be closed
      dispatch(changeAddNewAnalysisInput({ newInputState: false }));

      setnewAnalysisInputValue("");
    }
  }

  function removeUsersLastAnalysis() {
    //check whether this is not the use
    //r's last analysis as user is required to have at least one
    if (analyses.length > 1) {
      if (window.confirm("Do you really want to remove last analysis?")) {
        dispatch(removeLastAnalysis());
      }
    } else {
      alert("Can not delete your only analysis");
    }
  }

  function deleteUsersAnalysis(indexToDelete, e) {
    //stops parents onClick from firing
    e.stopPropagation();

    if (window.confirm("Do you really want to delete the analysis")) {
      dispatch(deleteAnalysis({ indexToDetete: indexToDelete }));
    }
  }

  function triggerChangeNameModalOpen(e, index, name) {
    //stops parents onClick from firing
    e.stopPropagation();

    dispatch(changeModalNameOpen({ open: true, index: index, name: name }));
  }

  const editIcon = <i className=" bi bi-pen-fill"></i>;

  return (
    <div className="analysesListContainer">
      <ul className="nav nav-pills flex-column mb-auto analysesList">
        {analyses.map((analysis, index) => (
          <li
            key={"sidebarAnalysisSegmentMenu" + index}
            onClick={() => {
              dispatch(changeActiveAnalysisIndex({ index: index }));
            }}
            className="nav-item"
          >
            <a
              href="#"
              className={`nav-link ${
                activeAnalysisIndex === index ? "active" : "text-dark"
              }`}
              aria-current="page"
            >
              {analysis.analysisName}
              {/* when hovering  over list of anylysis, an icon to delete or edit pops up on hover*/}
              <span className="changeAnalysisIcons">
                &nbsp;
                <span
                  onClick={(e) => {
                    triggerChangeNameModalOpen(e, index, analysis.analysisName);
                  }}
                >
                  {editIcon}
                </span>
                &nbsp;
                <span
                  onClick={(e) => {
                    deleteUsersAnalysis(index, e);
                  }}
                >
                  {deleteIcon}
                </span>
              </span>
            </a>
          </li>
        ))}
        <li>
          {/* area to add or delete new analysis */}
          {addNewAnalysisInputOpen ? (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="d-flex flex-row">
                <input
                  className="openedInputToAddAnalysis"
                  placeholder="new analysis name"
                  value={newAnalysisInputValue}
                  onChange={(e) => {
                    setnewAnalysisInputValue(e.target.value);
                  }}
                ></input>
              </div>
              <div className="d-flex flex-row">
                <span onClick={addNewAnalysis}>{checkMarkIcon}</span>
                &nbsp;
                <span
                  onClick={() => {
                    dispatch(
                      changeAddNewAnalysisInput({ newInputState: false })
                    );
                  }}
                >
                  {xMarkIcon}
                </span>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-row justify-content-center">
              <span
                onClick={() => {
                  dispatch(changeAddNewAnalysisInput({ newInputState: true }));
                }}
              >
                {addAnalysisIcon}
              </span>
              &nbsp; &nbsp; &nbsp;
              <span onClick={removeUsersLastAnalysis}>
                {removeAnalysisIcon}
              </span>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default SidebarAnalysesSegment;
