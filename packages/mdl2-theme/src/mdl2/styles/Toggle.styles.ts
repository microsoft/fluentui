import { FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { IToggleStyleProps, IToggleStyles } from 'office-ui-fabric-react/lib/Toggle';

export const ToggleStyles = (props: IToggleStyleProps): Partial<IToggleStyles> => {
  const { disabled, checked, theme } = props;
  const { palette } = theme;

  return {
    pill: [
      {
        width: '2.2em',
        height: '1em',
        borderRadius: '1em',
        padding: '0 .2em'
      },
      !disabled && [
        checked && {
          selectors: {
            ':hover': [
              {
                backgroundColor: palette.themeDarkAlt
              }
            ]
          }
        }
      ]
    ],
    thumb: [
      {
        width: '.5em',
        height: '.5em',
        borderRadius: '.5em'
      },
      !disabled &&
        !checked && {
          backgroundColor: palette.neutralDark
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
