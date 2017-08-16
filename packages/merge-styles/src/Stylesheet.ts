import { GlobalSettings } from '@uifabric/utilities/lib/GlobalSettings';
import { FabricPerformance } from '@uifabric/utilities/lib/FabricPerformance';
import { IStyle } from './IStyle';
const STYLESHEET_SETTING = 'stylesheet';

export const enum InjectionMode {
  none = 0,
  insertNode = 1,
  appendChild = 2
}

export interface IStyleSheetConfig {
  async?: boolean;
  injectionMode?: InjectionMode;
}

/**
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
    return GlobalSettings.getValue(STYLESHEET_SETTING, () => new Stylesheet());
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
    let prefix = displayName || 'css';

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
    rule: string,
    forceSync: boolean = false
  ): void {
    if (this._config.async && !forceSync) {
      this._rulesToInsert.push(rule);
      if (!this._timerId) {
        this._timerId = setTimeout(() => {
          this._timerId = 0;
          this._insertRule(this._rulesToInsert);
          this._rulesToInsert = [];
        }, 0);
      }
    } else {
      this._insertRule(rule);
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

  private _insertRule(rule: string | string[]): void {
    let element = this._getElement();
    let injectionMode = element ? this._config.injectionMode : InjectionMode.none;

    switch (injectionMode) {

      case InjectionMode.appendChild:
        FabricPerformance.measure('appendChild', () => {
          element.appendChild(document.createTextNode(
            (Array.isArray(rule)) ? rule.join('') : rule
          ));
        });
        break;

      case InjectionMode.insertNode:
        let { sheet } = element;
        if (Array.isArray(rule)) {
          for (let i = 0; i < rule.length; i++) {
            this._insertRule(rule[i]);
          }
        } else {
          FabricPerformance.measure('insertRule', () => {
            try {
              // tslint:disable-next-line:no-any
              (sheet as any).insertRule(rule, (sheet as any).cssRules.length);
            } catch (e) {
              console.log(
                `insertRule failed.\n${e}\nRule: ${rule}`
              );
            }

          });
        }
        break;

      default:
        if (Array.isArray(rule)) {
          this._rules = this._rules.concat(rule);
        } else {
          this._rules.push(rule);
        }
        break;
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
