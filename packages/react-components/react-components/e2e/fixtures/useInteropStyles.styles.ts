import { makeStyles, shorthands, tokens } from '@fluentui/react-components';

export const useInteropStyles = makeStyles({
  override: {
    color: tokens.colorPaletteBerryForeground2,
    backgroundColor: tokens.colorPaletteBerryBackground2,
    ':hover': { backgroundColor: tokens.colorPaletteBlueBackground2 },
    ':hover:active': { backgroundColor: tokens.colorPaletteGreenBackground2 },
    '&[data-fui-focus-visible]': { ...shorthands.borderColor(tokens.colorBrandStroke1) },
  },
  icon: { fontSize: tokens.fontSizeBase600, marginInlineStart: tokens.spacingHorizontalL },
  wrapper: { backgroundColor: tokens.colorPaletteBerryBackground2 },
  hook: { backgroundColor: tokens.colorPaletteRedBackground2 },
  hookIcon: { fontWeight: tokens.fontWeightBold },
  caller: { backgroundColor: tokens.colorPaletteGreenBackground2 },
  surface: { backgroundColor: tokens.colorPaletteBerryBackground2 },
});
