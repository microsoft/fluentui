import { ITextFieldStyleProps, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';

export const TextFieldStyles = (props: ITextFieldStyleProps): Partial<ITextFieldStyles> => {
  const { focused, disabled, hasErrorMessage, multiline, theme } = props;
  const { palette, effects } = theme;

  return {
    fieldGroup: [
      { borderRadius: effects.roundedCorner2 },
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
    field: [
      !disabled && {
        color: palette.neutralDark
      },
      {
        padding: !multiline ? '0 8px' : '6px 8px',
        selectors: {
          '::placeholder': [disabled && { color: palette.neutralTertiary }],
          ':-ms-input-placeholder': [disabled && { color: palette.neutralTertiary }]
        }
      }
    ],
    errorMessage: {
      color: palette.redDark
    }
  };
};
