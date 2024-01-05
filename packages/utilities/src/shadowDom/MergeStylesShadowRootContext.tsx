import * as React from 'react';
import {
  GLOBAL_STYLESHEET_KEY,
  Stylesheet,
  makeShadowConfig,
  cloneCSSStyleSheet,
  EventHandler,
} from '@fluentui/merge-styles';
import { useMergeStylesRootStylesheets } from './MergeStylesRootContext';
import { useDocument, useWindow } from '@fluentui/react-window-provider';
import type { ExtendedCSSStyleSheet } from '@fluentui/merge-styles';

type PolyfileInsertListeners = Record<string, EventHandler<CSSStyleSheet>>;

export type MergeStylesShadowRootContextValue = {
  /**
   * Map of stylesheets available in the context.
   */
  stylesheets: Map<string, CSSStyleSheet>;

  /**
   * Shadow root for this context.
   */
  shadowRoot?: ShadowRoot | null;
};

export const MergeStylesShadowRootContext = React.createContext<MergeStylesShadowRootContextValue | undefined>(
  undefined,
);

export type MergeStylesShadowRootProviderProps = {
  /**
   * Shadow root for this context.
   */
  shadowRoot?: ShadowRoot | null;
};

/**
 * Context for a shadow root.
 */
export const MergeStylesShadowRootProvider: React.FC<MergeStylesShadowRootProviderProps> = ({
  shadowRoot,
  ...props
}) => {
  const value = React.useMemo(() => {
    return {
      stylesheets: new Map(),
      shadowRoot,
    };
  }, [shadowRoot]);

  return (
    <MergeStylesShadowRootContext.Provider value={value} {...props}>
      <GlobalStyles />
      {props.children}
    </MergeStylesShadowRootContext.Provider>
  );
};

export type MergeStylesContextConsumerProps = {
  stylesheetKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (inShadow: boolean) => React.ReactElement<any, any>;
};

export const MergeStylesShadowRootConsumer: React.FC<MergeStylesContextConsumerProps> = ({
  stylesheetKey,
  children,
}) => {
  useAdoptedStylesheet(GLOBAL_STYLESHEET_KEY);
  useAdoptedStylesheet(stylesheetKey);

  const inShadow = useHasMergeStylesShadowRootContext();

  return children(inShadow);
};

const GlobalStyles: React.FC = props => {
  useAdoptedStylesheet(GLOBAL_STYLESHEET_KEY);
  return null;
};

/**
 * Use adopted stylesheets in the parent shadow root.
 */
export const useAdoptedStylesheet = (stylesheetKey: string): boolean => {
  const shadowCtx = useMergeStylesShadowRootContext();
  const rootMergeStyles = useMergeStylesRootStylesheets();
  const doc = useDocument();
  const win = useWindow();
  // console.log(doc?.defaultView.__SENTINAL__);
  const polyfillInsertListners = React.useRef<PolyfileInsertListeners>({});

  React.useEffect(() => {
    const polyfillListeners = polyfillInsertListners.current;
    polyfillInsertListners.current = {};

    return () => {
      const sheet = Stylesheet.getInstance(makeShadowConfig(stylesheetKey, true, win));
      Object.keys(polyfillListeners).forEach(key => {
        sheet.offInsertRuleIntoConstructableStyleSheet(polyfillListeners[key]);
      });
    };
  }, [win, stylesheetKey]);

  if (!shadowCtx) {
    return false;
  }

  if (shadowCtx.shadowRoot && !shadowCtx.stylesheets.has(stylesheetKey)) {
    const adoptableStyleSheet = rootMergeStyles.get(stylesheetKey);
    if (adoptableStyleSheet && doc) {
      adoptSheet(shadowCtx, doc, stylesheetKey, adoptableStyleSheet, polyfillInsertListners.current);
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
  listenerRef: PolyfileInsertListeners,
) => {
  const shadowRoot = shadowCtx.shadowRoot!;

  shadowCtx.stylesheets.set(stylesheetKey, stylesheet);
  const sheet = Stylesheet.getInstance();
  if (sheet.supportsConstructableStylesheets()) {
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

    if (sheet.supportsModifyingAdoptedStyleSheets()) {
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
        const onInsert: EventHandler<CSSStyleSheet> = ({ key, rule }) => {
          if (key === stylesheetKey) {
            if (shadowCtx && rule) {
              updatePolyfillSheet(shadowCtx, key, rule);
            }
          }
        };
        const polyfillSheet = Stylesheet.getInstance(
          makeShadowConfig(stylesheetKey, true, doc.defaultView ?? undefined),
        );
        polyfillSheet.onInsertRuleIntoConstructableStyleSheet(onInsert);
        listenerRef[stylesheetKey] = onInsert;
      }
    }
  }
};

/**
 * Test if a context is available.
 * @returns true if there is a context.
 */
export const useHasMergeStylesShadowRootContext = () => {
  return !!useMergeStylesShadowRootContext();
};

/**
 * Get a reference to the shadow root context.
 * @returns The context for the shadow root.
 */
export const useMergeStylesShadowRootContext = () => {
  return React.useContext(MergeStylesShadowRootContext);
};

/**
 * Get a shadow config.
 * @param stylesheetKey - Globally unique key
 * @param win - Reference to the `window` global.
 * @returns ShadowConfig
 */
export const useShadowConfig = (stylesheetKey: string, win?: Window) => {
  const inShadow = useHasMergeStylesShadowRootContext();
  return React.useMemo(() => {
    return makeShadowConfig(stylesheetKey, inShadow, win);
  }, [stylesheetKey, inShadow, win]);
};
