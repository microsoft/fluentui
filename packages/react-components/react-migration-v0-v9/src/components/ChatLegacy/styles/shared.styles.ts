import { makeStyles, tokens } from '@fluentui/react-components';

/**
 * This file has styles hooks shared by all chat message components
 */

export const useDecorationClasses = makeStyles({
  default: {
    color: tokens.colorPaletteRedForeground3,
  },
  mention: {
    color: tokens.colorPaletteDarkOrangeForeground3,
  },
  mentionContrast: {
    color: tokens.colorBrandForegroundLink, // hcHyperlink '#ffff00'
  },
});
