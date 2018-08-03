import * as theme from './theme';
import { DefaultTypography } from './DefaultTypography';

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
    it('preserves the default typography when given an empty theme', () => {
      const userTheme = {};
      theme.loadTheme(userTheme);
      const newTheme = theme.getTheme();
      expect(newTheme.typography).toEqual(DefaultTypography);
    });

    it('preserves the default typography when given a theme with no typography', () => {
      const userTheme = {
        palette: {
          themePrimary: 'red'
        }
      };
      theme.loadTheme(userTheme);
      const newTheme = theme.getTheme();
      expect(newTheme.typography).toEqual(DefaultTypography);
    });

    it('preserves the default typography sizes when given a theme with no typography sizes', () => {
      const userTheme = {
        typography: {
          weights: {
            light: 100
          }
        }
      };
      theme.loadTheme(userTheme);
      const newTheme = theme.getTheme();
      expect(newTheme.typography.sizes).toEqual(DefaultTypography.sizes);
    });

    it('preserves the default typography sizes when given a theme with empty typography sizes', () => {
      const userTheme = {
        typography: {
          sizes: {}
        }
      };
      theme.loadTheme(userTheme);
      const newTheme = theme.getTheme();
      expect(newTheme.typography.sizes).toEqual(DefaultTypography.sizes);
    });

    it('overrides the given font sizes and preserves the default sizes', () => {
      const userTheme = {
        typography: {
          sizes: {
            tiny: '12px',
            large: '24px'
          }
        }
      };
      theme.loadTheme(userTheme);
      const newTheme = theme.getTheme();
      expect(newTheme.typography.sizes.tiny).toEqual(userTheme.typography.sizes.tiny);
      expect(newTheme.typography.sizes.large).toEqual(userTheme.typography.sizes.large);
      expect(newTheme.typography.sizes.xSmall).toEqual(DefaultTypography.sizes.xSmall);
      expect(newTheme.typography.sizes.small).toEqual(DefaultTypography.sizes.small);
      expect(newTheme.typography.sizes.medium).toEqual(DefaultTypography.sizes.medium);
      expect(newTheme.typography.sizes.xLarge).toEqual(DefaultTypography.sizes.xLarge);
      expect(newTheme.typography.sizes.xxLarge).toEqual(DefaultTypography.sizes.xxLarge);
      expect(newTheme.typography.sizes.xxxLarge).toEqual(DefaultTypography.sizes.xxxLarge);
      expect(newTheme.typography.sizes.mega).toEqual(DefaultTypography.sizes.mega);
    });
  });
});
