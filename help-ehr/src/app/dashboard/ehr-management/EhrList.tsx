"use client";

import { useEffect, useState } from "react";
import "@/styles/ehrList.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchEHRMappings } from "@/redux/services/ehrService";
import { fetchEHRSystems, updateEHRMappingsLocally } from "@/redux/thunks/ehrThunks";

interface EhrListProps {
  onSelectEhr: (ehr: string) => void;
}

const EhrList: React.FC<EhrListProps> = ({ onSelectEhr }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { ehrSystems } = useSelector((state: RootState) => state.ehr);
  const { isLoading, error } = useSelector((state: RootState) => state.ehr);
  const [selectedEhr, setSelectedEhr] = useState<string | null>(null);

  // Fetch data only when selectedEhr changes
  useEffect(() => {
    dispatch(fetchEHRSystems());
    if (selectedEhr) {
      dispatch(fetchEHRMappings(selectedEhr));
    }
  }, [dispatch, selectedEhr]);

  const handleSelect = (ehr: string) => {
    setSelectedEhr(ehr);
    onSelectEhr(ehr);
  };

  const handleAddNewEhr = () => {
    setSelectedEhr(null);
    onSelectEhr("");
    dispatch(updateEHRMappingsLocally([]));
  };


  return (
    <div className="ehr-list">
      <h2 className="ehr-list__title">EHR Systems</h2>

      {isLoading && <p className="ehr-list__loading">Loading...</p>}
      {error && <p className="ehr-list__error">{"Response not successful"}</p>}

      <ul className="ehr-list__items">
        {ehrSystems.map((ehr) => (
          <li
            key={ehr.ehrSystem} 
            className={`ehr-list__item ${
              selectedEhr === ehr.ehrSystem ? "selected" : ""
            }`} 
            onClick={() => handleSelect(ehr.ehrSystem)} 
          >
            {ehr.ehrSystem}
          </li>
        ))}
        <li
          className="ehr-list__item ehr-list__item--new"
          onClick={handleAddNewEhr}
        >
          + Add New EHR
        </li>
      </ul>
    </div>
  );
};

export default EhrList;
