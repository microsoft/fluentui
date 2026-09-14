/** `true` for macOS / iOS user agents, where Monaco binds `Cmd`/`Option` instead of `Ctrl`/`Alt`. */
export function isAppleDevice(userAgent: string): boolean {
  return /macintosh|mac os|iphone|ipad/i.test(userAgent);
}

/**
 * Keyboard shortcut of Monaco's built-in "Format Document" action for the current platform
 * (`editor.action.formatDocument`: Shift+Alt+F, but Ctrl+Shift+I on Linux).
 */
export function getFormatShortcutLabel(userAgent: string): string {
  if (isAppleDevice(userAgent)) {
    return 'Shift+Option+F';
  }
  if (/linux/i.test(userAgent) && !/android/i.test(userAgent)) {
    return 'Ctrl+Shift+I';
  }
  return 'Shift+Alt+F';
}

/** Keyboard shortcut of the playground "Run" action (`CtrlCmd+Enter`). */
export function getRunShortcutLabel(userAgent: string): string {
  return isAppleDevice(userAgent) ? 'Cmd+Enter' : 'Ctrl+Enter';
}
