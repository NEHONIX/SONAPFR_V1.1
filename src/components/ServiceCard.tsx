import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export function ServiceCard({ title, description, Icon }: ServiceCardProps) {
  return (
    <div className="service-card">
      <div className="service-header">
        <Icon className="service-icon" />
        <h3 className="service-title">{title}</h3>
      </div>
      <p className="service-description">{description}</p>
    </div>
  );
}