import { concatStyleSets, FontWeights } from '../../../Styling';
import { IButtonBaseStyleProps, IButtonBaseStyles } from '../_base/Button.base.types';

import { getButtonBaseStyles } from '../_base/Button.base.styles';


export const getStyles = (props: IButtonBaseStyleProps): IButtonBaseStyles => {

  const {theme} = props;

  let baseButtonStyles = getButtonBaseStyles(props);
  let messageBarButtonStyles: IButtonBaseStyles = {
    button: {
      backgroundColor: theme.palette.neutralQuaternaryAlt,
      color: theme.palette.neutralPrimary,
      selectors: {
        ':hover': {
          backgroundColor: theme.palette.neutralTertiaryAlt,
          color: theme.palette.neutralDark
        },
        ':active': {
          backgroundColor: theme.palette.neutralTertiary,
          color: theme.palette.neutralDark
        }
      }
    }
  };

  return concatStyleSets(baseButtonStyles, messageBarButtonStyles);
};