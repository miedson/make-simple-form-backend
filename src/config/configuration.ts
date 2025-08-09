export interface EnvironmentVariables {
  environment: string;
  app_name: string;
  app_port: number;
  app_url: string;
  database: {
    host: string;
    port: number;
    dbname: string;
    username: string;
    password: string;
  };
  me: {
    port: number;
    username: string;
    password: string;
  };
  traefik: {
    entrypoint: string;
    certresolver: string;
  };
}

export default () => ({
  port: parseInt(String(process.env.APP_PORT)) || 3000,
  database: {
    host: process.env.MONGODB_SERVER,
    port: parseInt(String(process.env.MONGODB_PORT)) || 27017,
    dbname: process.env.MONGODB_DATABASE,
    username: process.env.MONGODB_ROOT_USERNAME,
    password: process.env.MONGODB_ROOT_PASSWORD,
  },
});
