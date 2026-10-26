import { getFormatShortcutLabel, getRunShortcutLabel, getSaveShortcutLabel, isSaveShortcut } from './shortcuts';

const WINDOWS_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/128.0';
const LINUX_UA = 'Mozilla/5.0 (X11; Linux x86_64) Chrome/128.0';
const ANDROID_UA = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) Chrome/128.0';
const MAC_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1';

describe('shortcuts', () => {
  it('returns the platform specific "Format Document" shortcut', () => {
    expect(getFormatShortcutLabel(WINDOWS_UA)).toBe('Shift+Alt+F');
    expect(getFormatShortcutLabel(LINUX_UA)).toBe('Ctrl+Shift+I');
    expect(getFormatShortcutLabel(ANDROID_UA)).toBe('Shift+Alt+F');
    expect(getFormatShortcutLabel(MAC_UA)).toBe('Shift+Option+F');
    expect(getFormatShortcutLabel('')).toBe('Shift+Alt+F');
  });

  it('returns the platform specific "Run" shortcut', () => {
    expect(getRunShortcutLabel(WINDOWS_UA)).toBe('Ctrl+Enter');
    expect(getRunShortcutLabel(LINUX_UA)).toBe('Ctrl+Enter');
    expect(getRunShortcutLabel(MAC_UA)).toBe('Cmd+Enter');
    expect(getRunShortcutLabel('')).toBe('Ctrl+Enter');
  });

  it('returns the platform specific "Save" shortcut', () => {
    expect(getSaveShortcutLabel(WINDOWS_UA)).toBe('Ctrl+S');
    expect(getSaveShortcutLabel(MAC_UA)).toBe('Cmd+S');
  });

  it('detects the platform specific "Save" shortcut', () => {
    const key = { key: 's', ctrlKey: false, metaKey: false, altKey: false, shiftKey: false };

    expect(isSaveShortcut({ ...key, ctrlKey: true }, WINDOWS_UA)).toBe(true);
    expect(isSaveShortcut({ ...key, key: 'S', ctrlKey: true }, LINUX_UA)).toBe(true);
    expect(isSaveShortcut({ ...key, metaKey: true }, WINDOWS_UA)).toBe(false);
    expect(isSaveShortcut({ ...key, metaKey: true }, MAC_UA)).toBe(true);
    expect(isSaveShortcut({ ...key, ctrlKey: true }, MAC_UA)).toBe(false);
    expect(isSaveShortcut({ ...key, ctrlKey: true, shiftKey: true }, WINDOWS_UA)).toBe(false);
    expect(isSaveShortcut({ ...key, key: 'a', ctrlKey: true }, WINDOWS_UA)).toBe(false);
  });
});
