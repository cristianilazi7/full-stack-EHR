"use client";
import "@/styles/adminDoctorsPatients.css";

const AdminPatientsPage: React.FC = () => {
  return (
    <div className="admin-page">
      <h2 className="admin-page__title">Manage Patients</h2>
      <p className="admin-page__description">Add, edit, or remove patient records.</p>
    </div>
  );
};

export default AdminPatientsPage;
