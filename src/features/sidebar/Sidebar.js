import React, { useState, useEffect } from "react";
import "./sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import SidebarAnalysesSegment from "./SidebarAnalysesSegment";
import { changeAddNewAnalysisInput, selectUser } from "../../userSlice";
import { changeModalProfileOpen } from "../modals/modalSlice";

const Sidebar = () => {
  function signOut() {
    auth.signOut();
  }
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  function openChangeProfileModal() {
    dispatch(changeModalProfileOpen({ open: true }));
  }

  function addNewProject() {
    dispatch(changeAddNewAnalysisInput({ newInputState: true }));
  }

  const [imageValid, setimageValid] = useState(true);

  useEffect(() => {
    setimageValid(true);
  }, [user.photoUrl]);

  function onImageError(img) {
    setimageValid(false);
  }

  const userIcon = <i class="bi bi-person-circle"></i>;

  return (
    <div class="sidebar main d-flex flex-column flex-shrink-0 p-3 text-dark ">
      <a
        href="/"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
      >
        <span class="fs-4">Overview of your analyses</span>
      </a>
      <hr />
      <SidebarAnalysesSegment></SidebarAnalysesSegment>

      <hr />
      <div class="dropdown">
        <a
          href="#"
          class="d-flex align-items-center text-dark text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {imageValid ? (
            <img
              onError={onImageError}
              src={user.photoUrl || "triggerError"}
              alt={""}
              class="rounded-circle me-2"
              width="32"
              height="32"
            />
          ) : (
            <span>
              {userIcon}
              &nbsp;
            </span>
          )}

          <strong>{user.displayName || user.email}</strong>
        </a>
        <ul
          class="dropdown-menu dropdown-menu-dark text-small shadow"
          aria-labelledby="dropdownUser1"
        >
          <li>
            <a class="dropdown-item" onClick={addNewProject}>
              New project...
            </a>
          </li>
          <li>
            <a class="dropdown-item" onClick={openChangeProfileModal}>
              Profile
            </a>
          </li>
          <li>
            <hr class="dropdown-divider" />
          </li>
          <li>
            <a class="dropdown-item" onClick={signOut}>
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
