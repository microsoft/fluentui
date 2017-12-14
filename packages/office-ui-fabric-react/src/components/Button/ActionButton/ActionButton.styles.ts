import { concatStyleSets, FontWeights } from '../../../Styling';
import { IButtonBaseStyleProps, IButtonBaseStyles } from '../_base/Button.base.types';

import { getButtonBaseStyles } from '../_base/Button.base.styles';

export const getStyles = (props: IButtonBaseStyleProps): IButtonBaseStyles => {

  const { theme, expanded, disabled, checked } = props;

  const DEFAULT_BUTTON_HEIGHT = '40px';
  const DEFAULT_PADDING = '0 4px';

  let buttonStyles: IButtonBaseStyles = {
    button: [
      'ms-Button--action',
      {
        justifyContent: 'flex-start',
        padding: DEFAULT_PADDING,
        height: DEFAULT_BUTTON_HEIGHT,
        color: theme.palette.neutralPrimary,
        backgroundColor: 'transparent',
        selectors: {
          ':hover': {
            color: theme.palette.themePrimary,
          },
          ':active': {
            color: theme.palette.black,
          }
        }
      },
      checked && {
        color: theme.palette.black,
      },
      disabled && {
        color: theme.palette.neutralTertiary,
        backgroundColor: 'transparent'
      }
    ],

    icon: [
      {
        color: theme.palette.themeDarkAlt,
        selectors: {
          ':hover': {
            color: theme.palette.themePrimary
          },
          ':active': {
            color: theme.palette.themeDarker
          }
        }
      },
      checked && {
        color: theme.palette.themeDarker
      },
      disabled && {
        color: 'inherit'
      }
    ],
    menuIcon: {
      color: theme.palette.neutralSecondary
    },

    textContainer: {
      flexGrow: 0
    }
  };

  const baseStyles: IButtonBaseStyles = getButtonBaseStyles(props);

  return concatStyleSets(
    baseStyles,
    buttonStyles
  );
};