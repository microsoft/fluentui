import { IStyle } from './IStyle';
import { ShadowConfig } from './mergeStyleSets';

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

  /**
   * Inserts rules into constructible stylesheets.
   * NOTE: This API is unstable and subject to change or removal without notice.
   * Depend on it at your own risk.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  unstable_constructibleStylesheet: 3 as 3,

  insertNodeAndConstructableStylesheet: 4 as 4,

  appedChildAndConstructableStylesheet: 5 as 5,
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
}

/**
 * Representation of Stylesheet used for rehydration.
 */
export interface ISerializedStylesheet {
  classNameToArgs: Stylesheet['_classNameToArgs'];
  counter: Stylesheet['_counter'];
  keyToClassName: Stylesheet['_keyToClassName'];
  preservedRules: Stylesheet['_preservedRules'];
  rules: Stylesheet['_rules'];
}

const STYLESHEET_SETTING = '__stylesheet__';

const ADOPTED_STYLESHEETS = '__mergeStylesAdoptedStyleSheets__';

/**
 * MSIE 11 doesn't cascade styles based on DOM ordering, but rather on the order that each style node
 * is created. As such, to maintain consistent priority, IE11 should reuse a single style node.
 */
const REUSE_STYLE_NODE = typeof navigator !== 'undefined' && /rv:11.0/.test(navigator.userAgent);

const SUPPORTS_CONSTRUCTIBLE_STYLESHEETS = 'CSSStyleSheet' in window;

// export type EventMap<K, V> = Map<K, V> & {
//   raise: (type: string, data: { key: K; sheet: V }) => void;
//   on: (type: string, callback: (data: { key: K; sheet: V }) => void) => void;
//   off: (type: string) => void;
// }

export type EventArgs = { key: string; sheet: Stylesheet };
export type EventHandler = (args: EventArgs) => void;

export class EventMap<K, V> {
  private _events: Map<string, EventHandler[]>;
  private _self: Map<K, V>;

  constructor() {
    this._self = new Map<K, V>();
    this._events = new Map<string, EventHandler[]>();
  }

  public get(key: K) {
    return this._self.get(key);
  }

  public set(key: K, value: V) {
    this._self.set(key, value);
  }

  public has(key: K) {
    return this._self.has(key);
  }

  public forEach(callback: (value: V, key: K, map: Map<K, V>) => void) {
    this._self.forEach(callback);
  }

  public raise(type: string, data: { key: K; sheet: V }) {
    const handlers = this._events.get(type);
    if (!handlers) {
      return;
    }

    for (const handler of handlers) {
      // eslint-disable-next-line
      // @ts-ignore
      handler?.(data as EventArgs);
    }
  }

  public on(type: string, callback: EventHandler) {
    const handlers = this._events.get(type);
    if (!handlers) {
      this._events.set(type, [callback]);
    } else {
      handlers.push(callback);
    }
  }

  public off(type: string, callback: EventHandler) {
    const handlers = this._events.get(type);
    if (handlers) {
      const index = handlers.indexOf(callback);
      if (index >= 0) {
        handlers.splice(index, 1);
      }
    }
  }
}

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
  [ADOPTED_STYLESHEETS]?: EventMap<string, Stylesheet>;
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

let constructableStyleSheetCounter = 0;

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

  private _constructibleSheet?: CSSStyleSheet;
  private _stylesheetKey?: string;

  private _rules: string[] = [];
  private _preservedRules: string[] = [];
  private _config: IStyleSheetConfig;
  private _styleCounter = 0;
  private _keyToClassName: { [key: string]: string } = {};
  private _onInsertRuleCallbacks: Function[] = [];
  private _onResetCallbacks: Function[] = [];
  private _classNameToArgs: { [key: string]: { args: any; rules: string[] } } = {};

  /**
   * Gets the singleton instance.
   */
  public static getInstance(
    { stylesheetKey, inShadow, window: win }: ShadowConfig = {
      stylesheetKey: '__global__',
      inShadow: false,
      window: undefined,
    },
  ): Stylesheet {
    const global = (win ?? _global) as typeof _global;

    if (stylesheetKey && inShadow) {
      _stylesheet = global[ADOPTED_STYLESHEETS]?.get(stylesheetKey);
    } else {
      _stylesheet = global[STYLESHEET_SETTING] as Stylesheet;
    }

    if (!_stylesheet || (_stylesheet._lastStyleElement && _stylesheet._lastStyleElement.ownerDocument !== document)) {
      const fabricConfig = global?.FabricConfig || {};
      if (inShadow) {
        fabricConfig.mergeStyles = fabricConfig.mergeStyles || {};
        fabricConfig.mergeStyles.injectionMode = InjectionMode.unstable_constructibleStylesheet;
      }

      const stylesheet = new Stylesheet(fabricConfig.mergeStyles, fabricConfig.serializedStylesheet, stylesheetKey);
      _stylesheet = stylesheet;
      if (stylesheetKey) {
        if (inShadow || stylesheetKey === '__global__') {
          if (!global[ADOPTED_STYLESHEETS]) {
            global[ADOPTED_STYLESHEETS] = new EventMap();
          }
          global[ADOPTED_STYLESHEETS]!.set(stylesheetKey, stylesheet);
          const css = _stylesheet._getConstructibleStylesheet();
          requestAnimationFrame(() => {
            global[ADOPTED_STYLESHEETS]!.raise('add-sheet', { key: stylesheetKey, sheet: stylesheet });
          });
        }

        if (stylesheetKey === '__global__') {
          global[STYLESHEET_SETTING] = stylesheet;
        }
      } else {
        global[STYLESHEET_SETTING] = stylesheet;
      }
    }

    return _stylesheet;
  }

  constructor(config?: IStyleSheetConfig, serializedStylesheet?: ISerializedStylesheet, stylesheetKey?: string) {
    // If there is no document we won't have an element to inject into.
    const defaultInjectionMode = typeof document === 'undefined' ? InjectionMode.none : InjectionMode.insertNode;
    // const defaultInjectionMode =
    //   typeof stylesheetKey === 'string' ? InjectionMode.unstable_constructibleStylesheet : InjectionMode.insertNode;
    // const defaultInjectionMode = InjectionMode.unstable_constructibleStylesheet;
    this._config = {
      injectionMode: defaultInjectionMode,
      defaultPrefix: 'css',
      namespace: undefined,
      cspSettings: undefined,
      ...config,
    };

    // Need to add a adoptedStyleSheets polyfill
    if (
      !SUPPORTS_CONSTRUCTIBLE_STYLESHEETS &&
      this._config.injectionMode === InjectionMode.unstable_constructibleStylesheet
    ) {
      this._config.injectionMode = defaultInjectionMode;
    }

    // When something is inserted globally, outside of a shadow context
    // we proably still need to adopt it in the shadow context
    if (stylesheetKey === '__global__') {
      if (this._config.injectionMode === InjectionMode.insertNode) {
        this._config.injectionMode = InjectionMode.insertNodeAndConstructableStylesheet;
      } else if (this._config.injectionMode === InjectionMode.appedChildAndConstructableStylesheet) {
        this._config.injectionMode = InjectionMode.appedChildAndConstructableStylesheet;
      }
    }

    this._classNameToArgs = serializedStylesheet?.classNameToArgs ?? this._classNameToArgs;
    // Come back to this
    if (this._config.injectionMode !== InjectionMode.unstable_constructibleStylesheet) {
      this._styleCounter = serializedStylesheet?.counter ?? this._styleCounter;
    }
    this._keyToClassName = this._config.classNameCache ?? serializedStylesheet?.keyToClassName ?? this._keyToClassName;
    this._preservedRules = serializedStylesheet?.preservedRules ?? this._preservedRules;
    this._rules = serializedStylesheet?.rules ?? this._rules;

    this._stylesheetKey = stylesheetKey;
  }

  public getAdoptableStyleSheet(): CSSStyleSheet | undefined {
    return this._constructibleSheet;
  }

  public setAdoptableStyleSheet(sheet: CSSStyleSheet): void {
    this._constructibleSheet = sheet;
  }

  /**
   * Serializes the Stylesheet instance into a format which allows rehydration on creation.
   * @returns string representation of `ISerializedStylesheet` interface.
   */
  public serialize(): string {
    return JSON.stringify({
      classNameToArgs: this._classNameToArgs,
      counter: this._counter,
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

    // return `${namespace ? namespace + '-' : ''}${prefix}-${this._counter++}`;
    return `${namespace ? namespace + '-' : ''}${prefix}-${this._counter++}`;
  }

  /**
   * Used internally to cache information about a class which was
   * registered with the stylesheet.
   */
  public cacheClassName(className: string, key: string, args: IStyle[], rules: string[]): void {
    this._keyToClassName[key] = className;
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
    return this._keyToClassName[key];
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
    const { injectionMode } = this._config;
    // const element =
    //   injectionMode === InjectionMode.unstable_constructibleStylesheet
    //     ? this._getConstructibleStylesheet()
    //     : injectionMode !== InjectionMode.none
    //     ? this._getStyleElement()
    //     : undefined;

    let element: HTMLStyleElement | undefined = undefined;
    let constructableSheet: CSSStyleSheet | undefined = undefined;

    if (injectionMode === InjectionMode.insertNode || injectionMode === InjectionMode.appendChild) {
      element = this._getStyleElement();
    } else if (injectionMode === InjectionMode.unstable_constructibleStylesheet) {
      constructableSheet = this._getConstructibleStylesheet();
    } else if (
      injectionMode === InjectionMode.insertNodeAndConstructableStylesheet ||
      injectionMode === InjectionMode.appedChildAndConstructableStylesheet
    ) {
      element = this._getStyleElement();
      constructableSheet = this._getConstructibleStylesheet();
    }

    if (preserve) {
      this._preservedRules.push(rule);
    }

    if (element || constructableSheet) {
      switch (injectionMode) {
        case InjectionMode.insertNode:
          this._insertNode(element!, rule);
          break;

        case InjectionMode.insertNodeAndConstructableStylesheet:
          this._insertNode(element!, rule);
          this._insertRuleIntoSheet(constructableSheet!, rule);
          break;

        case InjectionMode.appendChild:
          (element as HTMLStyleElement).appendChild(document.createTextNode(rule));
          break;

        case InjectionMode.appedChildAndConstructableStylesheet:
          (element as HTMLStyleElement).appendChild(document.createTextNode(rule));
          this._insertRuleIntoSheet(constructableSheet!, rule);
          break;

        case InjectionMode.unstable_constructibleStylesheet:
          this._insertRuleIntoSheet(constructableSheet!, rule);
          break;
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
    this._counter = 0;
    this._classNameToArgs = {};
    this._keyToClassName = {};

    this._onResetCallbacks.forEach(callback => callback());
  }

  // Forces the regeneration of incoming styles without totally resetting the stylesheet.
  public resetKeys(): void {
    this._keyToClassName = {};
  }

  public get counter(): number {
    return this._counter;
  }

  private get _counter(): number {
    return this._config.injectionMode === InjectionMode.unstable_constructibleStylesheet
      ? constructableStyleSheetCounter
      : this._styleCounter;
  }

  private set _counter(value: number) {
    if (this._config.injectionMode === InjectionMode.unstable_constructibleStylesheet) {
      constructableStyleSheetCounter = value;
    } else {
      this._styleCounter = value;
    }
  }

  private _insertNode(element: HTMLStyleElement, rule: string): void {
    const { sheet } = element! as HTMLStyleElement;

    try {
      (sheet as CSSStyleSheet).insertRule(rule, (sheet as CSSStyleSheet).cssRules.length);
    } catch (e) {
      // The browser will throw exceptions on unsupported rules (such as a moz prefix in webkit.)
      // We need to swallow the exceptions for this scenario, otherwise we'd need to filter
      // which could be slower and bulkier.
    }
  }

  private _insertRuleIntoSheet(sheet: CSSStyleSheet, rule: string): void {
    try {
      sheet.insertRule(rule, sheet.cssRules.length);
    } catch (e) {
      // The browser will throw exceptions on unsupported rules (such as a moz prefix in webkit.)
      // We need to swallow the exceptions for this scenario, otherwise we'd need to filter
      // which could be slower and bulkier.
    }
  }

  private _getStyleElement(): HTMLStyleElement | undefined {
    if (!this._styleElement && typeof document !== 'undefined') {
      this._styleElement = this._createStyleElement();

      if (!REUSE_STYLE_NODE) {
        // Reset the style element on the next frame.
        window.requestAnimationFrame(() => {
          this._styleElement = undefined;
        });
      }
    }
    return this._styleElement;
  }

  private _createStyleElement(): HTMLStyleElement {
    const head: HTMLHeadElement = document.head;
    const styleElement = document.createElement('style');
    let nodeToInsertBefore: Node | null = null;

    styleElement.setAttribute('data-merge-styles', 'true');

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

  private _getConstructibleStylesheet(): CSSStyleSheet {
    if (!this._constructibleSheet) {
      this._constructibleSheet = this._createConstructibleStylesheet();

      // _global[ADOPTED_STYLESHEETS]!.raise('add-sheet', { key: this._stylesheetKey!, sheet: this });
      // Reset the style element on the next frame.
      // window.requestAnimationFrame(() => {
      //   this._styleElement = undefined;
      // });
    }

    return this._constructibleSheet;
  }

  private _createConstructibleStylesheet(): CSSStyleSheet {
    const sheet = new CSSStyleSheet();

    // eslint-disable-next-line
    // @ts-ignore this exists
    // document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

    return sheet;
  }

  private _findPlaceholderStyleTag(): Element | null {
    const head: HTMLHeadElement = document.head;
    if (head) {
      return head.querySelector('style[data-merge-styles]');
    }
    return null;
  }
}
