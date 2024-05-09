/* eslint no-restricted-globals: 0 */
import { InjectionMode, STYLESHEET_SETTING, Stylesheet } from './Stylesheet';
import { DEFAULT_SHADOW_CONFIG, GLOBAL_STYLESHEET_KEY, SHADOW_DOM_STYLESHEET_SETTING } from './shadowConfig';

import type {
  ExtendedCSSStyleSheet,
  ISerializedStylesheet,
  IStyleSheetConfig,
  WindowWithMergeStyles,
} from './Stylesheet';
import type { ShadowConfig } from './shadowConfig';

export const SUPPORTS_CONSTRUCTABLE_STYLESHEETS =
  typeof document !== 'undefined' && Array.isArray(document.adoptedStyleSheets) && 'replace' in CSSStyleSheet.prototype;

let supportsModifyingAdoptedStyleSheets = false;

if (SUPPORTS_CONSTRUCTABLE_STYLESHEETS) {
  try {
    document.adoptedStyleSheets.push();
    supportsModifyingAdoptedStyleSheets = true;
  } catch (e) {
    supportsModifyingAdoptedStyleSheets = false;
  }
}

export const SUPPORTS_MODIFYING_ADOPTED_STYLESHEETS = supportsModifyingAdoptedStyleSheets;

let _stylesheet: ShadowDomStylesheet | undefined;

let _global: WindowWithMergeStyles = {};

// Grab window.
try {
  // Why the cast?
  // if compiled/type checked in same program with `@fluentui/font-icons-mdl2` which extends `Window` on global
  // ( check packages/font-icons-mdl2/src/index.ts ) the definitions don't match! Thus the need of this extra assertion
  _global = (window || {}) as WindowWithMergeStyles;
} catch {
  /* leave as blank object */
}

export type AddSheetCallback = ({ key, sheet }: { key: string; sheet: ExtendedCSSStyleSheet }) => void;

const copyOldGlobalRules = (
  stylesheet: ShadowDomStylesheet,
  inShadow: boolean = false,
  win: Window | undefined,
  doc: Document | undefined,
) => {
  if (!doc) {
    // SSR
    return;
  }

  const oldGlobalRules = doc.querySelectorAll('[data-merge-styles]');
  if (oldGlobalRules) {
    stylesheet.setConfig({
      window: win,
      inShadow,
      stylesheetKey: GLOBAL_STYLESHEET_KEY,
    });

    for (let i = 0; i < oldGlobalRules.length; i++) {
      const styleElem = oldGlobalRules[i] as HTMLStyleElement;
      styleElem.setAttribute('data-merge-styles-global', 'true');
      const cssRules = styleElem.sheet?.cssRules || [];

      for (let j = 0; j < cssRules.length; j++) {
        const rule = cssRules[j];
        stylesheet.insertRule(rule.cssText);
      }
    }
  }
};

export class ShadowDomStylesheet extends Stylesheet {
  private _onAddSheetCallbacks: AddSheetCallback[] = [];
  private _adoptableSheets: Map<string, ExtendedCSSStyleSheet>;
  private _sheetCounter = 0;

  public static getInstance(shadowConfig?: ShadowConfig): ShadowDomStylesheet {
    const sConfig = shadowConfig || DEFAULT_SHADOW_CONFIG;
    const stylesheetKey = sConfig.stylesheetKey || GLOBAL_STYLESHEET_KEY;
    const inShadow = sConfig.inShadow;
    const win = sConfig.window || (typeof window !== 'undefined' ? window : undefined);
    const global = (win || _global) as WindowWithMergeStyles;
    const doc = win ? win.document : typeof document !== 'undefined' ? document : undefined;

    _stylesheet = global[STYLESHEET_SETTING] as ShadowDomStylesheet;

    // When an app has multiple versions of Fluent v8 it is possible
    // that an older version of Stylesheet is initialized before
    // the version that supports shadow DOM. We check for this case
    // and re-initialize the stylesheet in that case.
    const oldStylesheetInitializedFirst = _stylesheet && !_stylesheet.getAdoptedSheets;

    if (
      !_stylesheet ||
      oldStylesheetInitializedFirst ||
      (_stylesheet._lastStyleElement && _stylesheet._lastStyleElement.ownerDocument !== doc)
    ) {
      const fabricConfig = global?.FabricConfig || {};
      const defaultMergeStyles = {
        window: win,
        inShadow,
        stylesheetKey,
      };
      fabricConfig.mergeStyles = fabricConfig.mergeStyles || {};
      fabricConfig.mergeStyles = { ...defaultMergeStyles, ...fabricConfig.mergeStyles };

      let stylesheet: ShadowDomStylesheet;
      if (oldStylesheetInitializedFirst) {
        stylesheet = new ShadowDomStylesheet(fabricConfig.mergeStyles, JSON.parse(_stylesheet.serialize()));
        copyOldGlobalRules(stylesheet, inShadow, win, doc);
      } else {
        stylesheet = new ShadowDomStylesheet(fabricConfig.mergeStyles, fabricConfig.serializedStylesheet);
      }

      _stylesheet = stylesheet;
      global[STYLESHEET_SETTING] = _stylesheet;
    } else {
      _stylesheet.setConfig({
        window: win,
        inShadow,
        stylesheetKey,
      });
    }
    if (win) {
      _stylesheet._getAdoptableStyleSheet(stylesheetKey);
    }

    return _stylesheet;
  }

  constructor(config?: IStyleSheetConfig, serializedStylesheet?: ISerializedStylesheet) {
    super(config, serializedStylesheet);

    this._adoptableSheets = new Map();

    _global[SHADOW_DOM_STYLESHEET_SETTING] = ShadowDomStylesheet;
  }

  public getAdoptedSheets(): Map<string, ExtendedCSSStyleSheet> {
    return this._adoptableSheets;
  }

  public onAddSheet(callback: AddSheetCallback): Function {
    this._onAddSheetCallbacks.push(callback);

    return () => {
      this._onAddSheetCallbacks = this._onAddSheetCallbacks.filter(cb => cb !== callback);
    };
  }

  public insertRule(rule: string, preserve?: boolean): void {
    const { injectionMode, stylesheetKey = GLOBAL_STYLESHEET_KEY } = this._config;

    const injectStyles = injectionMode !== InjectionMode.none;
    const addToConstructableStylesheet =
      stylesheetKey === GLOBAL_STYLESHEET_KEY || !!this._adoptableSheets.has(stylesheetKey);

    let constructableSheet: CSSStyleSheet | undefined = undefined;

    if (injectStyles && addToConstructableStylesheet) {
      constructableSheet = this._getAdoptableStyleSheet(stylesheetKey);
    }

    if (constructableSheet) {
      this._insertRuleIntoSheet(constructableSheet, rule);
    }

    super.insertRule(rule, preserve, stylesheetKey);
  }

  protected _getCacheKey(key: string): string {
    const { inShadow = false, stylesheetKey: currentStylesheetKey = GLOBAL_STYLESHEET_KEY } = this._config;

    if (inShadow) {
      return `__${currentStylesheetKey}__${key}`;
    }

    return super._getCacheKey(key);
  }

  protected _createStyleElement(): HTMLStyleElement {
    const styleElement = super._createStyleElement();

    if (this._config.stylesheetKey === GLOBAL_STYLESHEET_KEY) {
      styleElement.setAttribute('data-merge-styles-global', 'true');
    }

    return styleElement;
  }

  private _makeCSSStyleSheet(): ExtendedCSSStyleSheet {
    const win = this._config.window || window;
    let sheet: ExtendedCSSStyleSheet | undefined = undefined;
    if (!SUPPORTS_CONSTRUCTABLE_STYLESHEETS) {
      const style = this._createStyleElement();
      sheet = style.sheet as ExtendedCSSStyleSheet;
    } else {
      sheet = new (win as Window & typeof globalThis).CSSStyleSheet() as ExtendedCSSStyleSheet;
    }

    if (sheet) {
      sheet.bucketName = 'merge-styles';
      sheet.metadata = {
        stylesheetKey: this._config.stylesheetKey || GLOBAL_STYLESHEET_KEY,
        sortOrder: this._sheetCounter++,
      };
    }

    return sheet;
  }

  private _addAdoptableStyleSheet(key: string, sheet: ExtendedCSSStyleSheet, queue: boolean = true): void {
    if (!this._adoptableSheets.has(key)) {
      this._adoptableSheets.set(key, sheet);
      const win = this._config.window;
      if (queue && win) {
        win.queueMicrotask(() => {
          this._onAddSheetCallbacks.forEach(callback => callback({ key, sheet }));
        });
      }
    }
  }

  private _getAdoptableStyleSheet(key: string): ExtendedCSSStyleSheet {
    let sheet = this._adoptableSheets.get(key);
    if (!sheet) {
      sheet = this._makeCSSStyleSheet();
      this._addAdoptableStyleSheet(key, sheet);
    }

    return sheet;
  }
}
