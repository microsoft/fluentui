import { IFontSizes, IFontWeights, IFontVariants } from '../interfaces/index';

// Standard font sizes.
export const DefaultFontSizes: IFontSizes = {
  mini: '10px',
  xSmall: '11px',
  small: '12px',
  smallPlus: '13px',
  medium: '14px',
  mediumPlus: '15px',
  large: '17px',
  xLarge: '21px',
  xxLarge: '28px',
  superLarge: '42px',
  mega: '72px'
};

export const DefaultFontWeights: IFontWeights = {
  light: '100',
  semilight: '300',
  medium: '400',
  semibold: '600',
  bold: '700'
};

/**
 * @internal This is an experimental interface and will be changed post design review.
 */
export const DefaultFontVariants: IFontVariants = {
  // size based variants
  tiny: {
    fontSize: 'mini',
    fontWeight: 'semibold'
  },
  xSmall: {
    fontSize: 'xSmall'
  },
  small: {
    fontSize: 'small'
  },
  smallPlus: {
    fontSize: 'smallPlus'
  },
  standard: {
    fontFamily: 'standard',
    fontSize: 'medium',
    fontWeight: 'medium'
  },
  standardPlus: {
    fontSize: 'mediumPlus'
  },
  large: {
    fontFamily: 'semilight',
    fontSize: 'large',
    fontWeight: 'semilight'
  },
  xLarge: {
    fontSize: 'xLarge',
    fontWeight: 'light'
  },
  xxLarge: {
    fontSize: 'xxLarge',
    fontWeight: 'light'
  },
  superLarge: {
    fontSize: 'superLarge',
    fontWeight: 'light'
  },
  mega: {
    fontSize: 'mega',
    fontWeight: 'light'
  },

  // role based variants
  caption: {
    fontSize: 'xSmall'
  },
  link: {}
};
