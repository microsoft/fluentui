import { teamsLightTheme } from '../themes';
import { themeToCSSVariables } from './themeToCSSVariables';

describe('themeToCSSVariables', () => {
  it('returns a flat object with CSS variables', () => {
    expect(themeToCSSVariables(teamsLightTheme)).toMatchObject({
      '--alias-color-blue-foreground1': 'var(--global-palette-blue-shade10)',
      '--alias-color-blue-foreground2': 'var(--global-palette-blue-shade30)',
      '--alias-color-blue-foreground3': 'var(--global-palette-blue-primary)',
    });
  });
});
