import { IToggleProps } from '../../../../office-ui-fabric-react/lib';

export const ToggleStyles = (props: IToggleProps) => {
  const { disabled, checked, theme } = props;

  if (!theme) {
    throw new Error('Theme is undefined or null in Fluent theme Toggle getStyles function.');
  }

  const { palette } = theme;

  return {
    pill: [
      {
        width: '40px',
        height: '20px',
        borderRadius: '10px',
        padding: '0 4px'
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
              backgroundColor: palette.neutralPrimary
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
    ]
  };
};
