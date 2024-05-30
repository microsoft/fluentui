import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

export const getFilename = () => fileURLToPath(import.meta.url);
export const getDirname = () => dirname(getFilename());
