import { getWindow } from './dom/getWindow';

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

let _counter = 0;

/**
 * Change description used for change callbacks in GlobalSettings.
 *
 * @public
 * {@docCategory IChangeDescription}
 */
export interface IChangeDescription {
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  oldValue: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

/**
 * Change event callback.
 *
 * @public
 * {@docCategory IChangeEventCallback}
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
 * {@docCategory GlobalSettings}
 */
export class GlobalSettings {
  public static getValue<T>(key: string, defaultValue?: T | (() => T)): T {
    const globalSettings = _getGlobalSettings();

    if (globalSettings[key] === undefined) {
      globalSettings[key] = typeof defaultValue === 'function' ? (defaultValue as Function)() : defaultValue;
    }

    return globalSettings[key];
  }

  public static setValue<T>(key: string, value: T): T {
    const globalSettings = _getGlobalSettings();
    const callbacks = globalSettings[CALLBACK_STATE_PROP_NAME];
    let oldValue = globalSettings[key];

    if (value !== oldValue) {
      globalSettings[key] = value;

      let changeDescription = {
        oldValue,
        value,
        key,
      };

      for (let id in callbacks) {
        if (callbacks.hasOwnProperty(id)) {
          callbacks[id](changeDescription);
        }
      }
    }

    return value;
  }

  public static addChangeListener(cb: IChangeEventCallback): void {
    // Note: we use generated ids on the callbacks to create a map of the callbacks, which optimizes removal.
    // (It's faster to delete a key than it is to look up the index of an object and splice an array.)
    let id = cb.__id__;
    const callbacks = _getCallbacks();

    if (!id) {
      id = cb.__id__ = String(_counter++);
    }

    callbacks[id] = cb;
  }

  public static removeChangeListener(cb: IChangeEventCallback): void {
    const callbacks = _getCallbacks();
    delete callbacks[cb.__id__ as string];
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _getGlobalSettings(): { [key: string]: any } {
  const win = getWindow();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globalObj: { [key: string]: any } = win || {};

  if (!globalObj[GLOBAL_SETTINGS_PROP_NAME]) {
    globalObj[GLOBAL_SETTINGS_PROP_NAME] = {
      [CALLBACK_STATE_PROP_NAME]: {},
    };
  }

  return globalObj[GLOBAL_SETTINGS_PROP_NAME];
}

function _getCallbacks(): { [key: string]: () => void } {
  const globalSettings = _getGlobalSettings();
  return globalSettings[CALLBACK_STATE_PROP_NAME];
}
