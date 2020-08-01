import { ITextFieldStyleProps, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import { FontSizes } from '../AzureType';
import * as StyleConstants from '../Constants';
import { IExtendedSemanticColors } from '../IExtendedSemanticColors';

export const TextFieldStyles = (props: ITextFieldStyleProps): Partial<ITextFieldStyles> => {
  const { focused, disabled, hasErrorMessage, multiline, theme } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    fieldGroup: [
      !multiline && {
        height: StyleConstants.inputControlHeight,

        selectors: {
          '::after': {
            borderColor: semanticColors.primaryButtonBackgroundHovered,
          },
        },
      },
      focused && {
        borderColor: semanticColors.focusBorder,
      },
      disabled && {
        borderColor: extendedSemanticColors.textFieldBorderDisabled,
        backgroundColor: semanticColors.primaryButtonBackgroundDisabled,
      },
      hasErrorMessage && [
        {
          borderWidth: StyleConstants.borderWidthError,
        },
        focused && {
          borderColor: semanticColors.focusBorder,
          selectors: {
            '&:focus, &:hover': {
              borderColor: semanticColors.focusBorder,
            },
          },
        },
      ],
    ],
    icon: {
      bottom: 2,
    },
    prefix: {
      fontSize: FontSizes.size13,
    },
    suffix: {
      fontSize: FontSizes.size13,
    },
    field: [
      {
        color: semanticColors.inputText,
        backgroundColor: semanticColors.inputBackground,
        fontSize: FontSizes.size13,
        selectors: {
          '::placeholder': {
            color: semanticColors.inputPlaceholderText,
            fontStyle: 'italic',
          },
          ':-ms-input-placeholder': {
            color: semanticColors.inputPlaceholderText,
            fontStyle: 'italic',
          },
          '::-webkit-input-placeholder': {
            color: semanticColors.inputPlaceholderText,
            fontStyle: 'italic',
          },
        },
      },
      disabled && {
        color: semanticColors.primaryButtonTextDisabled,
        backgroundColor: semanticColors.primaryButtonBackgroundDisabled,
      },
    ],
    errorMessage: {
      color: semanticColors.errorText,
    },
  };
};
