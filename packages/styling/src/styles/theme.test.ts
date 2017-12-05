import * as theme from './theme';

describe('registerOnThemeChangeCallback', () => {
  /*let counter = 0;
  let callback = (t: ITheme) => {
    expect(t).toBeTruthy();
    counter++;
  };*/
  let callback = jest.fn();

  it('doesnt do anything yet', () => {
    theme.loadTheme({});
    expect(callback.mock.calls.length).toBe(0);
  });

  it('registers a callback successfully', () => {
    theme.registerOnThemeChangeCallback(callback);
    expect(callback.mock.calls.length).toBe(0);
  });

  it('calls the previously registered callback', () => {
    theme.loadTheme({});
    expect(callback.mock.calls.length).toBe(1);
  });

  it('calls the previously registered callback (again)', () => {
    theme.loadTheme({});
    expect(callback.mock.calls.length).toBe(2);
  });

  it('unregisters the callback, and doesnt call it again', () => {
    theme.removeOnThemeChangeCallback(callback);
    expect(callback.mock.calls.length).toBe(2);
    theme.loadTheme({});
    expect(callback.mock.calls.length).toBe(2);
  });

  it('didnt pass null to the callback', () => {
    expect(callback.mock.calls[0][0]).toBeTruthy();
    expect(callback.mock.calls[1][0]).toBeTruthy();
  });
});