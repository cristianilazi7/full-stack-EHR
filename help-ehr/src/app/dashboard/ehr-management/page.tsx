"use client";

import { useState } from "react";
import EhrList from "./EhrList";
import EhrForm from "./EhrForm";
import EhrModal from "./EhrModal";
import "@/styles/ehrPage.css";

const EhrManagementPage: React.FC = () => {
  const [selectedEhr, setSelectedEhr] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveChanges = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="ehr-management">
      <div className="ehr-management__container">
        {/* Left - List of EHRs */}
        <EhrList onSelectEhr={setSelectedEhr} />

        {/* Right - Form to edit or create EHR */}
        <EhrForm selectedEhr={selectedEhr} />
      </div>

      {/* Confirmation Modal */}
      <EhrModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleSaveChanges} />
    </div>
  );
};

export default EhrManagementPage;
