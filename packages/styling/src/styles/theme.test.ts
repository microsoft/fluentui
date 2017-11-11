import * as theme from './theme';
import { ITheme } from '../interfaces/index';

describe('registerOnThemeChangeCallback', () => {
  let counter = 0;
  let callback = (t: ITheme) => {
    expect(t).toBeTruthy();
    counter++;
  };

  it('doesnt do anything yet', () => {
    theme.loadTheme({});
    expect(counter).toEqual(0);
  });

  it('registers a callback successfully', () => {
    theme.registerOnThemeChangeCallback(callback);
    expect(counter).toEqual(0);
  });

  it('calls the previously registered callback', () => {
    theme.loadTheme({});
    expect(counter).toEqual(1);
  });

  it('calls the previously registered callback (again)', () => {
    theme.loadTheme({});
    expect(counter).toEqual(2);
  });

  it('unregisters the callback, and doesnt call it again', () => {
    theme.removeOnThemeChangeCallback(callback);
    expect(counter).toEqual(2);
    theme.loadTheme({});
    expect(counter).toEqual(2);
  });
});