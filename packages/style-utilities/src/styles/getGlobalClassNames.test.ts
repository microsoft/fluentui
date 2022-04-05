import { getGlobalClassNames } from './getGlobalClassNames';
import { createTheme } from './theme';
import { Stylesheet } from '@fluentui/merge-styles';
import type { ITheme } from '../interfaces/index';

const styleSheet = Stylesheet.getInstance();

describe('getGlobalClassNames', () => {
  beforeEach(() => {
    styleSheet.reset();
  });

  it('returns a generated classname when the global styles are disabled', () => {
    const theme = createTheme({ disableGlobalClassNames: true });

    expect(getGlobalClassNames({ root: 'ms-Link', label: 'ms-Label' }, theme)).toEqual({
      root: 'ms-Link-0',
      label: 'ms-Label-1',
    });
  });

  describe('calls are memoized', () => {
    let theme: ITheme;
    let globalClassnames: { [key: string]: string };

    beforeAll(() => {
      theme = createTheme({ disableGlobalClassNames: true });
      globalClassnames = { root: 'ms-Memoized' };
    });

    it('multiple calls with the same instance of classnames return the same set of global classnames', () => {
      expect(getGlobalClassNames(globalClassnames, createTheme({ disableGlobalClassNames: true }), true)).toEqual({
        root: 'ms-Memoized-0',
      });
      expect(getGlobalClassNames(globalClassnames, createTheme({ disableGlobalClassNames: true }))).toEqual({
        root: 'ms-Memoized-0',
      });
      expect(getGlobalClassNames(globalClassnames, createTheme({ disableGlobalClassNames: false }), true)).toEqual({
        root: 'ms-Memoized-0',
      });
    });

    it('calls with different arguments returns a different set of global classnames', () => {
      expect(getGlobalClassNames(globalClassnames, theme)).toEqual({ root: 'ms-Memoized-0' });
      expect(getGlobalClassNames({ ...globalClassnames }, theme)).toEqual({ root: 'ms-Memoized-1' });
      expect(getGlobalClassNames(globalClassnames, theme)).toEqual({ root: 'ms-Memoized-0' });
      expect(getGlobalClassNames(globalClassnames, { ...theme })).toEqual({ root: 'ms-Memoized-0' });
    });
  });

  it('returns correct classNames when global classes are enabled; disableGlobalClassNames has priority', () => {
    const theme = createTheme({ disableGlobalClassNames: true });

    expect(getGlobalClassNames({ root: 'ms-Link' }, theme, false)).toEqual({ root: 'ms-Link' });
  });
});
