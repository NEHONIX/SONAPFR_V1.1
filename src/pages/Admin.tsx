import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ReplyModal } from "../components/ReplyModal";
import { api } from "../Interceptor/ApiBase";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import "./Style/Admin.css";
import { FormSubmission } from "./Interfaces/FormSubmission";

// Fonction pour formater la date Firestore
const formatFirestoreDate = (timestamp: any) => {
  if (!timestamp) return "";
  
  // Conversion du timestamp Firestore en Date
  const date = new Date(timestamp._seconds * 1000);
  
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function Admin() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("all");
  const [selectedSubmission, setSelectedSubmission] =
    useState<FormSubmission | null>(null);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  // Vérification de l'authentification
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/auth/check");
      } catch (error) {
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  // Récupération des soumissions
  const {
    data: submissions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["submissions"],
    queryFn: async () => {
      const response = (await api.get("forms")).data as any;
      return response.forms;
    },
  });

  // Mutation pour mettre à jour le statut
  const updateStatusMutation = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: "new" | "read" | "replied";
    }) => {
      await api.patch(`form/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      toast({
        title: "Statut mis à jour",
        description: "Le statut du message a été mis à jour avec succès.",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description:
          "Une erreur est survenue lors de la mise à jour du statut.",
        variant: "destructive",
      });
    },
  });

  // Mutation pour envoyer une réponse
  const sendReplyMutation = useMutation({
    mutationFn: async ({ id, reply }: { id: string; reply: string }) => {
      await api.post(`form/${id}/reply`, { reply });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      toast({
        title: "Réponse envoyée",
        description: "Votre réponse a été envoyée avec succès.",
      });
      setIsReplyModalOpen(false);
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de la réponse.",
        variant: "destructive",
      });
    },
  });

  const handleStatusChange = (
    id: string,
    newStatus: "new" | "read" | "replied"
  ) => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  const handleReplyClick = (submission: FormSubmission) => {
    setSelectedSubmission(submission);
    setIsReplyModalOpen(true);
  };

  const handleSendReply = async (replyText: string) => {
    if (selectedSubmission) {
      // await sendReplyMutation.mutateAsync({
      //   id: selectedSubmission.id,
      //   reply: replyText,
      // });
      handleStatusChange(selectedSubmission.id, "replied");
    }
  };

  const filteredSubmissions: FormSubmission[] =
    filter === "all"
      ? submissions
      : submissions.filter((sub) => sub.status === filter);

  if (isLoading) {
    return <div className="loading">Chargement des messages...</div>;
  }

  if (error) {
    return (
      <div className="error">
        Une erreur est survenue lors du chargement des messages.
        <button
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ["submissions"] })
          }
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="admin-title">
          <h1>Panneau d'Administration</h1>
        </div>
        <div className="admin-filters">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="admin-select"
          >
            <option value="all">Tous les messages</option>
            <option value="new">Nouveaux</option>
            <option value="read">Lus</option>
            <option value="replied">Répondus</option>
          </select>
        </div>
      </div>

      <div className="submissions-grid">
        {filteredSubmissions.map((submission) => (
          <div
            key={submission.id}
            className={`submission-card status-${submission.status}`}
          >
            <div className="submission-header">
              <h3>{submission.nom}</h3>
              <span className="submission-date">
                {formatFirestoreDate(submission.dateCreation)}
              </span>
            </div>
            <div className="submission-content">
              <p>
                <strong>Email:</strong> {submission.email}
              </p>
              <p>
                <strong>Téléphone:</strong> {submission.telephone}
              </p>
              <p>
                <strong>Service:</strong> {submission.service}
              </p>
              <p className="message">
                <strong>Message:</strong> {submission.message}
              </p>
            </div>
            <div className="submission-actions">
              <select
                value={submission.status}
                onChange={(e) =>
                  handleStatusChange(
                    submission.id,
                    e.target.value as "new" | "read" | "replied"
                  )
                }
                className="status-select"
              >
                <option value="new">Nouveau</option>
                <option value="read">Lu</option>
                <option value="replied">Répondu</option>
              </select>
              <button
                className="reply-button"
                onClick={() => handleReplyClick(submission)}
              >
                Répondre
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedSubmission && (
        <ReplyModal
          isOpen={isReplyModalOpen}
          onClose={() => setIsReplyModalOpen(false)}
          submission={selectedSubmission}
          onSend={handleSendReply}
        />
      )}
    </div>
  );
}
