import { ISpinButtonStyleProps, ISpinButtonStyles } from '@fluentui/react/lib/SpinButton';
import { IStyleFunction } from '@fluentui/react/lib/Utilities';
import * as StyleConstants from '../Constants';

export const SpinButtonStyles: IStyleFunction<ISpinButtonStyleProps, ISpinButtonStyles> = (
  props: ISpinButtonStyleProps,
) => {
  const { theme } = props;

  return {
    root: {
      selectors: {
        'div[class^="spinButtonWrapper-"]': {
          height: StyleConstants.spinButtonHeight,
        },
        'div[class^="labelWrapper-"]': {
          height: StyleConstants.inputControlHeight,
          padding: '1px 0px 5px 0',
        },
        button: {
          i: {
            height: StyleConstants.spinButtonArrowHeight,
          },
        },
      },
    },
    input: {
      backgroundColor: theme.semanticColors.inputBackground,
      color: theme.semanticColors.inputText,
      fontSize: theme.fonts.medium.fontSize,
    },
    inputTextSelected: {
      color: theme.semanticColors.inputText,
      fontSize: theme.fonts.medium.fontSize,
    },
  };
};
