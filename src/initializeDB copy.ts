import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

async function initializeAPI() {
  try {
    console.log('Inicializando la base de datos mediante la API...');

    // Datos de ejemplo
    const productNames = [
      'Laptop', 'TV', 'Mobile', 'Cama', 'Tablet', 'Escritorio', 'Silla', 'Lámpara', 
      'Monitor', 'Reloj', 'Bicicleta', 'Mochila', 'Teléfono', 'Cámara', 'Impresora', 
      'Auriculares', 'Ventilador', 'Microondas', 'Cafetera', 'Tostadora'
    ];

    const tags = ['work', 'lifestyle', 'motor', 'mobile'];

    // Crear usuarios
    const users = Array.from({ length: 10 }).map((_, i) => ({
      email: `user${i + 20}@example.com`,
      name: `User ${i + 20}`,
      password: '1234',
      username: `User ${i + 20}`
    }));

    for (const user of users) {
      console.log (user)
      await axios.post(`${API_BASE_URL}/auth/signup`, user);
    }
    console.log(`Usuarios creados: ${users.length}`);

    // Función para generar productos aleatorios
    const getRandomProducts = (userId: string, min: number, max: number) => {
      const numProducts = Math.floor(Math.random() * (max - min + 1)) + min;
      return Array.from({ length: numProducts }).map(() => {
        const randomName = productNames[Math.floor(Math.random() * productNames.length)];
        const randomTags = tags.slice(0, Math.floor(Math.random() * tags.length) + 1);
        return {
          name: randomName,
          price: Math.floor(Math.random() * 2000) + 1,
          tags: randomTags,
          sale: Math.random() > 0.5,
          owner: userId
        };
      });
    };

    // Crear productos por usuario
    const createdUsers = await axios.get(`${API_BASE_URL}/auth/signup`);
    const userIds = createdUsers.data.map((user: any) => user.id);

    const allProducts = [];

    // 5 usuarios con 1-3 productos
    for (let i = 0; i < 5; i++) {
      const products = getRandomProducts(userIds[i], 1, 3);
      allProducts.push(...products);
    }

    // 3 usuarios con 14-20 productos
    for (let i = 5; i < 8; i++) {
      const products = getRandomProducts(userIds[i], 14, 20);
      allProducts.push(...products);
    }

    // 2 usuarios con 30 productos
    for (let i = 8; i < 10; i++) {
      const products = getRandomProducts(userIds[i], 30, 30);
      allProducts.push(...products);
    }

    // Enviar los productos a la API
    for (const product of allProducts) {
      await axios.post(`${API_BASE_URL}/adverts`, product);
    }
    console.log(`Productos creados: ${allProducts.length}`);
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
