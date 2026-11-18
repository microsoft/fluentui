import { makeStyles } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';

/** An app container restyling the neutral stroke tokens for everything inside it. */
export const useExternalTokenThemeStyles = makeStyles({
  strokeOverride: {
    '--colorNeutralStroke1': tokens.colorPaletteBerryBorderActive,
    '--colorNeutralStroke1Hover': tokens.colorPaletteBlueBorderActive,
  },
});
