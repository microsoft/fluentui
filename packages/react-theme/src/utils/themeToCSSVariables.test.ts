import { teamsLightTheme } from '../themes';
import { themeToCSSVariables } from './themeToCSSVariables';

describe('themeToCSSVariables', () => {
  it('returns a flat object with CSS variables', () => {
    expect(themeToCSSVariables(teamsLightTheme)).toMatchObject({
      '--alias-color-blue-foreground1': '#0078D4',
      '--alias-color-blue-foreground2': '#004377',
      '--alias-color-blue-foreground3': '#0078D4',
    });
  });
});
