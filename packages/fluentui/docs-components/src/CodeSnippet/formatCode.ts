import * as _ from 'lodash';
import * as _prettier from 'prettier/standalone';

import * as babel from 'prettier/parser-babel';
import * as html from 'prettier/parser-html';
import * as typescript from 'prettier/parser-typescript';

import { CodeSnippetMode, CodeSnippetValue } from './types';

// `prettier` is a CJS library, there are known issues with them:
// https://github.com/rollup/rollup/issues/1267#issuecomment-446681320
const prettier = (_prettier as any).default || _prettier;

const prettierConfig = {
  htmlWhitespaceSensitivity: 'ignore',
  printWidth: 100,
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  plugins: {
    babel,
    html,
    typescript,
  },
};

const normalizeToString = (value: CodeSnippetValue): string => {
  if (Array.isArray(value)) return value.join('\n');
  return _.isObject(value) ? JSON.stringify(value, null, 2) : (value as string);
};

export const prettifyCode = (code: string, parser: 'babel' | 'json' | 'html' | 'typescript') => {
  const formatted = prettier.format(code, {
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
