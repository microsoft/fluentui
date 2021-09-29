import { teamsLightTheme } from '../themes';
import { themeToCSSVariables } from './themeToCSSVariables';

describe('themeToCSSVariables', () => {
  it('returns a flat object with CSS variables', () => {
    expect(themeToCSSVariables(teamsLightTheme)).toMatchObject({
      '--colorBlueForeground1': '#006cbf',
      '--colorBlueForeground2': '#004377',
      '--colorBlueForeground3': '#0078d4',
    });
  });
});
