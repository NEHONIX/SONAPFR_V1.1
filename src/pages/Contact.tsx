import { ContactForm } from "@/components/ContactForm";

export default function Contact() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Contactez-nous</h1>
        <p className="text-center text-muted-foreground mb-8">
          Nous sommes là pour répondre à vos questions et vous accompagner dans vos projets agricoles.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}