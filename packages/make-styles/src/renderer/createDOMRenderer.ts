import { MakeStylesRenderer } from '../types';
import { RTL_PREFIX } from '../constants';

export interface MakeStylesDOMRenderer extends MakeStylesRenderer {
  insertionCache: Record<string, true>;
  index: number;

  styleElement: HTMLStyleElement;
}

const renderers = new WeakMap<Document, MakeStylesDOMRenderer>();
let lastIndex = 0;

/* eslint-disable guard-for-in */

export function createDOMRenderer(targetDocument: Document = document): MakeStylesDOMRenderer {
  const value: MakeStylesDOMRenderer | undefined = renderers.get(targetDocument);

  if (value) {
    return value;
  }

  const styleElement = targetDocument.createElement('style');

  styleElement.setAttribute('make-styles', 'RULE');
  targetDocument.head.appendChild(styleElement);

  const renderer: MakeStylesDOMRenderer = {
    insertionCache: {},
    index: 0,
    styleElement,

    id: `d${lastIndex++}`,
    insertDefinitions: function insertStyles(definitions, rtl): string {
      let classes = '';

      for (const propName in definitions) {
        const definition = definitions[propName];
        // className || css || rtlCSS

        const className = definition[0];
        const rtlCSS = definition[2];

        const ruleClassName = className && (rtl && rtlCSS ? RTL_PREFIX + className : className);

        if (ruleClassName) {
          // Should be done always to return classes even if they have been already inserted to DOM
          classes += ruleClassName + ' ';
        }

        const cacheKey = ruleClassName || propName;
        if (renderer.insertionCache[cacheKey]) {
          continue;
        }

        const css = definition[1];
        const ruleCSS = rtl ? rtlCSS || css : css;

        renderer.insertionCache[cacheKey] = true;

        // The browser will fail to insert rule syntax it doesn't understand, such as :-moz-focusring selectors
        // We want to log the error but continue with other rules instead of aborting
        // See also: https://github.com/vercel/styled-jsx/issues/295
        try {
          (renderer.styleElement.sheet as CSSStyleSheet).insertRule(ruleCSS, renderer.index);
          renderer.index++;
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err);
        }
      }

      return classes.slice(0, -1);
    },
  };

  renderers.set(targetDocument, renderer);

  return renderer;
}

export function resetDOMRenderer(targetDocument: Document = document): void {
  renderers.delete(targetDocument);
}
