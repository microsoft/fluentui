import { ITextFieldStyleProps, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import { FontSizes } from '../AzureType';
import * as StyleConstants from '../Constants';

export const TextFieldStyles = (props: ITextFieldStyleProps): Partial<ITextFieldStyles> => {
  const { focused, disabled, hasErrorMessage, multiline, theme } = props;
  const { semanticColors } = theme;

  return {
    fieldGroup: [
      !focused &&
        !disabled &&
        !hasErrorMessage && {
          borderColor: semanticColors.inputBorder,
          selectors: {
            ':hover': {
              borderColor: semanticColors.inputBorder
            }
          }
        },
      hasErrorMessage && [
        {
          borderColor: semanticColors.errorBackground,
          borderWidth: StyleConstants.borderWidthError,
          selectors: {
            '&:focus, &:hover': {
              borderColor: semanticColors.focusBorder,
              borderWidth: StyleConstants.borderWidthError
            }
          }
        },
        focused && {
          borderColor: semanticColors.errorBackground,
          borderWidth: StyleConstants.borderWidthError
        }
      ],
      disabled && {
        borderColor: semanticColors.inputBorder
      },
      focused && {
        borderColor: semanticColors.focusBorder
      }
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
        padding: !multiline ? '0 8px' : '6px 8px',
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
