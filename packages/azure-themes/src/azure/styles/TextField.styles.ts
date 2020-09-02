import { ITextFieldStyleProps, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
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
      fontSize: theme.fonts.medium.fontSize,
    },
    suffix: {
      fontSize: theme.fonts.medium.fontSize,
    },
    field: [
      {
        color: semanticColors.inputText,
        backgroundColor: semanticColors.inputBackground,
        fontSize: theme.fonts.medium.fontSize,
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
