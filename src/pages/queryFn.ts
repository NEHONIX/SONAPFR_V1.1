import { api } from "@/Interceptor/ApiBase";

export async function FetchSubmissionsQuery() {
  async () => {
    const response = await api.get("/get-all-forms");
    return response.data;
  };
}
