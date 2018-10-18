import { ILayers } from '../interfaces/index';
import { DefaultButtonLayers } from './DefaultButtonLayers';

/**
 * @internal This is an experimental interface and will be changed post design review.
 */
export const DefaultLayers: ILayers = {
  base: {
    backgroundColor: 'white',
    color: 'neutralPrimary',
    borderColor: 'neutralLighter',
    selectors: {
      ':hover': {
        backgroundColor: 'neutralLighter',
        color: 'neutralDark',
        borderColor: 'transparent'
      },
      ':hover:active': {
        backgroundColor: 'neutralLight',
        color: 'neutralDark',
        borderColor: 'transparent'
      }
    },
    overrides: {
      disabled: {
        color: 'neutralTertiary'
      }
    }
  },
  shaded: {
    backgroundColor: 'buttonBackground',
    color: 'buttonText',
    borderColor: 'buttonBorder',
    selectors: {
      ':hover': { backgroundColor: 'buttonBackgroundHovered', color: 'buttonTextHovered' },
      ':hover:active': { backgroundColor: 'buttonBackgroundPressed', color: 'buttonTextPressed' }
    },
    overrides: {
      disabled: {
        color: 'buttonTextDisabled',
        borderColor: 'buttonBorderDisabled',
        backgroundColor: 'buttonBackgroundDisabled'
      },
      expanded: {
        backgroundColor: 'neutralTertiaryAlt',
        color: 'neutralDark',
        selectors: {
          ':hover': { backgroundColor: 'neutralLight', color: 'black' },
          ':hover:active': { backgroundColor: 'neutralLight', color: 'black' }
        }
      }
    }
  },
  primary: {
    backgroundColor: 'primaryButtonBackground',
    color: 'primaryButtonText',
    borderColor: 'primaryButtonBorder',
    selectors: {
      ':hover': { backgroundColor: 'primaryButtonBackgroundHovered', color: 'primaryButtonTextHovered' },
      ':hover:active': { backgroundColor: 'primaryButtonBackgroundPressed', color: 'primaryButtonTextPressed' }
    },
    overrides: {
      disabled: {
        color: 'primaryButtonTextDisabled',
        backgroundColor: 'primaryButtonBackgroundDisabled'
      },
      expanded: {
        backgroundColor: 'buttonBackgroundChecked',
        selectors: {
          ':hover': { backgroundColor: 'buttonBackgroundCheckedHovered' },
          ':hover:active': { backgroundColor: 'buttonBackgroundCheckedHovered' }
        }
      }
    }
  },
  iconBase: {
    color: 'neutralPrimary',
    fill: 'neutralPrimary',
    fontWeight: 400,
    selectors: {
      ':hover': { color: 'neutralDark' },
      ':hover:active': { color: 'neutralDark' }
    },
    overrides: {
      primary: {
        color: 'white',
        fill: 'white',
        selectors: {
          ':hover': { color: 'white' },
          ':hover:active': { color: 'white' }
        }
      }
    }
  },
  ...DefaultButtonLayers
};
