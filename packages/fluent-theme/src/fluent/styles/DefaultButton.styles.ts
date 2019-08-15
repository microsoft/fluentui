import { getFocusStyle, HighContrastSelector } from 'office-ui-fabric-react/lib/Styling';
import { IButtonStyles, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export const DefaultButtonStyles = (props: IButtonProps): Partial<IButtonStyles> => {
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { palette, effects } = theme;

  return {
    root: {
      borderRadius: effects.roundedCorner2,
      backgroundColor: palette.white,
      border: `1px solid ${palette.neutralSecondaryAlt}`,
      ...getFocusStyle(theme, { inset: 1 })
    },
    rootHovered: {
      backgroundColor: palette.neutralLighter,
      selectors: {
        '.ms-Button--primary': {
          backgroundColor: palette.themeDarkAlt
        }
      }
    },
    rootPressed: {
      backgroundColor: palette.neutralLight
    },
    rootChecked: {
      backgroundColor: palette.neutralLight
    },
    rootDisabled: {
      backgroundColor: palette.neutralLighter,
      borderColor: palette.neutralLighter,

      selectors: {
        [HighContrastSelector]: {
          color: 'GrayText',
          borderColor: 'GrayText',
          backgroundColor: 'Window'
        }
      }
    },
    splitButtonMenuButton: {
      background: 'transparent',
      borderTopRightRadius: effects.roundedCorner2,
      borderBottomRightRadius: effects.roundedCorner2,
      border: `1px solid ${palette.neutralSecondaryAlt}`,
      borderLeft: 'none'
    },
    splitButtonContainer: {
      selectors: {
        '.ms-Button--default': {
          borderRight: 'none',
          borderTopRightRadius: '0',
          borderBottomRightRadius: '0'
        },
        '.ms-Button--primary': {
          borderTopRightRadius: '0',
          borderBottomRightRadius: '0',
          border: 'none',
          backgroundColor: palette.themePrimary,
          selectors: {
            ':hover': {
              background: palette.themeDarkAlt
            }
          }
        },
        '.ms-Button--primary + .ms-Button': {
          backgroundColor: palette.themePrimary,
          border: 'none',
          selectors: {
            ':hover': {
              background: palette.themeDarkAlt,

              selectors: {
                [HighContrastSelector]: {
                  color: 'Window',
                  backgroundColor: 'Highlight',
                  MsHighContrastAdjust: 'none'
                }
              }
            },
            [HighContrastSelector]: {
              color: 'Window',
              backgroundColor: 'WindowText',
              MsHighContrastAdjust: 'none'
            }
          }
        },
        '.ms-Button.is-disabled': {
          backgroundColor: palette.neutralLighter,
          selectors: {
            [HighContrastSelector]: {
              color: 'GrayText',
              borderColor: 'GrayText',
              backgroundColor: 'Window'
            }
          }
        },
        '.ms-Button.is-disabled + .ms-Button.is-disabled': {
          backgroundColor: palette.neutralLighter,
          border: 'none',
          selectors: {
            [HighContrastSelector]: {
              color: 'GrayText',
              borderColor: 'GrayText',
              backgroundColor: 'Window'
            }
          }
        }
      }
    }
  };
};
