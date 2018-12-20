import { ITextFieldStyleProps, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import { FontSizes } from '../AzureType';
import * as StyleConstants from '../Constants';

export const TextFieldStyles = (props: ITextFieldStyleProps): Partial<ITextFieldStyles> => {
  const { focused, disabled, hasErrorMessage, multiline, theme } = props;
  const { semanticColors } = theme;

  return {
    fieldGroup: [
      !multiline && {
        height: StyleConstants.inputControlHeight
      },
      focused && {
        borderColor: semanticColors.focusBorder
      },
      disabled && {
        borderColor: semanticColors.disabledBodyText
      },
      hasErrorMessage && [
        {
          borderWidth: StyleConstants.borderWidthError
        },
        focused && {
          borderColor: semanticColors.focusBorder,
          selectors: {
            '&:focus, &:hover': {
              borderColor: semanticColors.focusBorder
            }
          }
        }
      ]
    ],
    field: [
      disabled && {
        color: semanticColors.disabledBodyText,
        backgroundColor: semanticColors.disabledBackground
      },
      !disabled && {
        color: semanticColors.inputText,
        backgroundColor: semanticColors.inputBackground
      },
      (!disabled || disabled) && {
        fontSize: FontSizes.size12,
        selectors: {
          '::placeholder': [disabled && { color: semanticColors.inputBorder }],
          ':-ms-input-placeholder': [disabled && { color: semanticColors.inputBorder }]
        }
      }
    ],
    errorMessage: {
      color: semanticColors.errorText
    }
  };
};
