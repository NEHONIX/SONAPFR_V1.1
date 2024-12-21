import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, PhoneCall, PhoneForwarded, PhoneIncoming } from "lucide-react";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">À propos de SONAPFR</h3>
          <p className="footer-description">
            SONAPFR est votre partenaire de confiance pour le développement agro-pastoral 
            et le financement rural en Côte d'Ivoire.
          </p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Liens rapides</h3>
          <ul className="footer-links">
            <li><Link to="/">Accueil</Link></li>
            {/* <li><Link to="/services">Services</Link></li> */}
            {/* <li><Link to="/about">À propos</Link></li> */}
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contact</h3>
          <ul className="footer-contact">
            <li>
              <MapPin className="footer-icon" />
              <span>Abidjan, Côte d'Ivoire</span>
            </li>
            <li>
              <Phone className="footer-icon" />
              <span>+225 01 51 08 75 09</span>
            </li>
            <li>
              <Mail className="footer-icon" />
              <span>support@nehonix.space</span>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Nos Numéros</h3>
          <div className="footer-phones">
            <a href="tel:+22505010347" className="phone-link">
              <PhoneCall className="phone-icon" />
              <span>+225 05 01 03 47 61</span>
            </a>
            <a href="tel:+22507176317" className="phone-link">
              <PhoneIncoming className="phone-icon" />
              <span>+225 07 17 63 17 00</span>
            </a>
            <a href="tel:+22527347708" className="phone-link">
              <PhoneForwarded className="phone-icon" />
              <span>+225 27 34 77 08 58</span>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SONAPFR. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
