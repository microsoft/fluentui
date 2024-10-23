import { GriffelStyle, tokens } from '@fluentui/react-components';

const fluid = (): GriffelStyle => ({ width: '100%' });

const error = (): GriffelStyle => ({ border: `1px solid ${tokens.colorPaletteRedBorderActive}` });

const errorIndicator = (): GriffelStyle => ({
  color: tokens.colorPaletteRedBorderActive,
});

const successIndicator = (): GriffelStyle => ({
  color: tokens.colorPaletteGreenForeground1,
});

export const input = {
  error,
  errorIndicator,
  fluid,
  successIndicator,
};
