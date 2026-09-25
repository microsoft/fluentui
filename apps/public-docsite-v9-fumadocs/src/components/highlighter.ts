import { createHighlighterCoreSync } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import css from 'shiki/langs/css.mjs';
import js from 'shiki/langs/js.mjs';
import jsx from 'shiki/langs/jsx.mjs';
import ts from 'shiki/langs/ts.mjs';
import tsx from 'shiki/langs/tsx.mjs';
import githubDark from 'shiki/themes/github-dark.mjs';
import githubLight from 'shiki/themes/github-light.mjs';

const highlighter = createHighlighterCoreSync({
  themes: [githubLight, githubDark],
  langs: [tsx, ts, jsx, js, css],
  engine: createJavaScriptRegexEngine(),
});

const LANGUAGES = new Set(['tsx', 'ts', 'jsx', 'js', 'css']);

export function highlight(code: string, lang?: string): string {
  return highlighter.codeToHtml(code, {
    lang: lang && LANGUAGES.has(lang) ? lang : 'tsx',
    themes: { light: 'github-light', dark: 'github-dark' },
  });
}

export function highlightCode(code: string): string {
  return highlighter.codeToHtml(code, {
    lang: 'tsx',
    themes: { light: 'github-light', dark: 'github-dark' },
    transformers: [
      {
        pre(node) {
          node.tagName = 'code';
          node.properties = {};
          node.children = node.children.flatMap(child =>
            child.type === 'element' && child.tagName === 'code' ? child.children : [child],
          );
        },
      },
    ],
  });
}
