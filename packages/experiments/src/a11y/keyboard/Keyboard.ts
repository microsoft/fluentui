/**
 * This interface is defined to have the minimum required properties of JavaScript's KeyboardEvent
 * It also gives us the benefit of having a single interface that matches both KeyboardEvent and React.KeybaordEvent
 *
 * @internalremarks Keep this interface compliant with JavaScript's KeyboardEvent.
 *
 * @public
 */
export interface IKeyboardEvent {
  keyCode: number;
  altKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  target: EventTarget;

  preventDefault(): void;
  stopPropagation(): void;
}

/**
 * Interface to define state of Ctrl, Alt and Shift keys
 *
 * @public
 */
export interface IModifierKeys {
  alt?: boolean;
  ctrl?: boolean;
  shift?: boolean;
}

/**
 * Utility methods that help working with keyboard events
 *
 * @public
 */
export default class Keyboard {
  /**
   * Checks if a keyboard event key code is for Escape key
   */
  public static isEscape(e: IKeyboardEvent): boolean {
    return Keyboard.isKey(27, e);
  }

  /**
   * Checks if a keyboard event key code is for Enter key
   */
  public static isEnter(e: IKeyboardEvent): boolean {
    return Keyboard.isKey(13, e);
  }

  /**
   * Checks if a keyboard event key code is for Shift+Tab combination
   */
  public static isShiftTab(e: IKeyboardEvent): boolean {
    return Keyboard.isKey(9, e, {shift: true});
  }

  /**
   * Checks if a keyboard event key code is for Tab key
   */
  public static isTab(e: IKeyboardEvent): boolean {
    return Keyboard.isKey(9, e);
  }

  /**
   * Checks if a keyboard event key code matches a specific key with a given combination of Ctrl, Alt, Shift.
   *
   * @param keyCode - The key code to be checked
   * @param event - The keyboard event to be matched
   * @param allowedCtrlKeys - A combination of ctrl, alt, shift. The modifier check is always enforced by this
   *  method. If this paramater or a any members of it is undefined, it will default to false. This method does NOT
   *  provide a way to do a check regardless of modifier keys.
   */
  public static isKey(
    keyCode: number,
    event: IKeyboardEvent,
    allowedModifiers?: IModifierKeys
  ): boolean {
    // Use '!' to explicitly convert to boolean before comparison
    if (!(allowedModifiers && allowedModifiers.alt) !== !event.altKey) {
      return false;
    }

    if (!(allowedModifiers && allowedModifiers.ctrl) !== !event.ctrlKey) {
      return false;
    }

    if (!(allowedModifiers && allowedModifiers.shift) !== !event.shiftKey) {
      return false;
    }
    return event.keyCode === keyCode;
  }
}
