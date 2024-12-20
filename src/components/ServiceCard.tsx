import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export function ServiceCard({ title, description, Icon }: ServiceCardProps) {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className="h-6 w-6 text-primary" />
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}