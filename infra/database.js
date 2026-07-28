import { Client } from "pg";

async function query(queryObject) {
  let client;

  try {
    client = await getNewClient();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error("Erro ao executar query:", error);
    throw error;
  } finally {
    if (client) {
      await client.end();
    }
  }
}

async function getNewClient() {
  console.log({
    NODE_ENV: process.env.NODE_ENV,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_USER: process.env.POSTGRES_USER,
  });

  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === "production",
  });

  await client.connect();

  return client;
}

export default {
  query,
  getNewClient,
};
