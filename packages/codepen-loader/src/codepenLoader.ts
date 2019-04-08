import { transform } from './codepenTransform';

export function codepenLoader(source: string): string {
  return `module.exports = ${JSON.stringify(transform(source))}`;
}
