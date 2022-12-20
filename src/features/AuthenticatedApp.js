import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Table from "./table/Table";
import SettingsModal from "./modals/ProfileModal";
import ChangeNameModal from "./modals/ChangeNameModal";
import EvidenceModal from "./modals/EvidenceModal";
import HypothesisModal from "./modals/HypothesisModal";

const AuthenticatedApp = () => {
  return (
    <div className="App d-flex flex-row">
      <Sidebar></Sidebar>

      <Table></Table>

      {/* Modals */}
      <SettingsModal></SettingsModal>
      <ChangeNameModal></ChangeNameModal>
      <EvidenceModal></EvidenceModal>
      <HypothesisModal></HypothesisModal>
    </div>
  );
};

export default AuthenticatedApp;
