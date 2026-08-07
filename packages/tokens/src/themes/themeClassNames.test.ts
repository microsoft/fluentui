import { themeClassNames } from './themeClassNames';

/**
 * Lockstep gate for the shipped theme class names (theming Phase 2b).
 *
 * The class name for a theme is DERIVED from its export name:
 * `fui-theme-` + kebab-case(name minus the `Theme` suffix). The
 * `@fluentui/react-tailwind-theme` generator performs the same derivation when emitting
 * the theme CSS classes and asserts it against `themeClassNames.ts` — this test asserts
 * it from the jest side so a rename in either place fails CI.
 */
describe('themeClassNames', () => {
  const deriveClassName = (themeName: string): string => {
    const base = themeName.replace(/Theme$/, '');
    // Digits attach to the preceding segment (V21 -> v21).
    const kebab = base.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

    return `fui-theme-${kebab}`;
  };

  it('derives every class name from the theme export name', () => {
    for (const [themeName, className] of Object.entries(themeClassNames)) {
      expect(className).toBe(deriveClassName(themeName));
    }
  });

  it('covers exactly the shipped theme set', () => {
    expect(Object.keys(themeClassNames).sort()).toEqual(
      [
        'teamsDarkTheme',
        'teamsDarkV21Theme',
        'teamsHighContrastTheme',
        'teamsLightTheme',
        'teamsLightV21Theme',
        'webDarkTheme',
        'webLightTheme',
      ].sort(),
    );
  });

  it('class names are unique and fui-theme- prefixed', () => {
    const values = Object.values(themeClassNames);

    expect(new Set(values).size).toBe(values.length);

    for (const value of values) {
      expect(value).toMatch(/^fui-theme-[a-z0-9-]+$/);
    }
  });
});
