const env = import.meta.env;

const API_URL = env.API_URL;
const IS_DEV = env.DEV;

if (!API_URL) throw new Error("API_URL is not defined");

export { API_URL, IS_DEV };
