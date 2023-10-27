import { IStyle } from './IStyle';
import { DEFAULT_SHADOW_CONFIG, GLOBAL_STYLESHEET_KEY, ShadowConfig } from './shadowConfig';
import { EventHandler, EventMap } from './EventMap';

export const InjectionMode = {
  /**
   * Avoids style injection, use getRules() to read the styles.
   */
  none: 0 as 0,

  /**
   * Inserts rules using the insertRule api.
   */
  insertNode: 1 as 1,

  /**
   * Appends rules using appendChild.
   */
  appendChild: 2 as 2,
};

export type InjectionMode = (typeof InjectionMode)[keyof typeof InjectionMode];

/**
 * CSP settings for the stylesheet
 */
export interface ICSPSettings {
  /**
   * Nonce to inject into script tag
   */
  nonce?: string;
}

/**
 * Stylesheet config.
 *
 * @public
 */
export interface IStyleSheetConfig {
  /**
   * Injection mode for how rules are inserted.
   */
  injectionMode?: InjectionMode;

  /**
   * Default 'displayName' to use for a className.
   * @defaultvalue 'css'
   */
  defaultPrefix?: string;

  /**
   * Defines the default direction of rules for auto-rtlifying things.
   * While typically this is represented as a DIR attribute in the markup,
   * the DIR is not enough to control whether padding goes on the left or
   * right. Use this to set the default direction when rules are registered.
   */
  rtl?: boolean;

  /**
   * Default 'namespace' to attach before the className.
   */
  namespace?: string;

  /**
   * CSP settings
   */
  cspSettings?: ICSPSettings;

  /**
   * Callback executed when a rule is inserted.
   * @deprecated Use `Stylesheet.onInsertRule` instead.
   */
  onInsertRule?: (rule: string) => void;

  /**
   * Initial value for classnames cache. Key is serialized css rules associated with a classname.
   */
  classNameCache?: { [key: string]: string };

  ownerWindow?: Window;

  inShadow?: boolean;

  currentStylesheetKey?: string;
}

/**
 * Representation of Stylesheet used for rehydration.
 */
export interface ISerializedStylesheet {
  classNameToArgs: Stylesheet['_classNameToArgs'];
  counter: Stylesheet['_styleCounter'];
  keyToClassName: Stylesheet['_keyToClassName'];
  preservedRules: Stylesheet['_preservedRules'];
  rules: Stylesheet['_rules'];
}

const STYLESHEET_SETTING = '__stylesheet__';

/**
 * MSIE 11 doesn't cascade styles based on DOM ordering, but rather on the order that each style node
 * is created. As such, to maintain consistent priority, IE11 should reuse a single style node.
 */
const REUSE_STYLE_NODE = typeof navigator !== 'undefined' && /rv:11.0/.test(navigator.userAgent);

// const SUPPORTS_CONSTRUCTIBLE_STYLESHEETS = typeof window !== 'undefined' && 'CSSStyleSheet' in window;

export type AdoptableStylesheet = {
  fluentSheet: Stylesheet;
  adoptedSheet: CSSStyleSheet;
};

let _global: (Window | {}) & {
  [STYLESHEET_SETTING]?: Stylesheet;
  FabricConfig?: {
    mergeStyles?: IStyleSheetConfig;
    serializedStylesheet?: ISerializedStylesheet;
  };
} = {};

// Grab window.
try {
  // Why the cast?
  // if compiled/type checked in same program with `@fluentui/font-icons-mdl2` which extends `Window` on global
  // ( check packages/font-icons-mdl2/src/index.ts ) the definitions don't match! Thus the need of this extra assertion
  _global = (window || {}) as typeof _global;
} catch {
  /* leave as blank object */
}

let _stylesheet: Stylesheet | undefined;

const _getGlobal = (win?: Window): typeof _global => {
  return (win ?? _global) as typeof _global;
};

const _makeCSSStyleSheet = (win: Window): CSSStyleSheet => {
  return new (win as Window & typeof globalThis).CSSStyleSheet();
};

const _cloneCSSStyleSheet = (srcSheet: CSSStyleSheet, targetSheet: CSSStyleSheet): CSSStyleSheet => {
  for (let i = 0; i < srcSheet.cssRules.length; i++) {
    targetSheet.insertRule(srcSheet.cssRules[i].cssText);
  }

  return targetSheet;
};

const getDocument = () => {
  return typeof document === 'undefined' ? undefined : document;
};

const getWindow = () => {
  return typeof window === 'undefined' ? undefined : window;
};

/**
 * Represents the state of styles registered in the page. Abstracts
 * the surface for adding styles to the stylesheet, exposes helpers
 * for reading the styles registered in server rendered scenarios.
 *
 * @public
 */
export class Stylesheet {
  private _lastStyleElement?: HTMLStyleElement;
  private _styleElement?: HTMLStyleElement;

  private _rules: string[] = [];
  private _preservedRules: string[] = [];
  private _config: IStyleSheetConfig;
  private _styleCounter = 0;
  private _keyToClassName: { [key: string]: string } = {};
  private _onInsertRuleCallbacks: Function[] = [];
  private _onResetCallbacks: Function[] = [];
  private _classNameToArgs: { [key: string]: { args: any; rules: string[] } } = {};
  private _adoptableSheets?: EventMap<string, CSSStyleSheet>;

  /**
   * Gets the singleton instance.
   */
  public static getInstance(shadowConfig?: ShadowConfig): Stylesheet {
    const { stylesheetKey, inShadow, window: win } = shadowConfig ?? DEFAULT_SHADOW_CONFIG;
    const global = (win ?? _global) as typeof _global;

    _stylesheet = global[STYLESHEET_SETTING] as Stylesheet;

    const doc = win?.document ?? getDocument();

    // When an app has multiple versions of Fluent v8 it is possible
    // that an older version of Stylesheet is initialized before
    // the version that supports shadow DOM. We check for this case
    // and re-initialize the stylesheet in that case.
    const oldStylesheetInitializedFirst = _stylesheet && !_stylesheet.addAdoptableStyleSheet;

    if (
      !_stylesheet ||
      oldStylesheetInitializedFirst ||
      (_stylesheet._lastStyleElement && _stylesheet._lastStyleElement.ownerDocument !== doc)
    ) {
      const fabricConfig = global?.FabricConfig || {};
      fabricConfig.mergeStyles = fabricConfig.mergeStyles || {};
      fabricConfig.mergeStyles.ownerWindow = fabricConfig.mergeStyles.ownerWindow ?? win ?? getWindow();
      fabricConfig.mergeStyles.inShadow = fabricConfig.mergeStyles.inShadow ?? inShadow;
      fabricConfig.mergeStyles.currentStylesheetKey = fabricConfig.mergeStyles.currentStylesheetKey ?? stylesheetKey;

      let stylesheet: Stylesheet;
      if (oldStylesheetInitializedFirst) {
        stylesheet = new Stylesheet(fabricConfig.mergeStyles, JSON.parse(_stylesheet.serialize()));
      } else {
        stylesheet = new Stylesheet(fabricConfig.mergeStyles, fabricConfig.serializedStylesheet);
      }

      _stylesheet = stylesheet;
    }
    if (inShadow || stylesheetKey === GLOBAL_STYLESHEET_KEY) {
      const sheetWindow = win ?? getWindow();
      if (sheetWindow) {
        _stylesheet.addAdoptableStyleSheet(stylesheetKey, _makeCSSStyleSheet(sheetWindow));
      }
    }

    _stylesheet.setConfig({
      ownerWindow: win ?? getWindow(),
      inShadow,
      currentStylesheetKey: stylesheetKey ?? GLOBAL_STYLESHEET_KEY,
    });
    global[STYLESHEET_SETTING] = _stylesheet;

    return _stylesheet;
  }

  constructor(config?: IStyleSheetConfig, serializedStylesheet?: ISerializedStylesheet) {
    // If there is no document we won't have an element to inject into.
    const defaultInjectionMode = typeof document === 'undefined' ? InjectionMode.none : InjectionMode.insertNode;
    this._config = {
      injectionMode: defaultInjectionMode,
      defaultPrefix: 'css',
      namespace: undefined,
      cspSettings: undefined,
      ...config,
    };

    // Need to add a adoptedStyleSheets polyfill

    this._classNameToArgs = serializedStylesheet?.classNameToArgs ?? this._classNameToArgs;
    this._styleCounter = serializedStylesheet?.counter ?? this._styleCounter;
    this._keyToClassName = this._config.classNameCache ?? serializedStylesheet?.keyToClassName ?? this._keyToClassName;
    this._preservedRules = serializedStylesheet?.preservedRules ?? this._preservedRules;
    this._rules = serializedStylesheet?.rules ?? this._rules;
  }

  public addAdoptableStyleSheet(key: string, sheet: CSSStyleSheet): void {
    if (!this._adoptableSheets) {
      this._adoptableSheets = new EventMap();
      // window.__DEBUG_SHEETS__ = this._adoptableSheets;
    }

    if (!this._adoptableSheets.has(key)) {
      this._adoptableSheets.set(key, sheet);
      this._config.ownerWindow?.requestAnimationFrame?.(() => {
        this._adoptableSheets!.raise('add-sheet', { key, sheet });
      });
    }
  }

  public getAdoptableStyleSheet(key: string): CSSStyleSheet {
    if (!this._adoptableSheets) {
      this._adoptableSheets = new EventMap();
      // window.__DEBUG_SHEETS__ = this._adoptableSheets;
    }

    let sheet = this._adoptableSheets.get(key);
    if (!sheet) {
      sheet = _makeCSSStyleSheet(this._config.ownerWindow ?? window);
      this.addAdoptableStyleSheet(key, sheet);
    }

    return sheet;
  }

  public forEachAdoptedStyleSheet(
    callback: (value: CSSStyleSheet, key: string, map: Map<string, CSSStyleSheet>) => void,
  ): void {
    this._adoptableSheets?.forEach(callback);
  }

  public onAddConstructableStyleSheet(callback: EventHandler<CSSStyleSheet>): void {
    if (!this._adoptableSheets) {
      this._adoptableSheets = new EventMap();
      // window.__DEBUG_SHEETS__ = this._adoptableSheets;
    }

    this._adoptableSheets.on('add-sheet', callback);
  }

  public offAddConstructableStyleSheet(callback: EventHandler<CSSStyleSheet>): void {
    if (!this._adoptableSheets) {
      this._adoptableSheets = new EventMap();
      // window.__DEBUG_SHEETS__ = this._adoptableSheets;
    }

    this._adoptableSheets.off('add-sheet', callback);
  }

  public projectStylesToWindow(targetWindow: Window): void {
    const global = _getGlobal(this._config.ownerWindow);

    const serialized = JSON.parse(this.serialize());
    const targetStylesheet = new Stylesheet(
      {
        injectionMode: this._config.injectionMode,
        ownerWindow: targetWindow,
      },
      serialized,
    );

    (targetWindow as typeof _global)[STYLESHEET_SETTING] = targetStylesheet;

    // TODO: add support for <style> tags
    this.forEachAdoptedStyleSheet((srcSheet, key) => {
      const clonedSheet = _cloneCSSStyleSheet(srcSheet, _makeCSSStyleSheet(targetWindow));
      targetStylesheet.addAdoptableStyleSheet(key, clonedSheet);
    });

    if ((global as Window)?.document) {
      const globalStyles = (global as Window).document.querySelectorAll('[data-merge-styles-global]') || [];
      for (let i = 0; i < globalStyles.length; i++) {
        const styleTag = targetWindow.document.createElement('style');
        // TODO: insert this in the right place
        targetWindow.document.head.appendChild(styleTag);
        const srcSheet = (globalStyles[i] as HTMLStyleElement).sheet;
        if (srcSheet) {
          for (let j = 0; j < srcSheet.cssRules.length; j++) {
            styleTag.sheet?.insertRule(srcSheet.cssRules[j].cssText);
          }
        }
      }
    }
  }

  /**
   * Serializes the Stylesheet instance into a format which allows rehydration on creation.
   * @returns string representation of `ISerializedStylesheet` interface.
   */
  public serialize(): string {
    return JSON.stringify({
      classNameToArgs: this._classNameToArgs,
      counter: this._styleCounter,
      keyToClassName: this._keyToClassName,
      preservedRules: this._preservedRules,
      rules: this._rules,
    });
  }

  /**
   * Configures the stylesheet.
   */
  public setConfig(config?: IStyleSheetConfig): void {
    this._config = {
      ...this._config,
      ...config,
    };
  }

  /**
   * Configures a reset callback.
   *
   * @param callback - A callback which will be called when the Stylesheet is reset.
   * @returns function which when called un-registers provided callback.
   */
  public onReset(callback: Function): Function {
    this._onResetCallbacks.push(callback);

    return () => {
      this._onResetCallbacks = this._onResetCallbacks.filter(cb => cb !== callback);
    };
  }

  /**
   * Configures an insert rule callback.
   *
   * @param callback - A callback which will be called when a rule is inserted.
   * @returns function which when called un-registers provided callback.
   */
  public onInsertRule(callback: Function): Function {
    this._onInsertRuleCallbacks.push(callback);

    return () => {
      this._onInsertRuleCallbacks = this._onInsertRuleCallbacks.filter(cb => cb !== callback);
    };
  }

  /**
   * Generates a unique classname.
   *
   * @param displayName - Optional value to use as a prefix.
   */
  public getClassName(displayName?: string): string {
    const { namespace } = this._config;
    const prefix = displayName || this._config.defaultPrefix;

    return `${namespace ? namespace + '-' : ''}${prefix}-${this._styleCounter++}`;
  }

  /**
   * Used internally to cache information about a class which was
   * registered with the stylesheet.
   */
  public cacheClassName(className: string, key: string, args: IStyle[], rules: string[]): void {
    const cacheKey = this._getCacheKey(key);
    this._keyToClassName[cacheKey] = className;
    this._classNameToArgs[className] = {
      args,
      rules,
    };
  }

  /**
   * Gets the appropriate classname given a key which was previously
   * registered using cacheClassName.
   */
  public classNameFromKey(key: string): string | undefined {
    const cacheKey = this._getCacheKey(key);
    return this._keyToClassName[cacheKey];
  }

  /**
   * Gets all classnames cache with the stylesheet.
   */
  public getClassNameCache(): { [key: string]: string } {
    return this._keyToClassName;
  }

  /**
   * Gets the arguments associated with a given classname which was
   * previously registered using cacheClassName.
   */
  public argsFromClassName(className: string): IStyle[] | undefined {
    const entry = this._classNameToArgs[className];

    return entry && entry.args;
  }

  /**
   * Gets the rules associated with a given classname which was
   * previously registered using cacheClassName.
   */
  public insertedRulesFromClassName(className: string): string[] | undefined {
    const entry = this._classNameToArgs[className];

    return entry && entry.rules;
  }

  /**
   * Inserts a css rule into the stylesheet.
   * @param preserve - Preserves the rule beyond a reset boundary.
   */
  public insertRule(rule: string, preserve?: boolean): void {
    const { injectionMode, currentStylesheetKey = GLOBAL_STYLESHEET_KEY } = this._config;

    const injectStyles = injectionMode !== InjectionMode.none;
    const addToConstructableStylesheet =
      currentStylesheetKey === GLOBAL_STYLESHEET_KEY || !!this._adoptableSheets?.has(currentStylesheetKey);

    let element: HTMLStyleElement | undefined = undefined;
    let constructableSheet: CSSStyleSheet | undefined = undefined;

    // TODO: maybe change this? seems like we're inserting everything into head always still?
    if (injectStyles) {
      element = this._getStyleElement();
    }

    if (injectStyles && addToConstructableStylesheet) {
      constructableSheet = this.getAdoptableStyleSheet(currentStylesheetKey);
    }

    if (preserve) {
      this._preservedRules.push(rule);
    }

    if (element || constructableSheet) {
      switch (injectionMode) {
        case InjectionMode.insertNode:
          this._insertNode(element, rule);
          break;

        case InjectionMode.appendChild:
          element && (element as HTMLStyleElement).appendChild(document.createTextNode(rule));
          break;
      }

      if (constructableSheet) {
        this._insertRuleIntoSheet(constructableSheet, rule);
      }
    } else {
      this._rules.push(rule);
    }

    // eslint-disable-next-line deprecation/deprecation
    if (this._config.onInsertRule) {
      // eslint-disable-next-line deprecation/deprecation
      this._config.onInsertRule(rule);
    }

    this._onInsertRuleCallbacks.forEach(callback => callback());
  }

  /**
   * Gets all rules registered with the stylesheet; only valid when
   * using InsertionMode.none.
   */
  public getRules(includePreservedRules?: boolean): string {
    return (includePreservedRules ? this._preservedRules.join('') : '') + this._rules.join('');
  }

  /**
   * Resets the internal state of the stylesheet. Only used in server
   * rendered scenarios where we're using InsertionMode.none.
   */
  public reset(): void {
    this._rules = [];
    this._styleCounter = 0;
    this._classNameToArgs = {};
    this._keyToClassName = {};

    this._onResetCallbacks.forEach(callback => callback());
  }

  // Forces the regeneration of incoming styles without totally resetting the stylesheet.
  public resetKeys(): void {
    this._keyToClassName = {};
  }

  // public get counter(): number {
  //   return this._counter;
  // }

  // private get _counter(): number {
  //   return this._styleCounter;
  // }

  // private set _counter(value: number) {
  //   this._styleCounter = value;
  // }

  private _insertNode(element: HTMLStyleElement | undefined, rule: string): void {
    if (!element) {
      return;
    }

    const { sheet } = element! as HTMLStyleElement;

    try {
      (sheet as CSSStyleSheet).insertRule(rule, (sheet as CSSStyleSheet).cssRules.length);
    } catch (e) {
      // The browser will throw exceptions on unsupported rules (such as a moz prefix in webkit.)
      // We need to swallow the exceptions for this scenario, otherwise we'd need to filter
      // which could be slower and bulkier.
    }
  }

  private _insertRuleIntoSheet(sheet: CSSStyleSheet | undefined, rule: string): void {
    if (!sheet) {
      return;
    }

    try {
      sheet!.insertRule(rule, sheet!.cssRules.length);
    } catch (e) {
      // The browser will throw exceptions on unsupported rules (such as a moz prefix in webkit.)
      // We need to swallow the exceptions for this scenario, otherwise we'd need to filter
      // which could be slower and bulkier.
    }
  }

  private _getStyleElement(): HTMLStyleElement | undefined {
    const win = this._config.ownerWindow ?? window;
    const doc = win.document;
    if (!this._styleElement && typeof doc !== 'undefined') {
      this._styleElement = this._createStyleElement();

      if (!REUSE_STYLE_NODE) {
        // Reset the style element on the next frame.
        win.requestAnimationFrame(() => {
          this._styleElement = undefined;
        });
      }
    }
    return this._styleElement;
  }

  private _createStyleElement(): HTMLStyleElement {
    const doc = this._config.ownerWindow?.document ?? document;
    const head: HTMLHeadElement = doc.head;
    const styleElement = doc.createElement('style');
    let nodeToInsertBefore: Node | null = null;

    styleElement.setAttribute('data-merge-styles', 'true');

    if (this._config.currentStylesheetKey === GLOBAL_STYLESHEET_KEY) {
      styleElement.setAttribute('data-merge-styles-global', 'true');
    }

    const { cspSettings } = this._config;
    if (cspSettings) {
      if (cspSettings.nonce) {
        styleElement.setAttribute('nonce', cspSettings.nonce);
      }
    }
    if (this._lastStyleElement) {
      // If the `nextElementSibling` is null, then the insertBefore will act as a regular append.
      // https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore#Syntax
      nodeToInsertBefore = this._lastStyleElement.nextElementSibling;
    } else {
      const placeholderStyleTag: Element | null = this._findPlaceholderStyleTag();

      if (placeholderStyleTag) {
        nodeToInsertBefore = placeholderStyleTag.nextElementSibling;
      } else {
        nodeToInsertBefore = head.childNodes[0];
      }
    }

    head!.insertBefore(styleElement, head!.contains(nodeToInsertBefore) ? nodeToInsertBefore : null);
    this._lastStyleElement = styleElement;

    return styleElement;
  }

  private _getCacheKey(key: string): string {
    const { inShadow = false, currentStylesheetKey = GLOBAL_STYLESHEET_KEY } = this._config;

    if (inShadow) {
      return `__${currentStylesheetKey}__${key}`;
    }

    return key;
  }

  private _findPlaceholderStyleTag(): Element | null {
    const head: HTMLHeadElement = document.head;
    if (head) {
      return head.querySelector('style[data-merge-styles]');
    }
    return null;
  }
}
