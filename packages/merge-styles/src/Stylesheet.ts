import { IStyle } from './IStyle';

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

export type InjectionMode = typeof InjectionMode[keyof typeof InjectionMode];

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
/**
 * MSIE 11 doesn't cascade styles based on DOM ordering, but rather on the order that each style node
 * is created. As such, to maintain consistent priority, IE11 should reuse a single style node.
 */
const REUSE_STYLE_NODE = typeof navigator !== 'undefined' && /rv:11.0/.test(navigator.userAgent);

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
  private _counter = 0;
  private _keyToClassName: { [key: string]: string } = {};
  private _onInsertRuleCallbacks: Function[] = [];
  private _onResetCallbacks: Function[] = [];
  private _classNameToArgs: { [key: string]: { args: any; rules: string[] } } = {};

  /**
   * Gets the singleton instance.
   */
  public static getInstance(): Stylesheet {
    _stylesheet = _global[STYLESHEET_SETTING] as Stylesheet;

    if (!_stylesheet || (_stylesheet._lastStyleElement && _stylesheet._lastStyleElement.ownerDocument !== document)) {
      const fabricConfig = _global?.FabricConfig || {};

      const stylesheet = new Stylesheet(fabricConfig.mergeStyles, fabricConfig.serializedStylesheet);
      _stylesheet = stylesheet;
      _global[STYLESHEET_SETTING] = stylesheet;
    }

    return _stylesheet;
  }

  constructor(config?: IStyleSheetConfig, serializedStylesheet?: ISerializedStylesheet) {
    this._config = {
      // If there is no document we won't have an element to inject into.
      injectionMode: typeof document === 'undefined' ? InjectionMode.none : InjectionMode.insertNode,
      defaultPrefix: 'css',
      namespace: undefined,
      cspSettings: undefined,
      ...config,
    };

    this._classNameToArgs = serializedStylesheet?.classNameToArgs ?? this._classNameToArgs;
    this._counter = serializedStylesheet?.counter ?? this._counter;
    this._keyToClassName = this._config.classNameCache ?? serializedStylesheet?.keyToClassName ?? this._keyToClassName;
    this._preservedRules = serializedStylesheet?.preservedRules ?? this._preservedRules;
    this._rules = serializedStylesheet?.rules ?? this._rules;
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
    const element = injectionMode !== InjectionMode.none ? this._getStyleElement() : undefined;

    if (preserve) {
      this._preservedRules.push(rule);
    }

    if (element) {
      switch (injectionMode) {
        case InjectionMode.insertNode:
          const { sheet } = element!;

          try {
            (sheet as CSSStyleSheet).insertRule(rule, (sheet as CSSStyleSheet).cssRules.length);
          } catch (e) {
            // The browser will throw exceptions on unsupported rules (such as a moz prefix in webkit.)
            // We need to swallow the exceptions for this scenario, otherwise we'd need to filter
            // which could be slower and bulkier.
          }
          break;

        case InjectionMode.appendChild:
          element.appendChild(document.createTextNode(rule));
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

  private _findPlaceholderStyleTag(): Element | null {
    const head: HTMLHeadElement = document.head;
    if (head) {
      return head.querySelector('style[data-merge-styles]');
    }
    return null;
  }
}
