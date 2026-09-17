import * as prettier from 'prettier';

/**
 * Formats generated TypeScript or CSS with the repo prettier config (deterministic).
 */
export function formatGenerated(source: string, filepath: string): string {
  return prettier.format(source, {
    filepath,
    parser: filepath.endsWith('.css') ? 'css' : 'typescript',
    printWidth: 120,
    singleQuote: true,
    trailingComma: 'all',
    arrowParens: 'avoid',
  });
}
