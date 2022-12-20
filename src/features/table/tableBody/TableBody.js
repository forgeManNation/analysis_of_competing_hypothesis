import React from "react";
import CompatibilityInput from "./CompatibilityInput";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTableBodyData,
  changeCompatibility,
  deleteSpecifiedEvidence,
} from "../tableSlice";
import "./tableBody.scss";
import { changeModalEvidenceOpen } from "../../modals/modalSlice";
const TableBody = () => {
  const tableBodyData = useSelector(selectTableBodyData);

  const dispatch = useDispatch();

  function deleteEvidence(tableRowindex) {
    if (window.confirm("do you really want to delete evidence?")) {
      dispatch(deleteSpecifiedEvidence(tableRowindex));
    }
  }

  const editIcon = <i role="button" className="bi bi-pen-fill"></i>;
  const deleteIcon = <i className="bi bi-trash3-fill"></i>;
  const editEvidenceIcon = <i className="bi bi-pen-fill"></i>;

  return (
    <tbody>
      {tableBodyData.map((tableRow, tableRowindex) => (
        <tr key={tableBodyData + tableRowindex}>
          {/* evidence name */}
          <td className="nameCell">
            <span className="d-flex flex-row justify-content-center">
              <span className="iconsWrapper">
                <span
                  className="editEvidenceIcon"
                  role="button"
                  onClick={() => {
                    dispatch(
                      changeModalEvidenceOpen({
                        open: true,
                        name: tableRow.name,
                        type: tableRow.type,
                        credibility: tableRow.credibility,
                        relevance: tableRow.relevance,
                        index: tableRowindex,
                      })
                    );
                  }}
                >
                  {editEvidenceIcon}
                </span>
                &nbsp;
                <span
                  role="button"
                  className="editEvidenceIcon"
                  onClick={() => {
                    deleteEvidence(tableRowindex);
                  }}
                >
                  {deleteIcon}
                </span>
              </span>
              &nbsp;
              {tableRow.name}
            </span>
          </td>
          <td>{tableRow.type}</td>
          <td>{tableRow.credibility}</td>
          <td>{tableRow.relevance}</td>
          {tableRow.inputCells.map((cell, cellIndex) => {
            switch (cell) {
              //case compatible
              case "C":
                return (
                  <td key={"compatible" + cellIndex} className="inputCell">
                    Compatible
                    <span
                      className="editIcon"
                      onClick={() => {
                        dispatch(
                          changeCompatibility({
                            compatibility: "",
                            tableRowindex,
                            cellIndex,
                          })
                        );
                      }}
                    >
                      &nbsp;{editIcon}
                    </span>
                  </td>
                );
              //case neutral
              case "N":
                return (
                  <td key={"neutral" + cellIndex} className="inputCell">
                    Neutral
                    <span
                      className="editIcon"
                      onClick={() => {
                        dispatch(
                          changeCompatibility({
                            compatibility: "",
                            tableRowindex,
                            cellIndex,
                          })
                        );
                      }}
                    >
                      &nbsp;{editIcon}
                    </span>
                  </td>
                );
              //case incompatible
              case "I":
                return (
                  <td key={"incompatible" + cellIndex} className="inputCell">
                    Incompatible
                    <span
                      className="editIcon"
                      onClick={() => {
                        dispatch(
                          changeCompatibility({
                            compatibility: "",
                            tableRowindex,
                            cellIndex,
                          })
                        );
                      }}
                    >
                      &nbsp;{editIcon}
                    </span>
                  </td>
                );
              //case ""
              default:
                return (
                  <td key={"default" + cellIndex} className="inputCell">
                    <CompatibilityInput
                      tableRowindex={tableRowindex}
                      cellIndex={cellIndex}
                    ></CompatibilityInput>
                  </td>
                );
            }
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
