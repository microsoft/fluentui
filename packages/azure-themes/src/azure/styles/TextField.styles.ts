import { ITextFieldStyleProps, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import { FontSizes } from '../AzureType';
import * as StyleConstants from '../Constants';

export const TextFieldStyles = (props: ITextFieldStyleProps): Partial<ITextFieldStyles> => {
  const { focused, disabled, hasErrorMessage, multiline, theme } = props;
  const { semanticColors } = theme;

  return {
    fieldGroup: [
      !multiline && {
        height: StyleConstants.inputControlHeight,
      },
      focused && {
        borderColor: semanticColors.focusBorder,
      },
      disabled && {
        borderColor: semanticColors.disabledBodyText,
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
      fontSize: FontSizes.size12,
    },
    suffix: {
      fontSize: FontSizes.size12,
    },
    field: [
      {
        color: semanticColors.inputText,
        backgroundColor: semanticColors.inputBackground,
        fontSize: FontSizes.size12,
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
        color: semanticColors.disabledBodyText,
        backgroundColor: semanticColors.disabledBackground,
      },
    ],
    errorMessage: {
      color: semanticColors.errorText,
    },
  };
};
