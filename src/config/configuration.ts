import * as dotenv from 'dotenv';
import * as process from 'node:process';
dotenv.config();

export const env = {
  HOST_PORT: process.env.HOST_PORT,

  DATABASE_URL: process.env.DATABASE_URL,
  DOCKER_CONTAINER_NAME: process.env.DOCKER_CONTAINER_NAME,
  DOCKER_USER: process.env.DOCKER_USER,
  DOCKER_PASSWORD: process.env.DOCKER_PASSWORD,
  DOCKER_DB: process.env.DOCKER_DB,
  DOCKER_PORT: parseInt(process.env.DOCKER_PORT || '5432', 10),

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,

  ROLES_KEY: process.env.ROLES_KEY,
  ROLE_USER_ID: process.env.ROLE_USER_ID,
  ROLE_USER_NAME: process.env.ROLE_USER_NAME,
};
