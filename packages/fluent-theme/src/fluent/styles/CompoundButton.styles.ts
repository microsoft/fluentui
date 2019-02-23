import { getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { IButtonStyles, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export const CompoundButtonStyles = (props: IButtonProps): Partial<IButtonStyles> => {
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { palette, effects } = theme;

  return {
    root: {
      ...getFocusStyle(theme, 2),
      backgroundColor: palette.white,
      border: `1px solid ${palette.neutralSecondaryAlt}`,
      borderRadius: effects.roundedCorner2,
      padding: '16px 12px',

      // Primary styles require targeting a selector for now.
      // @todo: These selectors override the focus style above. Need to fix this.
      selectors: {
        '&.ms-Button--compoundPrimary': {
          backgroundColor: palette.themePrimary,
          borderColor: palette.themePrimary
        }
      }
    },
    rootPressed: {
      backgroundColor: palette.neutralQuaternaryAlt,

      // Primary styles require targeting a selector for now.
      selectors: {
        '&.ms-Button--compoundPrimary:active': {
          backgroundColor: palette.themeDark
        }
      }
    },
    rootChecked: {
      backgroundColor: palette.neutralQuaternaryAlt,

      // Primary styles require targeting a selector for now.
      selectors: {
        '&.ms-Button--compoundPrimary': {
          backgroundColor: palette.themeDark,
          borderColor: palette.themeDark
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
