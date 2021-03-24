import { MakeStylesRenderer } from '../types';

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
    insertDefinitions: function insertStyles(definitions): string {
      let classes = '';

      for (const propName in definitions) {
        const definition = definitions[propName];
        // className || css || rtlCSS
        const className = definition[0];

        if (className) {
          // Should be done always to return classes even if they have been already inserted to DOM
          classes += className + ' ';
        }

        const cacheKey = className || propName;
        if (renderer.insertionCache[cacheKey]) {
          continue;
        }

        const css = definition[1];
        const rtlCSS = definition[2];

        renderer.insertionCache[cacheKey] = true;

        // TODO: Miro wants to RTL styles only when it's needed

        (renderer.styleElement.sheet as CSSStyleSheet).insertRule(css, renderer.index);
        renderer.index++;

        if (rtlCSS) {
          (renderer.styleElement.sheet as CSSStyleSheet).insertRule(rtlCSS, renderer.index);
          renderer.index++;
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
