export type KeyboardNavigationStateChangeCallback = (isNavigatingWithKeyboard: boolean) => void;

export interface KeyboardNavigationState {
  subscribe(callback: KeyboardNavigationStateChangeCallback): void;
  unsubscribe(callback: KeyboardNavigationStateChangeCallback): void;
  setVal(isNavigatingWithKeyboard: boolean): void;
  isNavigatingWithKeyboard(): boolean;
}
