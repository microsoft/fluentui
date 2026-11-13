import { createTheme } from '@fluentui/react';
import { teamsHighContrastTheme, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import { createV9Theme } from './v9ThemeShim';

describe('createV9Theme', () => {
  // Status tokens have no v8 equivalent, so their values always come from the base v9 theme.
  it('uses webLightTheme as the base for a non-inverted v8 theme', () => {
    const theme = createV9Theme(createTheme({ isInverted: false }));

    expect(theme.colorStatusDangerForeground1).toBe(webLightTheme.colorStatusDangerForeground1);
    expect(theme.colorStatusSuccessBackground1).toBe(webLightTheme.colorStatusSuccessBackground1);
  });

  // Regression: https://github.com/microsoft/fluentui/issues/31728
  it('uses webDarkTheme as the base for an inverted v8 theme', () => {
    const theme = createV9Theme(createTheme({ isInverted: true }));

    expect(theme.colorStatusDangerForeground1).toBe(webDarkTheme.colorStatusDangerForeground1);
    expect(theme.colorStatusSuccessBackground1).toBe(webDarkTheme.colorStatusSuccessBackground1);
  });

  it('prefers an explicitly passed base theme over the inferred one', () => {
    const theme = createV9Theme(createTheme({ isInverted: true }), teamsHighContrastTheme);

    expect(theme.colorStatusDangerForeground1).toBe(teamsHighContrastTheme.colorStatusDangerForeground1);
  });
});
