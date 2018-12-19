import { registerOnThemeChangeCallback, removeOnThemeChangeCallback, loadTheme, createTheme } from './theme';
import { IPartialTheme } from '../interfaces/index';

describe('registerOnThemeChangeCallback', () => {
  let callback = jest.fn();

  it('registers a callback successfully', () => {
    registerOnThemeChangeCallback(callback);
    expect(callback.mock.calls.length).toBe(0);
  });

  it('calls the previously registered callback', () => {
    loadTheme({});
    expect(callback.mock.calls.length).toBe(1);
  });

  it('calls the previously registered callback (again)', () => {
    loadTheme({});
    expect(callback.mock.calls.length).toBe(2);
  });

  it('unregisters the callback, and doesnt call it again', () => {
    removeOnThemeChangeCallback(callback);
    expect(callback.mock.calls.length).toBe(2);
    loadTheme({});
    expect(callback.mock.calls.length).toBe(2);
  });

  it('didnt pass null to the callback', () => {
    expect(callback.mock.calls[0][0]).toBeTruthy();
    expect(callback.mock.calls[1][0]).toBeTruthy();
  });
});
