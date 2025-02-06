import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const API_BASE_URL = process.env.VITE_API_BASE_URL || "http://localhost:3001/api";

// Lista de usuarios que vamos a crear
const users = [
  { email: "useruario11d@example.com", name: "User11d", password: "1234", username: "User11d" },
  { email: "useruario12@example.com", name: "User12", password: "1234", username: "User12" },
  { email: "useruario13@example.com", name: "User13", password: "1234", username: "User13" },
  { email: "useruario14@example.com", name: "User14", password: "1234", username: "User14" },
  { email: "useruario15@example.com", name: "User15", password: "1234", username: "User15" },
  { email: "useruario16@example.com", name: "User16", password: "1234", username: "User16" },
  { email: "useruario17@example.com", name: "User17", password: "1234", username: "User17" },
  { email: "useruario18@example.com", name: "User18", password: "1234", username: "User18" },
  { email: "useruario19@example.com", name: "User19", password: "1234", username: "User19" },
  { email: "useruario19a@example.com", name: "User19a", password: "1234", username: "User19a" },
];

// Lista de productos de ejemplo
const productNames = [
  "Laptop", "TV", "Mobile", "Cama", "Tablet", "Escritorio", "Silla", "Lámpara",
  "Monitor", "Reloj", "Bicicleta", "Mochila", "Teléfono", "Cámara", "Impresora",
  "Auriculares", "Ventilador", "Microondas", "Cafetera", "Tostadora"
];

const tags = ["work", "lifestyle", "motor", "mobile"];

// Función para generar productos aleatorios
const getRandomProducts = ( min: number, max: number) => {
  const numProducts = Math.floor(Math.random() * (max - min + 1)) + min;
  return Array.from({ length: numProducts }).map(() => {
    const randomName = productNames[Math.floor(Math.random() * productNames.length)];
    const randomTags = tags.slice(0, Math.floor(Math.random() * tags.length) + 1);
    return {
      name: randomName,
      sale: Math.random() > 0.5,
      price: Math.floor(Math.random() * 2000) + 1,
      tags: randomTags,
    };
  });
};

// Función principal para inicializar la API
async function initializeAPI() {
  try {
    console.log("Inicializando la base de datos mediante la API...");

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      console.log("usuario a crear", user)
      // 1️⃣ Crear usuario
      await axios.post(`${API_BASE_URL}/auth/signup`, user);
      console.log(`Usuario creado: ${user.email}`);

      // 2️⃣ Iniciar sesión para obtener token
      const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: user.email,
        password: user.password,
      });

      const token = loginResponse.data.accessToken;
      console.log(`Token generado para ${user.email}: ${token}`);

      // 3️⃣ Definir la cantidad de productos según las reglas
      let minProducts, maxProducts;

      if (i < 5) {
        minProducts = 1;
        maxProducts = 3;
      } else if (i < 8) {
        minProducts = 14;
        maxProducts = 20;
      } else {
        minProducts = 30;
        maxProducts = 30;
      }

      // 4️⃣ Crear productos para este usuario
      console.log("productos minimos", minProducts)
      const products = getRandomProducts( minProducts, maxProducts);
      console.log("productos", products)
      for (const product of products) {
        await axios.post(`${API_BASE_URL}/v1/adverts`, product, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      console.log(`Productos creados para ${user.email}: ${products.length}`);
    }

    console.log("✅ Inicialización completada correctamente.");

  } catch (error) {
    if (error.response) {
      console.error("🔴 Status:", error.response.status);
      console.error("📄 Data:", JSON.stringify(error.response.data, null, 2));
      console.error("📌 Headers:", JSON.stringify(error.response.headers, null, 2));
    } else if (error.request) {
      console.error("🔴 No hubo respuesta de la API.");
    } else {
      console.error("🔴 Error en el código:", error.message);
    }
  }
}

initializeAPI();
