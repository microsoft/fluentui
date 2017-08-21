import { IStyle } from './IStyle';

/**
 * Injection mode for the stylesheet.
 *
 * @public
 */
export const enum InjectionMode {
  /**
   * Avoids style injection, use getRules() to read the styles.
   */
  none = 0,

  /**
   * Inserts rules using the insertRule api.
   */
  insertNode = 1
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
}

const STYLESHEET_SETTING = '__stylesheet__';

let _stylesheet: Stylesheet;

/**
 * Represents the state of styles registered in the page. Abstracts
 * the surface for adding styles to the stylesheet, exposes helpers
 * for reading the styles registered in server rendered scenarios.
 *
 * @public
 */
export class Stylesheet {
  private _styleElement: HTMLStyleElement;
  private _rules: string[];
  private _config: IStyleSheetConfig;
  private _rulesToInsert: string[];
  private _timerId: number;
  private _counter: number;
  private _keyToClassName: { [key: string]: string };

  // tslint:disable-next-line:no-any
  private _classNameToArgs: { [key: string]: any };

  /**
   * Gets the singleton instance.
   */
  public static getInstance(): Stylesheet {
    // tslint:disable-next-line:no-any
    const win: any = typeof window !== 'undefined' ? window : {};
    _stylesheet = win[STYLESHEET_SETTING] as Stylesheet;

    if (!_stylesheet) {
      _stylesheet = win[STYLESHEET_SETTING] = new Stylesheet();
    }

    return _stylesheet;
  }

  constructor(config?: IStyleSheetConfig) {
    this._config = {
      async: false,
      injectionMode: InjectionMode.insertNode,
      ...config
    };

    this.reset();
  }

  /**
   * Configures the stylesheet.
   */
  public setConfig(config?: IStyleSheetConfig): void {
    this._config = {
      ...this._config,
      ...config
    };
  }

  /**
   * Generates a unique classname.
   *
   * @param displayName - Optional value to use as a prefix.
   */
  public getClassName(displayName?: string): string {
    const prefix = displayName || 'css';

    return `${prefix}-${this._counter++}`;
  }

  /**
   * Used internally to cache information about a class which was
   * registered with the stylesheet.
   */
  public cacheClassName(className: string, key: string, args: IStyle[]): void {
    this._keyToClassName[key] = className;
    this._classNameToArgs[className] = args;
  }

  /**
   * Gets the appropriate classname given a key which was previously
   * registered using cacheClassName.
   */
  public classNameFromKey(key: string): string | undefined {
    return this._keyToClassName[key];
  }

  /**
   * Gets the arguments associated with a given classname which was
   * previously registered using cacheClassName.
   */
  public argsFromClassName(className: string): IStyle[] | undefined {
    return this._classNameToArgs[className];
  }

  /**
   * Inserts a css rule into the stylesheet.
   */
  public insertRule(
    rule: string
  ): void {
    const element = this._getElement();
    const injectionMode = element ? this._config.injectionMode : InjectionMode.none;

    switch (injectionMode) {
      case InjectionMode.insertNode:
        const { sheet } = element!;

        try {
          // tslint:disable-next-line:no-any
          (sheet as any).insertRule(rule, (sheet as any).cssRules.length);
        } catch (e) {
          /* no-op on errors */
        }
        break;

      default:
        this._rules.push(rule);
        break;
    }
  }

  /**
   * Gets all rules registered with the stylesheet; only valid when
   * using InsertionMode.none.
   */
  public getRules(): string {
    return (this._rules.join('') || '') + (this._rulesToInsert.join('') || '');
  }

  /**
   * Resets the internal state of the stylesheet. Only used in server
   * rendered scenarios where we're using InsertionMode.none.
   */
  public reset(): void {
    this._rules = [];
    this._rulesToInsert = [];
    this._counter = 0;
    this._classNameToArgs = {};
    this._keyToClassName = {};

    if (this._timerId) {
      clearTimeout(this._timerId);
      this._timerId = 0;
    }
  }

  private _getElement(): HTMLStyleElement | undefined {
    if (!this._styleElement && typeof document !== 'undefined') {
      this._styleElement = document.createElement('style');
      document.head.appendChild(this._styleElement);
    }

    return this._styleElement;
  }
}
