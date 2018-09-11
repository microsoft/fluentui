import { registerOnThemeChangeCallback, removeOnThemeChangeCallback, loadTheme, createTheme } from './theme';
import { DefaultTypography } from './DefaultTypography';
import { IPartialTheme, ITypography } from '../interfaces/index';

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

describe('theme.typography', () => {
  it('expands sizes', () => {
    const userTheme: IPartialTheme = {
      typography: {
        variants: {
          default: {
            family: 'monospace',
            size: 'small',
            weight: 'bold',
            color: 'link'
          }
        }
      }
    };

    const newTheme = createTheme(userTheme);

    expect(newTheme.typography.variants.default.size).toEqual(DefaultTypography.sizes.small);
  });

  it('updates the variants when sizes are adjusted', () => {
    const userTheme = {
      typography: {
        sizes: {
          [DefaultTypography.variants.default.size!]: '100px'
        }
      }
    } as IPartialTheme;

    const newTheme = createTheme(userTheme);

    expect(newTheme.typography.variants.default.size).toEqual('100px');
  });

  it('does not modify DefaultTypography when given a theme with no typography', () => {
    const previousDefault = { ...DefaultTypography };
    const newTheme = createTheme({
      palette: {
        themePrimary: '#ff0000'
      }
    });
    expect(DefaultTypography).toEqual(previousDefault);
  });
});
