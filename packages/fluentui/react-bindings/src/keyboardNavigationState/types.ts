export type KeyboardNavigationStateChangeCallback = (isNavigatingWithKeyboard: boolean) => void;

export interface KeyboardNavigationState {
  subscribe(callback: KeyboardNavigationStateChangeCallback): void;
  unsubscribe(callback: KeyboardNavigationStateChangeCallback): void;
  set(isNavigatingWithKeyboard: boolean): void;
  get(): boolean;
}
