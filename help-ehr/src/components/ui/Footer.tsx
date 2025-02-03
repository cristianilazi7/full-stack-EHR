import Image from "next/image";
import "@/styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__text">
        &copy; {new Date().getFullYear()} CRISTIAN CASTRO ARIAS. All rights reserved.
      </p>
      <a
        className="footer__link"
        href="https://github.com/cristianilazi7/full-stack-EHR"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/github.svg"
          alt="GitHub icon"
          width={16}
          height={16}
        />
        View Repository
      </a>
    </footer>
  );
};

export default Footer;
