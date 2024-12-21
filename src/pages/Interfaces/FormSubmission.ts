export interface FormSubmission {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  WhatsAppPhone: string;
  service: string;
  message: string;
  dateCreation: string;
  dateModification: string;
  status: "new" | "read" | "replied";
}


