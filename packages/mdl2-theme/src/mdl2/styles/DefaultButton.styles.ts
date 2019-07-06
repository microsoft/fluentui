import { getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { IButtonStyles, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export const DefaultButtonStyles = (props: IButtonProps): Partial<IButtonStyles> => {
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { palette } = theme;

  return {
    root: {
      backgroundColor: palette.neutralLighter,
      border: '1px solid transparent',
      ...getFocusStyle(theme, { inset: 0, borderColor: palette.white })
    },
    rootHovered: {
      backgroundColor: palette.neutralLight,
      selectors: {
        '.ms-Button--primary': {
          backgroundColor: palette.themeDarkAlt
        }
      }
    },
    rootPressed: {
      backgroundColor: palette.neutralTertiaryAlt
    },
    rootExpanded: {
      backgroundColor: palette.neutralTertiaryAlt
    },
    rootChecked: {
      backgroundColor: palette.neutralTertiaryAlt
    },
    rootDisabled: {
      backgroundColor: palette.neutralLighter,
      borderColor: 'transparent'
    },
    splitButtonMenuButton: {
      backgroundColor: palette.neutralLighter,
      border: '1px solid transparent'
    },
    splitButtonContainer: {
      selectors: {
        '.ms-Button--primary': {
          backgroundColor: palette.themePrimary,
          selectors: {
            ':hover': {
              background: palette.themeDarkAlt
            }
          }
        },
        '.ms-Button--primary + .ms-Button': {
          backgroundColor: palette.themePrimary,
          selectors: {
            ':hover': {
              background: palette.themeDarkAlt
            }
          }
        },
        '.ms-Button.is-disabled': {
          backgroundColor: palette.neutralLighter
        },
        '.ms-Button.is-disabled + .ms-Button.is-disabled': {
          backgroundColor: palette.neutralLighter,
          border: 'none'
        }
      }
    }
  };
};
