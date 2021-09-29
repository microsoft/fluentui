import * as React from 'react';
import { createKeyborg, disposeKeyborg, Keyborg } from 'keyborg';
import { KeyboardNavigationState, KeyboardNavigationStateChangeCallback } from './types';

class KeyboardNavigationStateImpl implements KeyboardNavigationState {
  private _keyborg?: Keyborg;
  private _callbacks: KeyboardNavigationStateChangeCallback[] = [];
  private _documentElement?: HTMLElement;

  constructor(target: Window) {
    if (target) {
      this._keyborg = createKeyborg(target);
      this._keyborg.subscribe(this._onChange);
    }
    this._documentElement = target.document.documentElement;
    this._setAttribute();
  }

  static dispose(instance: KeyboardNavigationState): void {
    (instance as KeyboardNavigationStateImpl)._dispose();
  }

  private _dispose(): void {
    this._callbacks = [];

    if (this._documentElement) {
      this._setAttribute(true);
      delete this._documentElement;
    }

    if (this._keyborg) {
      this._keyborg.unsubscribe(this._onChange);

      disposeKeyborg(this._keyborg);

      delete this._keyborg;
    }
  }

  private _setAttribute(remove?: boolean) {
    if (this._documentElement) {
      if (remove) {
        this._documentElement.removeAttribute('data-keyborg');
      } else if (this._keyborg) {
        this._documentElement.setAttribute(
          'data-keyborg',
          this._keyborg.isNavigatingWithKeyboard() ? 'keyboard' : 'mouse',
        );
      }
    }
  }

  private _onChange = (isNavigatingWithKeyboard: boolean) => {
    this._callbacks.forEach(callback => callback(isNavigatingWithKeyboard));
  };

  subscribe(callback: KeyboardNavigationStateChangeCallback): void {
    const index = this._callbacks.indexOf(callback);

    if (index < 0) {
      this._callbacks.push(callback);
    }
  }

  unsubscribe(callback: KeyboardNavigationStateChangeCallback): void {
    const index = this._callbacks.indexOf(callback);

    if (index >= 0) {
      this._callbacks.splice(index, 1);
    }
  }

  setVal(isNavigatingWithKeyboard: boolean): void {
    this._keyborg?.setVal(isNavigatingWithKeyboard);
  }

  isNavigatingWithKeyboard(): boolean {
    return !!this._keyborg?.isNavigatingWithKeyboard();
  }
}

export const useKeyboardNavigationStateRef = (
  target: Window | undefined,
): React.MutableRefObject<KeyboardNavigationState | undefined> => {
  const keyboardNavigationState = React.useRef<KeyboardNavigationState | undefined>(undefined);

  if (target && !keyboardNavigationState.current) {
    keyboardNavigationState.current = new KeyboardNavigationStateImpl(target);
  }

  return keyboardNavigationState;
};

export const disposeKeyboardNavigationState = (ref: React.MutableRefObject<KeyboardNavigationState | undefined>) => {
  if (ref.current) {
    KeyboardNavigationStateImpl.dispose(ref.current);
  }
};
