import { registerOnThemeChangeCallback, removeOnThemeChangeCallback, loadTheme, createTheme, getTheme } from './theme';
import { IPartialTheme } from '../interfaces/index';
import { resolveFontChoice } from '@uifabric/theming-core';

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
  const defaultTheme = getTheme();
  const defaultTypography = defaultTheme.typography;

  it('expands sizes', () => {
    const userTheme: IPartialTheme = {
      typography: {
        variants: {
          standard: {
            fontFamily: 'monospace',
            fontSize: 'small',
            fontWeight: 'bold'
          }
        }
      }
    };

    const newTheme = createTheme(userTheme);

    const fontStyle = resolveFontChoice({ fontVariant: 'standard' }, newTheme.typography);
    expect(fontStyle.fontSize).toEqual(defaultTypography.sizes.small);
  });

  it('updates the variants when sizes are adjusted', () => {
    const userTheme = {
      typography: {
        sizes: {
          [defaultTypography.variants.standard.fontSize!]: '100px'
        }
      }
    } as IPartialTheme;

    const newTheme = createTheme(userTheme);

    const fontStyle = resolveFontChoice({ fontVariant: 'standard' }, newTheme.typography);
    expect(fontStyle.fontSize).toEqual('100px');
  });

  it('does not modify DefaultTypography when given a theme with no typography', () => {
    const previousDefault = { ...defaultTypography };
    const newTheme = createTheme({
      palette: {
        themePrimary: '#ff0000'
      }
    });
    expect(defaultTypography).toEqual(previousDefault);
  });
});
