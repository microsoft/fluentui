import { IStyle } from './IStyle';

export const enum InjectionMode {
  none = 0,
  insertNode = 1
}

export interface IStyleSheetConfig {
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

  public setConfig(config?: IStyleSheetConfig): void {
    this._config = {
      ...this._config,
      ...config
    };
  }

  public getClassName(displayName?: string): string {
    const prefix = displayName || 'css';

    return `${prefix}-${this._counter++}`;
  }

  public classNameFromKey(key: string): string | undefined {
    return this._keyToClassName[key];
  }

  public cacheClassName(className: string, key: string, args: IStyle[]): void {
    this._keyToClassName[key] = className;
    this._classNameToArgs[className] = args;
  }

  public argsFromClassName(className: string): IStyle[] | undefined {
    return this._classNameToArgs[className];
  }

  public insertRule(
    rule: string
  ): void {
    const element = this._getElement();
    const injectionMode = element ? this._config.injectionMode : InjectionMode.none;

    switch (injectionMode) {
      case InjectionMode.insertNode:
        const { sheet } = element;

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

  public getRules(): string {
    return (this._rules.join('') || '') + (this._rulesToInsert.join('') || '');
  }

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

  private _getElement(): HTMLStyleElement {
    if (!this._styleElement) {
      this._styleElement = document.createElement('style');
      document.head.appendChild(this._styleElement);
    }

    return this._styleElement;
  }
}
