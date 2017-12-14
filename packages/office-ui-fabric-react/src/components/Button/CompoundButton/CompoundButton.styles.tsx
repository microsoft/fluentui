import { concatStyleSets, FontWeights } from '../../../Styling';
import { IButtonBaseStyleProps, IButtonBaseStyles } from '../_base/Button.base.types';

import { getButtonBaseStyles } from '../_base/Button.base.styles';
import { primaryStyles, standardStyles, primarySplitStyles, standardSplitStyles } from '../DefaultButton/ButtonThemes';

export const getStyles = (props: IButtonBaseStyleProps): IButtonBaseStyles => {

  const buttonStyles: IButtonBaseStyles = {
    button: {
      maxWidth: 280,
      height: 'auto',
      minHeight: 72,
      flexDirection: 'row',
      alignItems: 'flex-start',
      textAlign: 'left'
    },

    icon: {
      fontSize: '2em',
      lineHeight: '1em',
      height: '1em',
      margin: '0 8px 0 0',
      flexBasis: '1em',
      flexShrink: '0',
      padding: 20
    },

    label: {
      margin: '0 0 5px',
      lineHeight: '100%',
      fontWeight: FontWeights.semibold
    },
    description: [
      props.theme.fonts.small,
      {
        lineHeight: '100%'
      }
    ]
  };

  const themeStyles: IButtonBaseStyles = props.primary ? primaryStyles(props) : standardStyles(props);
  const baseStyles: IButtonBaseStyles = getButtonBaseStyles(props);

  return concatStyleSets(
    baseStyles,
    themeStyles,
    buttonStyles,
    { button: props.primary ? 'ms-Button--compoundPrimary' : 'ms-Button--compound' }
  );
};

export const getSplitStyles = (props: IButtonBaseStyleProps): IButtonBaseStyles => {

  const buttonStyles: IButtonBaseStyles = {
    root: {
      height: '100%',
    },
    button: {
      height: '100%',
      padding: '0 8px',
    },
  };

  const themeStyles: IButtonBaseStyles = props.primary ? primarySplitStyles(props) : standardSplitStyles(props);
  const baseStyles: IButtonBaseStyles = getButtonBaseStyles(props);

  return concatStyleSets(
    baseStyles,
    themeStyles,
    buttonStyles
  );
};
