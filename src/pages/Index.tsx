import { Leaf, Sprout, Users, FileSpreadsheet, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import AdditionnalOpt from "./AdditionnalOpt";

const services = [
  {
    title: "Production maraîchère",
    description: "Conseils experts pour optimiser votre production maraîchère",
    Icon: Leaf
  },
  {
    title: "Consultance en agriculture",
    description: "Accompagnement personnalisé pour vos projets agricoles",
    Icon: Sprout
  },
  {
    title: "Formation en éducation financière",
    description: "Formations pour une meilleure gestion financière de votre exploitation",
    Icon: Users
  },
  {
    title: "Élaboration de projets agricoles",
    description: "Aide à la conception et au développement de vos projets",
    Icon: FileSpreadsheet
  },
  {
    title: "Commercialisation de produits agricoles",
    description: "Stratégies pour la vente et la distribution de vos produits",
    Icon: ShoppingCart
  }
];

export default function Index() {
  return (
    <div>
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Expertise Agricole</h1>
          <p className="hero-description">
            Votre partenaire de confiance pour le développement agricole durable
          </p>
          <Link to="/contact" className="button button-primary">
            Contactez-nous
          </Link>
        </div>
      </section>

      <section className="services-section">
        <div className="container">
          <h2 className="services-title">Nos Services</h2>
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.title} className="service-card">
                <div className="service-header">
                  <service.Icon className="service-icon" />
                  <h3 className="service-title">{service.title}</h3>
                </div>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdditionnalOpt />
    </div>
  );
}