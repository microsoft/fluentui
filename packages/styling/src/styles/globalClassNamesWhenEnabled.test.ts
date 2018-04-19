import { globalClassNamesWhenEnabled } from './globalClassNamesWhenEnabled';
import { createTheme } from './theme';

describe('globalClassNamesWhenEnabled', () => {
  it('returns an empty string when the global styles are disabled', () => {
    const theme = createTheme({ flags: { noGlobalClassNames: true } });

    expect(globalClassNamesWhenEnabled(theme, ['ms-Link'])).toBe('');
  });

  it('returns the correct classNames when global classes are enabled', () => {
    const theme = createTheme({ flags: { noGlobalClassNames: false } });

    expect(globalClassNamesWhenEnabled(theme, ['ms-Link'])).toBe('ms-Link');
  });

  it('works for multiple global classes', () => {
    const theme = createTheme({ flags: { noGlobalClassNames: false } });

    expect(globalClassNamesWhenEnabled(theme, ['ms-Link', 'my-other-global'])).toBe('ms-Link my-other-global');
  });
});