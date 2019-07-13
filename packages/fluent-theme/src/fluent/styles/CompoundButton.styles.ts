import { getFocusStyle, HighContrastSelector } from 'office-ui-fabric-react/lib/Styling';
import { IButtonStyles, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export const CompoundButtonStyles = (props: IButtonProps): Partial<IButtonStyles> => {
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { palette, effects } = theme;

  return {
    root: {
      ...getFocusStyle(theme, { inset: 2 }),
      backgroundColor: palette.white,
      border: `1px solid ${palette.neutralSecondaryAlt}`,
      borderRadius: effects.roundedCorner2,
      padding: '16px 12px',

      // Primary styles require targeting a selector for now.
      // @todo: These selectors override the focus style above. Need to fix this.
      selectors: {
        '&.ms-Button--compoundPrimary': {
          backgroundColor: palette.themePrimary,
          border: 'none',

          selectors: {
            [HighContrastSelector]: {
              color: 'Window',
              backgroundColor: 'WindowText',
              MsHighContrastAdjust: 'none'
            }
          }
        }
      }
    },
    rootPressed: {
      backgroundColor: palette.neutralQuaternaryAlt,

      // Primary styles require targeting a selector for now.
      selectors: {
        '&.ms-Button--compoundPrimary:active': {
          backgroundColor: palette.themeDark,

          selectors: {
            [HighContrastSelector]: {
              color: 'Window',
              backgroundColor: 'WindowText',
              MsHighContrastAdjust: 'none'
            }
          }
        }
      }
    },
    rootChecked: {
      backgroundColor: palette.neutralQuaternaryAlt,

      // Primary styles require targeting a selector for now.
      selectors: {
        '&.ms-Button--compoundPrimary': {
          backgroundColor: palette.themeDark,
          borderColor: palette.themeDark,

          selectors: {
            [HighContrastSelector]: {
              color: 'Window',
              backgroundColor: 'WindowText',
              MsHighContrastAdjust: 'none'
            }
          }
        }
      }
    },
    rootDisabled: {
      borderColor: palette.neutralLighter,

      selectors: {
        '&.ms-Button--compoundPrimary': {
          backgroundColor: palette.neutralLighter,
          borderColor: palette.neutralLighter
        }
      }
    }
  };
};
