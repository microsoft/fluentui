import { FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { IToggleStyleProps, IToggleStyles } from 'office-ui-fabric-react/lib/Toggle';

export const ToggleStyles = (props: IToggleStyleProps): Partial<IToggleStyles> => {
  const { disabled, checked, theme } = props;
  const { palette } = theme;

  return {
    pill: [
      {
        width: '40px',
        height: '20px',
        borderRadius: '10px',
        padding: '0 3px'
      },
      !disabled && [
        checked && {
          selectors: {
            ':hover': [
              {
                backgroundColor: palette.themeDark
              }
            ]
          }
        },
        !checked && {
          selectors: {
            ':hover .ms-Toggle-thumb': {
              backgroundColor: palette.neutralDark
            }
          }
        }
      ]
    ],
    thumb: [
      {
        width: '12px',
        height: '12px',
        borderRadius: '12px',
        borderColor: 'transparent'
      },
      !disabled &&
        !checked && {
          backgroundColor: palette.neutralSecondary
        }
    ],
    text: {
      selectors: {
        '&.ms-Toggle-stateText': {
          fontWeight: FontWeights.regular
        }
      }
    }
  };
};
