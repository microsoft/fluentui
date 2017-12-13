import { concatStyleSets, FontWeights } from '../../../Styling';
import { IButtonBaseStyleProps, IButtonBaseStyles } from '../_base/Button.base.types';

import { getButtonBaseStyles } from '../_base/Button.base.styles';

export const getStyles = (props: IButtonBaseStyleProps): IButtonBaseStyles => {

  const { theme, expanded, disabled, checked } = props;

  let buttonStyles: IButtonBaseStyles = {
    button: [
      {
        padding: '0 4px',
        width: '32px',
        height: '32px',
        backgroundColor: 'transparent',
        selectors: {
          ':hover': {
            color: theme.palette.themeDarker
          },
          ':active': {
            color: theme.palette.themePrimary
          }
        }
      },
      expanded && !disabled && {
        color: theme.palette.themePrimary
      },
      checked && !disabled && {
        backgroundColor: theme.palette.neutralTertiaryAlt,
        selectors: {
          ':hover': {
            backgroundColor: theme.palette.neutralLight
          }
        }
      },
      disabled && {
        color: theme.palette.neutralTertiary
      }
    ]
  };

  const baseStyles: IButtonBaseStyles = getButtonBaseStyles(props);

  return concatStyleSets(
    baseStyles,
    buttonStyles
  );
};
