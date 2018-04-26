import { getGlobalClassNames } from './getGlobalClassNames';
import { createTheme } from './theme';

describe('getGlobalClassNames', () => {
  it('returns an empty string when the global styles are disabled', () => {
    const theme = createTheme({ disableGlobalClassNames: true });

    expect(getGlobalClassNames({ root: 'ms-Link' }, theme)).toEqual({});
  });

  it('returns the correct classNames when global classes are enabled', () => {
    const theme = createTheme({ disableGlobalClassNames: false });

    expect(getGlobalClassNames({ root: 'ms-Link' }, theme)).toEqual({ root: 'ms-Link' });
  });

  it('works for multiple global classes', () => {
    const theme = createTheme({ disableGlobalClassNames: false });

    expect(getGlobalClassNames({ root: 'ms-Link my-other-global' }, theme)).toEqual({ root: 'ms-Link my-other-global' });
  });
});