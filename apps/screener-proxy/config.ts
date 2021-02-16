import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const CHECK_NAME = process.env.CHECK_NAME || 'FluentUI Screener';
export const GITHUB_APP_ID = parseInt(process.env.GITHUB_APP_ID || '');
export const GITHUB_APP_REPO = process.env.GITHUB_APP_REPO || '';
export const GITHUB_APP_REPO_OWNER = process.env.GITHUB_APP_REPO_OWNER || '';
export const GITHUB_APP_CLIENT_ID = process.env.GITHUB_APP_CLIENT_ID || '';
export const GITHUB_APP_CLIENT_SECRET = process.env.GITHUB_APP_CLIENT_SECRET || '';
export const GITHUB_APP_WEBHOOK_SECRET = process.env.GITHUB_APP_WEBHOOK_SECRET || '';
export const GITHUB_APP_PRIVATE_KEY = process.env.GITHUB_APP_PRIVATE_KEY || '';
