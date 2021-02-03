import { teamsLightTheme } from '../themes';
import { themeToCSSVariables } from './themeToCSSVariables';

describe('themeToCSSVariables', () => {
  it('returns a flat object with CSS variables', () => {
    expect(themeToCSSVariables(teamsLightTheme)).toMatchObject({
      '--sharedColorTokens-blue-foreground1': '#0078D4',
      '--sharedColorTokens-blue-foreground2': '#004377',
      '--sharedColorTokens-blue-foreground3': '#0078D4',
    });
  });
});
