"use client";

import { ReactNode } from "react";
import Footer from "@/components/ui/Footer";
import AuthGuard from "@/utils/guards/authGuard";
import "@/styles/dashboard.css";
import Nav from "@/components/ui/Nav";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthGuard>
      <Nav />
      <div className="dashboard">
        {/* Dynamic Content (Based on Route) */}
        <section className="dashboard__content">{children}</section>
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default DashboardLayout;
