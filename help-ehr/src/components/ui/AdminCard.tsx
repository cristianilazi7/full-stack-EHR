"use client";

import Link from "next/link";

interface AdminCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

const AdminCard: React.FC<AdminCardProps> = ({ title, description, href, icon }) => {
  return (
    <Link href={href} className="admin-card">
      <div className="admin-card__icon">{icon}</div>
      <h3 className="admin-card__title">{title}</h3>
      <p className="admin-card__description">{description}</p>
    </Link>
  );
};

export default AdminCard;
