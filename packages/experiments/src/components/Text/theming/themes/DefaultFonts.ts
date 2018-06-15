import { DefaultFontStyles, FontWeights, IRawStyle } from '@uifabric/styling';

export const DefaultFonts = {
  medium: DefaultFontStyles.medium
};

export const DefaultFontWeights = {
  emphasized: {
    fontWeight: FontWeights.bold
  } as IRawStyle,
  normal: {
    fontWeight: FontWeights.regular
  } as IRawStyle,
  diminished: {
    fontWeight: FontWeights.semilight
  } as IRawStyle
};
