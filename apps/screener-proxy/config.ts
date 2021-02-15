import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const GITHUB_APP_ID = parseInt(process.env.GITHUB_APP_ID || '');
export const GITHUB_APP_PRIVATE_KEY = process.env.GITHUB_APP_PRIVATE_KEY || '';
export const GITHUB_APP_CLIENT_ID = process.env.GITHUB_APP_CLIENT_ID || '';
export const GITHUB_APP_CLIENT_SECRET = process.env.GITHUB_APP_CLIENT_SECRET || '';
