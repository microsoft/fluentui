import * as React from 'react';
import {
  SUPPORTS_CONSTRUCTABLE_STYLESHEETS,
  SUPPORTS_MODIFYING_ADOPTED_STYLESHEETS,
  Stylesheet,
  makeShadowConfig,
  cloneCSSStyleSheet,
} from '@fluentui/merge-styles';
import { useWindow } from '@fluentui/react-window-provider';
import { useMergeStylesRootStylesheets } from './useMergeStylesRootStylesheets';
import { useMergeStylesShadowRootContext } from './useMergeStylesShadowRoot';
import type { ExtendedCSSStyleSheet, InsertRuleCallback } from '@fluentui/merge-styles';
import type { MergeStylesShadowRootContextValue } from '../contexts/MergeStylesShadowRootContext';

type PolyfillInsertListeners = Record<string, Function>;

export type AdoptedStylesheetHook = (stylesheetKey: string) => boolean;
export type AdoptedStylesheetExHook = (
  stylesheetKey: string,
  shadowCtx: MergeStylesShadowRootContextValue | undefined,
  rootMergeStyles: Map<string, ExtendedCSSStyleSheet>,
  win: Window | undefined,
) => boolean;

/**
 * Use adopted stylesheets in the parent shadow root.
 */
export const useAdoptedStylesheet: AdoptedStylesheetHook = stylesheetKey => {
  const shadowCtx = useMergeStylesShadowRootContext();
  const rootMergeStyles = useMergeStylesRootStylesheets();
  const win = useWindow();

  return useAdoptedStylesheetEx(stylesheetKey, shadowCtx, rootMergeStyles, win);
};

/**
 * Optimization for specific cases like nested customizables.
 */
export const useAdoptedStylesheetEx: AdoptedStylesheetExHook = (stylesheetKey, shadowCtx, rootMergeStyles, win) => {
  const polyfillInsertListners = React.useRef<PolyfillInsertListeners>({});

  React.useEffect(() => {
    if (!shadowCtx) {
      return;
    }
    const polyfillListeners = polyfillInsertListners.current;
    polyfillInsertListners.current = {};

    return () => {
      Object.keys(polyfillListeners).forEach(key => {
        polyfillListeners[key]();
      });
    };
  }, [win, stylesheetKey, shadowCtx]);

  if (!shadowCtx) {
    return false;
  }

  if (shadowCtx.shadowRoot && !shadowCtx.stylesheets.has(stylesheetKey)) {
    const adoptableStyleSheet = rootMergeStyles.get(stylesheetKey);
    if (adoptableStyleSheet && win?.document) {
      adoptSheet(shadowCtx, win.document, stylesheetKey, adoptableStyleSheet, polyfillInsertListners.current);
    }
  }

  return true;
};

const updatePolyfillSheet = (shadowCtx: MergeStylesShadowRootContextValue, stylesheetKey: string, rule: string) => {
  const shadowRoot = shadowCtx.shadowRoot!;
  const style = shadowRoot.querySelector(`[data-merge-styles-stylesheet-key="${stylesheetKey}"]`) as HTMLStyleElement;
  if (style?.sheet) {
    style.sheet.insertRule(rule);
  }
};

const adoptSheet = (
  shadowCtx: MergeStylesShadowRootContextValue,
  doc: Document,
  stylesheetKey: string,
  stylesheet: ExtendedCSSStyleSheet,
  listenerRef: PolyfillInsertListeners,
) => {
  const shadowRoot = shadowCtx.shadowRoot!;

  shadowCtx.stylesheets.set(stylesheetKey, stylesheet);
  if (SUPPORTS_CONSTRUCTABLE_STYLESHEETS) {
    // Maintain the sort order of Fluent style sheets
    const prevSheets = shadowRoot.adoptedStyleSheets;
    let i = prevSheets.length;
    let found = i === 0;
    while (i >= 0 && !found) {
      i--;

      const prevSheet = prevSheets[i] as ExtendedCSSStyleSheet;
      const prevSortOrder = (prevSheet.metadata?.sortOrder as number) ?? 0;
      const sheetSortOrder = (stylesheet.metadata?.sortOrder as number) ?? 0;
      if (prevSheet.bucketName === 'merge-styles' && prevSortOrder < sheetSortOrder) {
        found = true;
      }
    }

    if (SUPPORTS_MODIFYING_ADOPTED_STYLESHEETS) {
      // The current spec allows the `adoptedStyleSheets` array to be modified.
      // Previous versions of the spec required a new array to be created.
      // For more details see: https://github.com/microsoft/fast/pull/6703
      shadowRoot.adoptedStyleSheets.splice(i + 1, 0, stylesheet);
    } else {
      shadowRoot.adoptedStyleSheets = [
        ...shadowRoot.adoptedStyleSheets.slice(0, i + 1),
        stylesheet,
        ...shadowRoot.adoptedStyleSheets.slice(i + 1),
      ];
    }
  } else {
    const style = doc.createElement('style');
    style.setAttribute('data-merge-styles-stylesheet-key', stylesheetKey);

    const otherStyles = shadowRoot.querySelectorAll('[data-merge-styles-stylesheet-key]');
    if (otherStyles.length > 0) {
      shadowRoot.insertBefore(style, otherStyles[otherStyles.length - 1].nextSibling);
    } else {
      shadowRoot.insertBefore(style, shadowRoot.firstChild);
    }

    if (style.sheet) {
      cloneCSSStyleSheet(stylesheet, style.sheet);
      if (!listenerRef[stylesheetKey]) {
        const onInsert: InsertRuleCallback = ({ key, rule }) => {
          if (key === stylesheetKey) {
            if (shadowCtx && rule) {
              updatePolyfillSheet(shadowCtx, key, rule);
            }
          }
        };
        const polyfillSheet = Stylesheet.getInstance(
          makeShadowConfig(stylesheetKey, true, doc.defaultView ?? undefined),
        );
        listenerRef[stylesheetKey] = polyfillSheet.onInsertRule(onInsert);
      }
    }
  }
};
