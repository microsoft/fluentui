import { teamsLightTheme } from '../themes';
import { themeToCSSVariables } from './themeToCSSVariables';

describe('themeToCSSVariables', () => {
  it('returns a flat object with CSS variables', () => {
    expect(themeToCSSVariables(teamsLightTheme)).toMatchObject({
      '--alias-color-blue-foreground1': '#006cbf',
      '--alias-color-blue-foreground2': '#004377',
      '--alias-color-blue-foreground3': '#0078d4',
    });
  });
});
