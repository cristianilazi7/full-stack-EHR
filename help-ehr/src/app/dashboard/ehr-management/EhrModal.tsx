"use client";
import "@/styles/ehrModal.css";

interface EhrModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const EhrModal: React.FC<EhrModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="ehr-modal">
      <div className="ehr-modal__content">
        <h3 className="ehr-modal__title">Confirm Changes</h3>
        <p>Are you sure you want to save these changes?</p>
        <div className="ehr-modal__buttons">
          <button className="ehr-modal__button ehr-modal__button--cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="ehr-modal__button ehr-modal__button--confirm" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default EhrModal;
