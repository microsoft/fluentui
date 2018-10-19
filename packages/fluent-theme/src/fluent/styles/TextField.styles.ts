import { ITextFieldStyleProps } from 'office-ui-fabric-react/lib/TextField';
import { fluentBorderRadius } from './styleConstants';
import { NeutralColors, SharedColors } from '../FluentColors';

export const TextFieldStyles = (props: ITextFieldStyleProps) => {
  const { focused, disabled, hasErrorMessage, multiline } = props;
  return {
    fieldGroup: [
      {
        borderRadius: fluentBorderRadius
      },
      !focused &&
        !disabled &&
        !hasErrorMessage && {
          borderColor: NeutralColors.gray80
        },
      hasErrorMessage && [
        {
          borderColor: SharedColors.red10,
          selector: {
            '&:hover': {
              borderColor: SharedColors.red20
            }
          }
        },
        focused && {
          borderColor: SharedColors.red20
        }
      ]
    ],
    field: {
      color: NeutralColors.gray190,
      padding: !multiline ? '0 8px' : '6px 8px',
      selectors: {
        '::placeholder': [disabled && { color: NeutralColors.gray90 }],
        ':-ms-input-placeholder': [disabled && { color: NeutralColors.gray90 }]
      }
    },
    errorMessage: {
      color: SharedColors.red20
    }
  };
};
