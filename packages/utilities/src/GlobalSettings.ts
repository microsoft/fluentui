/**
 * Storing global state in local module variables has issues when more than one copy
 * if the module gets loaded on the page (due to a bundling error or simply by consuming
 * a prebundled script.)
 *
 * This file contains helpers to deal with the getting and setting local state, and allows
 * callers to get called back when it mutates.
 */

const GLOBAL_SETTINGS_PROP_NAME = '__globalSettings__';
const CALLBACK_STATE_PROP_NAME = '__callbacks__';

let _globalSettings: { [key: string]: any } = {};
let _counter = 0;

if (typeof window !== 'undefined') {
  let win = window as any;

  _globalSettings = win[GLOBAL_SETTINGS_PROP_NAME] = win[GLOBAL_SETTINGS_PROP_NAME] || {
    [CALLBACK_STATE_PROP_NAME]: {}
  };
}

const _callbacks = _globalSettings[CALLBACK_STATE_PROP_NAME];

/**
 * Change description used for change callbacks in GlobalSettings.
 *
 * @public
 */
export interface IChangeDescription {
  key: string;
  oldValue: any;
  value: any;
}

/**
 * Change event callback.
 *
 * @public
 */
export interface IChangeEventCallback {
  __id__?: string;
  (changeDescription?: IChangeDescription): void;
}

/**
 * Global settings helper, which stores settings in the global (window) namespace.
 * If window is not provided, it will store settings in module scope. Provides a
 * way to observe changes as well when their values change.
 *
 * @public
 */
export class GlobalSettings {
  public static getValue(key: string): any {
    return _globalSettings[key];
  }

  public static setValue(key: string, value: any): void {
    let oldValue = _globalSettings[key];

    if (value !== oldValue) {
      _globalSettings[key] = value;

      let changeDescription = {
        oldValue,
        value,
        key
      };

      for (let id in _callbacks) {
        if (_callbacks.hasOwnProperty(id)) {
          _callbacks[id](changeDescription);
        }
      }
    }
  }

  public static addChangeListener(cb: IChangeEventCallback): void {
    let id = cb.__id__;

    if (!id) {
      id = cb.__id__ = String(_counter++);
    }

    _callbacks[id] = cb;
  }

  public static removeChangeListener(cb: IChangeEventCallback): void {
    delete _callbacks[cb.__id__ as string];
  }

}
