import type * as monacoApi from 'monaco-editor/esm/vs/editor/editor.api';
import type { Options } from 'prettier';

type Monaco = typeof monacoApi;

/** Mirrors the repository `prettier.config.js`. */
export const PRETTIER_OPTIONS: Options = {
  printWidth: 120,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
};

/**
 * Formats TSX source with Prettier. Prettier and its TypeScript parser are loaded on first use (separate chunk).
 */
export async function formatCode(code: string): Promise<string> {
  const [prettier, { default: typescriptParser }] = await Promise.all([
    import(/* webpackChunkName: "prettier" */ 'prettier/standalone'),
    import(/* webpackChunkName: "prettier" */ 'prettier/parser-typescript'),
  ]);

  return prettier.format(code, { ...PRETTIER_OPTIONS, parser: 'typescript', plugins: [typescriptParser] });
}

export interface FormatterOptions {
  /** Called when formatting fails, e.g. because of a syntax error. */
  onError?: (error: Error) => void;
}

/**
 * Registers Prettier as the document formatter for TypeScript models (`Shift+Alt+F` / "Format Document").
 */
export function registerFormatter(monaco: Monaco, options: FormatterOptions = {}): monacoApi.IDisposable {
  return monaco.languages.registerDocumentFormattingEditProvider('typescript', {
    displayName: 'Prettier',
    async provideDocumentFormattingEdits(model) {
      const text = model.getValue();

      try {
        const formatted = await formatCode(text);

        return formatted === text ? [] : [{ range: model.getFullModelRange(), text: formatted }];
      } catch (error) {
        options.onError?.(error instanceof Error ? error : new Error(String(error)));
        return [];
      }
    },
  });
}
