import { logger } from '@nx/devkit';
import ejs from 'ejs';
import fs from 'fs';
/**
 * Similar to @nx/devkit#generateFiles function but for getting content only
 *
 * @param src - the source folder of files (absolute path)
 * @param substitutions - an object of key-value pairs
 * @returns
 */
export function getTemplate(src: string, substitutions: Record<string, unknown>) {
  if (!fs.existsSync(src)) {
    throw new Error(`${src} doesn't exists`);
  }

  const template = fs.readFileSync(src, 'utf8').trim();

  if (!substitutions) {
    return template;
  }

  try {
    const content = ejs.render(template, substitutions, {});

    return content;
  } catch (err) {
    logger.error(`Error in ${src}:`);
    throw err;
  }
}

export function uniqueArray<T extends unknown>(value: T[]) {
  return Array.from(new Set(value));
}
