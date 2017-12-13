import { concatStyleSets, FontWeights } from '../../../Styling';
import { IButtonBaseStyleProps, IButtonBaseStyles } from '../_base/Button.base.types';

import { getButtonBaseStyles } from '../_base/Button.base.styles';

export const getStyles = (props: IButtonBaseStyleProps): IButtonBaseStyles => {
  const { theme, checked, disabled, expanded } = props;

  let buttonStyles: IButtonBaseStyles = {
    button: [
      'ms-CommandBarButton',
      !disabled && {
        minWidth: 40,
        backgroundColor: theme.palette.neutralLighter,
        color: theme.palette.neutralPrimary,
        padding: '0 4px',
        selectors: {
          ':hover': {
            backgroundColor: theme.palette.neutralLight,
            color: theme.palette.neutralDark
          },
          ':active': {
            backgroundColor: theme.palette.neutralQuaternaryAlt,
            color: theme.palette.black
          }
        }
      },
      checked && !disabled && {
        backgroundColor: theme.palette.neutralQuaternaryAlt,
        color: theme.palette.black,
        selectors: {
          '$root:hovered &': {
            backgroundColor: theme.palette.neutralQuaternary,
            color: theme.palette.black
          }
        }
      },
      expanded && !disabled && {
        backgroundColor: theme.palette.neutralQuaternaryAlt,
        color: theme.palette.black
      }
    ],
    label: {
      fontWeight: 'normal' // theme.fontWeights.semibold,
    },

    icon: {
      color: theme.palette.themeDarkAlt
    },

    menuIcon: {
      color: theme.palette.neutralSecondary
    }

  };

  const baseStyles: IButtonBaseStyles = getButtonBaseStyles(props);

  return concatStyleSets(
    baseStyles,
    buttonStyles
  );
};