

// Modelo para SignupDto
export interface SignupDto {
    email: string;
    password: string;
    username: string;
    name: string;
  }
  
  // Modelo para LoginDto
  export interface LoginDto {
    email: string;
    password: string;
  }
  
  // Modelo para CreateAdvertDto
  export interface CreateAdvertDto {
    name: string;
    sale: boolean;
    price: number;
    tags: string[];
    photo?: File | null; 
  }
  
  // Modelo para el esquema de tags
  export type Tag = "lifestyle" | "mobile" | "motor" | "work";
  
  // Respuesta para Advert
  export interface Advert {
    id: string;
    name: string;
    owner?: string;
    ownerName?: string; // Nuevo campo para mostrar el nombre
    sale: boolean;
    price: number;
    tags: Tag[];
    photoUrl?: string;
  }

  export interface FiltersType {
    tag?: string;
    minPrice?: string;
    maxPrice?: string;
    name?: string;
    owner?: string;
  }
  