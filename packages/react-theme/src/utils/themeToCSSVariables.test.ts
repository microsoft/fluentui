import { teamsLightTheme } from '../themes';
import { themeToCSSVariables } from './themeToCSSVariables';

describe('themeToCSSVariables', () => {
  it('returns a flat object with CSS variables', () => {
    expect(themeToCSSVariables(teamsLightTheme)).toMatchObject({
      '--colorPaletteBlueForeground1': '#006cbf',
      '--colorPaletteBlueForeground2': '#004377',
      '--colorPaletteBlueForeground3': '#0078d4',
    });
  });
});
