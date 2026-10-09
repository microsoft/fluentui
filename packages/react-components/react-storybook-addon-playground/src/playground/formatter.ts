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

export type FormatLanguage = 'typescript' | 'css';

/**
 * Formats TSX or CSS source with Prettier. Parsers are loaded on first use (separate chunks).
 */
export async function formatCode(code: string, language: FormatLanguage = 'typescript'): Promise<string> {
  if (language === 'css') {
    const [prettier, { default: postcssParser }] = await Promise.all([
      import(/* webpackChunkName: "prettier" */ 'prettier/standalone'),
      import(/* webpackChunkName: "prettier" */ 'prettier/parser-postcss'),
    ]);

    return prettier.format(code, { ...PRETTIER_OPTIONS, parser: 'css', plugins: [postcssParser] });
  }

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

function registerLanguageFormatter(
  monaco: Monaco,
  language: FormatLanguage,
  options: FormatterOptions,
): monacoApi.IDisposable {
  return monaco.languages.registerDocumentFormattingEditProvider(language, {
    displayName: 'Prettier',
    async provideDocumentFormattingEdits(model) {
      const text = model.getValue();

      try {
        const formatted = await formatCode(text, language);

        return formatted === text ? [] : [{ range: model.getFullModelRange(), text: formatted }];
      } catch (error) {
        options.onError?.(error instanceof Error ? error : new Error(String(error)));
        return [];
      }
    },
  });
}

/**
 * Registers Prettier as the document formatter for TypeScript and CSS (`Shift+Alt+F` / "Format Document").
 */
export function registerFormatter(monaco: Monaco, options: FormatterOptions = {}): monacoApi.IDisposable {
  const typescript = registerLanguageFormatter(monaco, 'typescript', options);
  const css = registerLanguageFormatter(monaco, 'css', options);

  return {
    dispose() {
      typescript.dispose();
      css.dispose();
    },
  };
}
