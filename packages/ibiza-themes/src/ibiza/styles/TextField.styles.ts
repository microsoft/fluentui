import { ITextFieldStyleProps, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import { borderRadius } from './styleConstants';
import { NeutralColors, BaseColors } from '../IbizaColors';

export const TextFieldStyles = (props: ITextFieldStyleProps): Partial<ITextFieldStyles> => {
  const { focused, disabled, hasErrorMessage, multiline, theme } = props;
  const { palette } = theme;

  return {
    fieldGroup: [
      {
        borderRadius: borderRadius
      },
      !focused &&
        !disabled &&
        !hasErrorMessage && {
          borderColor: NeutralColors.gray80
        },
      hasErrorMessage && [
        {
          borderColor: BaseColors.RED_B40E1B,
          selectors: {
            '&:focus, &:hover': {
              borderColor: BaseColors.RED_B40E1B
            }
          }
        },
        focused && {
          borderColor: BaseColors.RED_B40E1B
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
      color: BaseColors.RED_B40E1B
    }
  };
};
