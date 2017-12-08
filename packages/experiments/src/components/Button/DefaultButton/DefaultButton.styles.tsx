import { concatStyleSets, FontWeights } from '../../../Styling';
import { IButtonBaseStyleProps, IButtonBaseStyles } from '../_base/Button.base.types';
import { ISplitButtonBaseStyleProps, ISplitButtonBaseStyles } from '../_base/SplitButton.base.types';

import { getStyles as getBaseStyles } from '../_base/Button.base.styles';
import { primaryStyles, standardStyles, primarySplitStyles, standardSplitStyles } from '../ButtonThemes';

const DEFAULT_BUTTON_HEIGHT = '32px';
const DEFAULT_BUTTON_WIDTH = '80px';

export const getStyles = (props: IButtonBaseStyleProps): IButtonBaseStyles => {

  const buttonStyles: IButtonBaseStyles = {
    button: {
      height: DEFAULT_BUTTON_HEIGHT,
      minWidth: DEFAULT_BUTTON_WIDTH,
    },
    label: {
      fontWeight: FontWeights.semibold
    }
  }

  const themeStyles: IButtonBaseStyles = props.primary ? primaryStyles(props) : standardStyles(props);
  const baseStyles: IButtonBaseStyles = getBaseStyles(props);

  return concatStyleSets(
    baseStyles,
    themeStyles,
    buttonStyles
  );
};

export const getSplitStyles = (props: ISplitButtonBaseStyleProps): ISplitButtonBaseStyles => {

  const buttonStyles: ISplitButtonBaseStyles = {
    root: {
      height: '100%',
    },
    button: {
      padding: '0 8px',
    },

  }

  const themeStyles: ISplitButtonBaseStyles = props.primary ? primarySplitStyles(props) : standardSplitStyles(props);
  const baseStyles: ISplitButtonBaseStyles = getBaseStyles(props);

  return concatStyleSets(
    baseStyles,
    themeStyles,
    buttonStyles
  );
};
