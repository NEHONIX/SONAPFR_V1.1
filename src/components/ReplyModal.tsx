import { useState } from 'react';
import './Style/ReplyModal.css';
import { FormSubmission } from '@/pages/Interfaces/FormSubmission';
import { toast } from 'react-toastify';

interface ReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: FormSubmission;
  onSend: (replyText: string) => void;
}

export function ReplyModal({ isOpen, onClose, submission, onSend }: ReplyModalProps) {
  const [replyText, setReplyText] = useState('');

  if (!isOpen) return null;
if(submission){
  console.log(submission);
}


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const messageBody = `Bonjour ${submission.nom},\n\n${replyText}\n\nMessage original :\n${submission.message}\n\nCordialement,\nSONAPFR`;
    
    if (submission.WhatsAppPhone) {
      // Formater le numéro WhatsApp (enlever les espaces et s'assurer qu'il commence par le code pays)
      const whatsappNumber = submission.WhatsAppPhone.replace(/\s+/g, '');
      const formattedNumber = whatsappNumber.startsWith('+') ? whatsappNumber.substring(1) : whatsappNumber;
      
      // Créer le lien WhatsApp avec le message préformaté
      const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(messageBody)}`;
      
      // Ouvrir WhatsApp
      window.open(whatsappUrl, '_blank');
      toast.success("Redirection vers WhatsApp...");
    } else {
      // Fallback vers l'email si pas de WhatsApp
      const subject = `Re: Message de ${submission.nom}`;
      const mailtoUrl = `mailto:${submission.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(messageBody)}`;
      window.location.href = mailtoUrl;
      toast.info("Ouverture du client mail...");
    }
    
    // Mettre à jour le statut et fermer le modal
    onSend(replyText);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Répondre à {submission.nom}</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          <div className="original-message">
            <h3>Message original :</h3>
            <p>{submission.message}</p>
            <p className="contact-info">
              {submission.WhatsAppPhone ? (
                <span className="whatsapp-badge">Via WhatsApp: {submission.WhatsAppPhone}</span>
              ) : (
                <span className="email-badge">Via Email: {submission.email}</span>
              )}
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="reply">Votre réponse :</label>
              <textarea
                id="reply"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Écrivez votre réponse ici..."
                rows={6}
                required
              />
            </div>
            
            <div className="modal-footer">
              <button type="button" className="cancel-button" onClick={onClose}>
                Annuler
              </button>
              <button type="submit" className="send-button">
                {submission.WhatsAppPhone ? 'Répondre via WhatsApp' : 'Répondre via Email'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
