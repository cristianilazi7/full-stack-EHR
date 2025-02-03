"use client";


import AdminCard from "@/components/ui/AdminCard";
import { FiSettings, FiUser, FiDatabase, FiUsers, FiUserCheck } from "react-icons/fi"; // Icons for visual representation

const adminSections = [
    {
      title: "EHR Management",
      description: "Manage mappings between different Electronic Health Records (EHR) systems.",
      href: "/dashboard/ehr-management",
      icon: <FiDatabase size={24} />,
    },
    {
      title: "Admin Patients",
      description: "Manage patient records, add, edit, or remove patient details.",
      href: "/dashboard/admin-patients",
      icon: <FiUsers size={24} />,
    },
    {
      title: "Admin Doctors",
      description: "Manage doctor records, permissions, and associated data.",
      href: "/dashboard/admin-doctors",
      icon: <FiUserCheck size={24} />,
    },
    {
      title: "Settings",
      description: "Configure system settings and manage permissions.",
      href: "/dashboard/admin-settings",
      icon: <FiSettings size={24} />,
    },
    {
      title: "Profile",
      description: "View and update your personal profile information.",
      href: "/dashboard/admin-profile",
      icon: <FiUser size={24} />,
    },
  ];

const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard__content">
      <h2 className="dashboard__ehr-title">Admin Dashboard</h2>
      <p className="dashboard__ehr-subtitle">
        Manage and configure system settings.
      </p>

      {/* Admin Sections Grid */}
      <div className="dashboard__grid">
        {adminSections.map((section) => (
          <AdminCard
            key={section.title}
            title={section.title}
            description={section.description}
            href={section.href}
            icon={section.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
