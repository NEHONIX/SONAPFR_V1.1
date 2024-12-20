import { Leaf, Sprout, Users, FileSpreadsheet, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/ServiceCard";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen">
      <div className="hero-section h-[60vh] flex items-center justify-center text-white">
        <div className="text-center space-y-6 p-4">
          <h1 className="text-4xl md:text-6xl font-bold">Expertise Agricole</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Votre partenaire de confiance pour le développement agricole durable
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link to="/contact">Contactez-nous</Link>
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Nos Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}