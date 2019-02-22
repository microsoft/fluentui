import { ITextFieldStyleProps, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import { fluentBorderRadius } from './styleConstants';
import { NeutralColors } from '../FluentColors';

export const TextFieldStyles = (props: ITextFieldStyleProps): Partial<ITextFieldStyles> => {
  const { focused, disabled, hasErrorMessage, multiline, theme } = props;
  const { palette } = theme;

  return {
    fieldGroup: [
      {
        borderRadius: fluentBorderRadius
      },
      !focused &&
        !disabled &&
        !hasErrorMessage && {
          borderColor: NeutralColors.gray80,
          selectors: {
            ':hover': {
              borderColor: palette.neutralPrimary
            }
          }
        },
      hasErrorMessage && [
        {
          borderColor: palette.red,
          selectors: {
            '&:focus, &:hover': {
              borderColor: palette.redDark
            }
          }
        },
        focused && {
          borderColor: palette.redDark
        }
      ]
    ],
    field: {
      color: palette.neutralDark,
      padding: !multiline ? '0 8px' : '6px 8px',
      selectors: {
        '::placeholder': [disabled && { color: palette.neutralTertiary }],
        ':-ms-input-placeholder': [disabled && { color: palette.neutralTertiary }]
      }
    },
    errorMessage: {
      color: palette.redDark
    }
  };
};
