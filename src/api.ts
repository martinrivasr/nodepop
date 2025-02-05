import axios from "axios";
import { LoginDto, SignupDto, CreateAdvertDto, Advert, Tag } from "./models/models.ts";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;


export const login = async (data: LoginDto): Promise<string> => {
    const response = await api.post<{ accessToken: string }>("/auth/login", data);
    console.log("Respuesta de la API:", response.data);
    return response.data.accessToken;
  };

export const signup = async (data: SignupDto): Promise<void> => {
    await api.post("/auth/signup", data);
  };

  // Obtener información del usuario autenticado
export const getUserInfo = async (): Promise<void> => {
    await api.get("/auth/me");
  };
  
  // Obtener tags disponibles
  export const getTags = async (): Promise<Tag[]> => {
    const response = await api.get<Tag[]>("/v1/adverts/tags");
    return response.data;
  };
  
 // Crear un anuncio
export const createAdvert = async (data: CreateAdvertDto): Promise<Advert> => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("sale", data.sale.toString());
    formData.append("price", data.price.toString());
    formData.append("tags", JSON.stringify(data.tags));
    if (data.photo) {
      formData.append("photo", data.photo);
    }
  
    const response = await api.post<Advert>("/v1/adverts", formData);
    return response.data;
  };
  
  // Obtener anuncios
  export const getAdverts = async (): Promise<Advert[]> => {
    const response = await api.get<Advert[]>("/v1/adverts");
    return response.data;
  };
  
  // Eliminar un anuncio
  export const deleteAdvert = async (id: string): Promise<void> => {
    await api.delete(`/v1/adverts/${id}`);
  };
  
