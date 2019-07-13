let _warningCallback: ((message: string) => void) | undefined = undefined;

export type ISettingsMap<T> = { [P in keyof T]?: string };

/**
 * Sends a warning to console, if the api is present.
 *
 * @public
 * @param message - Warning message.
 */
export function warn(message: string): void {
  if (_warningCallback && process.env.NODE_ENV !== 'production') {
    _warningCallback(message);
  } else if (console && console.warn) {
    console.warn(message);
  }
}

/**
 * Configures the warning callback. Passing in undefined will reset it to use the default
 * console.warn function.
 *
 * @public
 * @param warningCallback - Callback to override the generated warnings.
 */
export function setWarningCallback(warningCallback?: (message: string) => void): void {
  _warningCallback = warningCallback;
}
