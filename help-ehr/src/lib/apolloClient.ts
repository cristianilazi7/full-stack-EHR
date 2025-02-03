import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 🔹 Enlace HTTP para GraphQL
const httpLink = createHttpLink({
  uri: `${API_URL}/graphql`,
  credentials: "include", // Si usas autenticación con cookies
});

// 🔹 Middleware para añadir el token desde Redux Persist
const authLink = setContext(async (_, { headers }) => {
  try {
    // Obtener los datos persistidos de Redux
    const persistedAuth = localStorage.getItem("persist:auth");

    if (!persistedAuth) {
      console.warn("🚨 No hay persist:auth en localStorage");
      return { headers };
    }

    // Parsear los datos para extraer el token
    const parsedAuth = JSON.parse(persistedAuth);
    const token = parsedAuth.token ? JSON.parse(parsedAuth.token) : null;

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  } catch (error) {
    console.error("Error obteniendo el token desde Redux Persist:", error);
    return { headers };
  }
});

// 🔹 Configuración de Apollo Client
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink), // Enlazar authLink con httpLink
  cache: new InMemoryCache(),
});
