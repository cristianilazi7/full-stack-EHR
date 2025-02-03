"use client";

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { updateEHRMappingsLocally, saveEHRMappingsToDB, fetchEHRSystems } from "@/redux/thunks/ehrThunks";
import { FiTrash2, FiSave } from "react-icons/fi"; // Import icons
import "@/styles/ehrForm.css";
import Swal from "sweetalert2";

interface EhrFormProps {
  selectedEhr: string | null;
}

const EhrForm: React.FC<EhrFormProps> = ({ selectedEhr }) => {
  const dispatch = useDispatch<AppDispatch>();
  const ehrFieldsContainerRef = useRef<HTMLDivElement>(null);
  

  const mappings = useSelector((state: RootState) => state.ehr.mappings);
  
 
  const [localMappings, setLocalMappings] = useState(mappings);
  const [ehrName, setEhrName] = useState(selectedEhr || "");
  

  const hasChangesRef = useRef(false);

  useEffect(() => {
    setLocalMappings(mappings); 
    hasChangesRef.current = false;
  }, [mappings]);

  const handleAddField = () => {
    const newMappings = [...localMappings, { ehrSystem: ehrName, sourceField: "", targetField: "" }];
    setLocalMappings(newMappings);
    hasChangesRef.current = true;
    dispatch(updateEHRMappingsLocally(newMappings)); 
    setTimeout(() => {
      ehrFieldsContainerRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleRemoveField = (index: number) => {
    const newMappings = localMappings.filter((_, i) => i !== index);
    setLocalMappings(newMappings);
    hasChangesRef.current = true;
    dispatch(updateEHRMappingsLocally(newMappings)); 
  };

  
const handleSaveToDB = async () => {
  const ehrSystem = selectedEhr || ehrName.trim(); 

  if (!ehrSystem) {
    Swal.fire({
      icon: "warning",
      title: "Missing EHR Name",
      text: "Please enter an EHR name before saving.",
    });
    return;
  }

  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This will save the changes to the database.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, save it!",
  });

  if (result.isConfirmed) {
    dispatch(saveEHRMappingsToDB({ ehrSystem, mappings: localMappings }))
      .unwrap()
      .then(() => {
        Swal.fire("Saved!", "Your mappings have been saved successfully.", "success");
        localStorage.removeItem("persist:ehr");
        setLocalMappings([]);
        dispatch(updateEHRMappingsLocally([]));
        dispatch(fetchEHRSystems()); 
        setEhrName('');
      })
      .catch((error) => {
        Swal.fire("Error!", `Failed to save mappings: ${error}`, "error");
      });

    hasChangesRef.current = false;
  }
};

  return (
    <div className="ehr-form">
      
      <div className="ehr-form__header">
        <h2 className="ehr-form__title">{selectedEhr ? `Edit ${selectedEhr}` : "Add New EHR"}</h2>
        {hasChangesRef.current && (
          <button
            onClick={handleSaveToDB}
            className="ehr-form__save-button"
            aria-label="Save changes"
          >
            <FiSave size={20} /> Save
          </button>
        )}
      </div>

     
      {!selectedEhr && (
        <input
          type="text"
          value={ehrName}
          onChange={(e) => {
            setEhrName(e.target.value);
            hasChangesRef.current = true;
          }}
          placeholder="Enter EHR Name"
          className="ehr-form__input ehr-form__input--name"
        />
      )}

   
      <div className="ehr-form__fields" ref={ehrFieldsContainerRef}>
        {localMappings.map((field, index) => (
          <div key={index} className="ehr-form__field-group">
            <input
              type="text"
              placeholder="Source Field"
              className="ehr-form__field"
              value={field.sourceField}
              onChange={(e) => {
                const updatedMappings = localMappings.map((mapping, i) =>
                  i === index ? { ...mapping, sourceField: e.target.value } : mapping
                );
                setLocalMappings(updatedMappings);
                hasChangesRef.current = true;
                dispatch(updateEHRMappingsLocally(updatedMappings));
              }}
            />
            <input
              type="text"
              placeholder="Target Field"
              className="ehr-form__field"
              value={field.targetField}
              onChange={(e) => {
                const updatedMappings = localMappings.map((mapping, i) =>
                  i === index ? { ...mapping, targetField: e.target.value } : mapping
                );
                setLocalMappings(updatedMappings);
                hasChangesRef.current = true;
                dispatch(updateEHRMappingsLocally(updatedMappings));
              }}
            />
          
            <button
              onClick={() => handleRemoveField(index)}
              className="ehr-form__delete-button"
              aria-label="Delete field"
            >
              <FiTrash2 size={20} />
            </button>
          </div>
        ))}
      </div>


      <button onClick={handleAddField} className="ehr-form__add-button">
        + Add Field
      </button>
    </div>
  );
};

export default EhrForm;
