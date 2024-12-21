import axios from "axios";
import { baseURL } from "./BaseUrl";

// Création d'une instance Axios avec une configuration de base
const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Intercepteur pour les requêtes
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    // Gestion des erreurs de réponse
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Non autorisé - Redirection vers login
          window.location.href = "/login";
          break;
        case 403:
          console.error("Accès interdit");
          break;
        case 404:
          console.error("Ressource non trouvée", error);
          break;
        case 429:
          console.error("Trop de tentatives, veuillez réessayer plus tard");
          break;
        case 500:
          console.error("Erreur serveur");
          break;
        default:
          console.error("Une erreur est survenue");
      }
    } else if (error.request) {
      console.error("Pas de réponse du serveur", error);
    } else {
      console.error("Erreur de configuration:", error.message);
    }
    return Promise.reject(error);
  }
);

// Export des méthodes HTTP communes
export const api = {
  get: <T>(url: string, config = {}) => apiClient.get<T>(url, config),

  post: <T>(url: string, data = {}, config = {}) =>
    apiClient.post<T>(url, data, config),

  put: <T>(url: string, data = {}, config = {}) =>
    apiClient.put<T>(url, data, config),

  delete: <T>(url: string, config = {}) => apiClient.delete<T>(url, config),

  patch: <T>(url: string, data = {}, config = {}) =>
    apiClient.patch<T>(url, data, config),
};
