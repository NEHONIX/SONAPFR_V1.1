import { formSchema } from "./Schema/ContacFormS";
import { api } from "../Interceptor/ApiBase";
import { z } from "zod";

export async function onSubmitData(data: z.infer<typeof formSchema>) {
  try {
    const response = await api.post("form", data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error:
        error.response?.data?.message ||
        "Une erreur est survenue lors de l'envoi du formulaire",
    };
  }
}
