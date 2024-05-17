import * as _ from 'lodash';
import * as _prettierSync from '@prettier/sync';

import { CodeSnippetMode, CodeSnippetValue } from './types';

// `_prettierSync` is a ESM library but ships only CJS format, there are known issues with them:
// https://github.com/rollup/rollup/issues/1267#issuecomment-446681320
const prettierSync = (_prettierSync as any).default || _prettierSync;

const prettierConfig = {
  htmlWhitespaceSensitivity: 'ignore' as const,
  printWidth: 100,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  trailingComma: 'all' as const,
};

const normalizeToString = (value: CodeSnippetValue): string => {
  if (Array.isArray(value)) return value.join('\n');
  return _.isObject(value) ? JSON.stringify(value, null, 2) : (value as string);
};

export const prettifyCode = (code: string, parser: 'babel' | 'json' | 'html' | 'typescript') => {
  const formatted = prettierSync.format(code, {
    ...prettierConfig,
    // a narrower print width is more friendly to doc examples
    parser,
  });

  return formatted.replace(/^;</m, '<'); // remove beginning semi in JSX/HTML
};

const formatters = {
  bash: (val: string = ''): string => val.replace(/^/g, '$  '),
  json: (val: string): string => prettifyCode(val, 'json'),
  js: (val: string = ''): string => prettifyCode(val, 'babel'),
  jsx: (val: string = ''): string => prettifyCode(val, 'babel'),
  html: (val: string = ''): string => prettifyCode(val, 'html'),
};

export const formatCode = (code: CodeSnippetValue, mode: CodeSnippetMode) => {
  if (!code) return '';
  const formatter: Function = formatters[mode];

  return (
    formatter(normalizeToString(code))
      // remove eof line break, they are not helpful for snippets
      .replace(/\n$/, '')
  );
};
