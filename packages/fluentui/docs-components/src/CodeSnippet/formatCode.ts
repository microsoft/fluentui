import * as _ from 'lodash';
import * as prettier from 'prettier/standalone';

import { CodeSnippetMode, CodeSnippetValue } from './types';

// `prettier` is a CJS library, there are known issues with them:
// https://github.com/rollup/rollup/issues/1267#issuecomment-446681320
// const prettier = (_prettier as any).default || _prettier;

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

export const prettifyCode = async (code: string, parser: 'babel' | 'json' | 'html' | 'typescript') => {
  const formatted = await prettier.format(code, {
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
