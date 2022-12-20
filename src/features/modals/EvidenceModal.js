import React, { useRef, useEffect, useState } from "react";
import { Modal } from "bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addEvidence, editEvidence } from "../table/tableSlice";
import { changeModalEvidenceOpen, selectModalEvidence } from "./modalSlice";

const EvidenceModal = () => {
  const dispatch = useDispatch();

  const evidenceModalData = useSelector(selectModalEvidence);

  const [name, setname] = useState(
    evidenceModalData.name !== undefined ? evidenceModalData.name : ""
  );
  const [type, settype] = useState(
    evidenceModalData.type !== undefined ? evidenceModalData.type : ""
  );
  const [credibility, setcredibility] = useState(
    evidenceModalData.credibility || "Medium"
  );
  const [relevance, setrelevance] = useState(
    evidenceModalData.relevance || "Medium"
  );

  function submitEvidence() {
    if (evidenceModalData.index === undefined) {
      dispatch(addEvidence({ name, type, credibility, relevance }));
    } else {
      dispatch(
        editEvidence({
          name,
          type,
          credibility,
          relevance,
          index: evidenceModalData.index,
        })
      );
    }
  }

  function changename(e) {
    setname(e.target.value);
  }

  function changetype(e) {
    settype(e.target.value);
  }

  function changeCredibility(e) {
    setcredibility(e.target.value);
  }

  function changeRelevance(e) {
    setrelevance(e.target.value);
  }

  const modalRef = useRef();

  //when modal is opened data are first updated with data from redux
  //then Modal is shown or hidden relying on redux open atribute
  useEffect(() => {
    let evidenceModal = modalRef.current;

    //when evidence modal is opened data are loaded into its states
    setname(evidenceModalData.name ? evidenceModalData.name : "");
    setcredibility(
      evidenceModalData.credibility ? evidenceModalData.credibility : "Medium"
    );
    setrelevance(
      evidenceModalData.relevance ? evidenceModalData.relevance : "Medium"
    );
    settype(evidenceModalData.type ? evidenceModalData.type : "");

    if (evidenceModalData.open) {
      const bsModal = new Modal(evidenceModal, {
        backdrop: false,
        keyboard: false,
      });
      bsModal.show();
    } else {
      const bsModal = Modal.getInstance(evidenceModal);

      if (bsModal !== null) {
        bsModal.hide();
      }
    }
  }, [evidenceModalData.open]);

  //close and submit modal
  function closeAndSumbit() {
    submitEvidence();
    dispatch(changeModalEvidenceOpen({ open: false }));
  }

  return (
    <div
      className="modal fade modalBackground"
      data-backdrop="false"
      ref={modalRef}
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              {" "}
              {evidenceModalData.name ? "Edit evidence" : "Add evidence"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => {
                dispatch(changeModalEvidenceOpen({ open: false }));
              }}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body d-flex flex-column">
            <p>Evidence</p>
            <input onChange={changename} value={name}></input>

            <p>Type / Method of aquisition of this information </p>
            <input onChange={changetype} value={type}></input>

            <p>Credibility</p>
            <select
              onLoad={changeCredibility}
              onChange={changeCredibility}
              value={credibility}
              className="form-control form-control-sm"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <p>Relevance </p>
            <select
              onChange={changeRelevance}
              value={relevance}
              className="form-control form-control-sm"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                dispatch(changeModalEvidenceOpen({ open: false }));
              }}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                closeAndSumbit();
              }}
            >
              {evidenceModalData.name ? "Edit" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceModal;
