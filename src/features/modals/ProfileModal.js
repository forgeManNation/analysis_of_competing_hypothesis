import React, { useRef, useEffect, useState } from "react";
import { Modal } from "bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeModalProfileOpen, selectModalProfileOpen } from "./modalSlice";
import { selectUser, logIn } from "../../userSlice";
import { auth, updateProfile, onAuthStateChanged } from "../../firebase";

const ProfileModal = () => {
  const userData = useSelector(selectUser);
  const dispatch = useDispatch();
  const modalRef = useRef();
  const profileModalOpen = useSelector(selectModalProfileOpen);
  const [userProfilePicture, setuserProfilePicture] = useState(
    userData.photoUrl
  );
  const [displayName, setdisplayName] = useState(userData.displayName);

  const [user, setuser] = useState(null);

  //there is a problem with saving all users data into redux store because there are functions as properties
  //so user is grabbed with no onAuthStateChanged handle
  useEffect(() => {
    onAuthStateChanged(auth, (logged_user) => {
      setuser(logged_user);
    });
  }, []);

  function applyChanges() {
    updateProfile(user, {
      displayName: displayName,
      photoURL: userProfilePicture,
    }).then(() => {
      const userToSaveTORedux = {
        displayName: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        uid: user.uid,
      };

      dispatch(logIn(userToSaveTORedux));
    });
  }

  function closeProfileModal() {
    dispatch(changeModalProfileOpen({ open: false }));
  }

  useEffect(() => {
    if (profileModalOpen) {
      const profileModal = modalRef.current;
      const bsModal = new Modal(profileModal, {
        backdrop: false,
        keyboard: false,
      });
      bsModal.show();
    } else {
      const profileModal = modalRef.current;
      const bsModal = Modal.getInstance(profileModal);
      if (bsModal !== null) {
        bsModal.hide();
      }
    }
  }, [profileModalOpen]);

  return (
    <div className="modal fade modalBackground" ref={modalRef} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Profile Settigns
            </h5>

            <button
              type="button"
              className="btn-close"
              onClick={closeProfileModal}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body d-flex flex-column">
            <p>
              Change Profile picture URL
              <br />
              (Url to some online picture)
            </p>
            <input
              placeholder="new profile picture url"
              onChange={(e) => {
                setuserProfilePicture(e.target.value);
              }}
              className="p-1"
              value={userProfilePicture || ""}
            ></input>
            &nbsp;
            <p>Change username</p>
            <input
              placeholder="new username"
              onChange={(e) => {
                setdisplayName(e.target.value);
              }}
              className="p-1"
              value={displayName || ""}
            ></input>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeProfileModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                applyChanges();
                closeProfileModal();
              }}
            >
              Apply changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
