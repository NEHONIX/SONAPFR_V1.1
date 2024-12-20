import { ContactForm } from "@/components/ContactForm";

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1 className="contact-title">Contactez-nous</h1>
        <p className="contact-description">
          Nous sommes là pour répondre à vos questions et vous accompagner dans vos projets agricoles.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}