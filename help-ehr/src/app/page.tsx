import Link from "next/link";
import "@/styles/home.css";
import Footer from "@/components/ui/Footer";


export default function Home() {
  return (
    <div className="home">
      {/* Header */}
      <header className="home__header">
        <h1 className="home__title">Welcome to EHR System Manager</h1>
        <p className="home__subtitle">
          A platform for managing Electronic Health Record (EHR) data mappings.
        </p>
      </header>

      {/* Main Content */}
      <main className="home__content">
        <div className="home__buttons">
          {/* Login Button */}
          <Link href="/auth/login" className="home__button">
            Get Started
          </Link>

          {/* Dashboard Button */}
          <Link href="/dashboard" className="home__button">
            Go to Dashboard
          </Link>
        </div>

        {/* Feature Section */}
        <section className="home__section">
          <h2 className="home__section-title">Why Use EHR System Manager?</h2>
          <p className="home__section-text">
            Easily manage mappings between different Electronic Health Record
            (EHR) systems to ensure seamless healthcare data interoperability.
          </p>
        </section>

        {/* Features Grid */}
        <div className="home__features">
          <div className="home__feature-card">
            <h3 className="home__feature-title">🔄 Standardized Mapping</h3>
            <p className="home__feature-text">
              Unify patient records across different EHR providers like Athena,
              Meditech, and Allscripts.
            </p>
          </div>

          <div className="home__feature-card">
            <h3 className="home__feature-title">📊 Data Integrity</h3>
            <p className="home__feature-text">
              Ensure that patient data is accurately translated between systems
              without loss or corruption.
            </p>
          </div>

          <div className="home__feature-card">
            <h3 className="home__feature-title">🔐 Secure Authentication</h3>
            <p className="home__feature-text">
              Use secure JWT-based authentication to protect patient and
              provider data.
            </p>
          </div>

          <div className="home__feature-card">
            <h3 className="home__feature-title">🚀 Fast & Scalable</h3>
            <p className="home__feature-text">
              Designed for performance and scalability, capable of handling
              thousands of EHR transactions.
            </p>
          </div>
        </div>
      </main>
  

      {/* Footer */}
      <Footer/>
    </div>
  );
}
