import * as theme from './theme';
import { DefaultTypography } from './DefaultTypography';
import { IPartialTheme, ITypography } from '../interfaces/index';

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

describe('loadTheme', () => {
  describe('typography', () => {
    it('expands sizes', () => {
      const userTheme: IPartialTheme = {
        typography: {
          variants: {
            default: {
              fontFamily: 'monospacej',
              fontSize: 'small',
              fontWeight: 'bold',
              color: 'themePrimary'
            }
          }
        }
      };

      const newTheme = theme.loadTheme(userTheme);

      expect(newTheme.typography.variants.default.fontSize).toEqual(DefaultTypography.sizes.small);
    });

    it('updates the variants when sizes are adjusted', () => {
      const userTheme = {
        typography: {
          sizes: {
            medium: '100px'
          }
        }
      } as IPartialTheme;

      theme.loadTheme(userTheme);

      const newTheme = theme.getTheme();

      expect(newTheme.typography.variants.default.fontSize).toEqual('100px');
    });

    it('does not modify DefaultTypography when given a theme with no typography', () => {
      const previousDefault = { ...DefaultTypography };
      theme.loadTheme({
        palette: {
          themePrimary: '#ff0000'
        }
      });
      expect(DefaultTypography).toEqual(previousDefault);
    });

    it('does not modify DefaultTypography when given a theme with typography', () => {
      const previousDefault = { ...DefaultTypography };
      theme.loadTheme({
        typography: {
          variants: {
            default: {
              fontFamily: 'Comic Sans MS',
              fontSize: '18px',
              fontWeight: 500
            }
          }
        }
      });
      expect(DefaultTypography).toEqual(previousDefault);
    });
  });
});
