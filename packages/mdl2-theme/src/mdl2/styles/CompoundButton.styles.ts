import { getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { IButtonStyles, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export const CompoundButtonStyles = (props: IButtonProps): Partial<IButtonStyles> => {
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { palette } = theme;

  return {
    root: {
      backgroundColor: palette.neutralLighter,
      border: '1px solid transparent',
      padding: '20px',

      // Primary styles require targeting a selector for now.
      // @todo: These selectors override the focus style above. Need to fix this.
      selectors: {
        '&.ms-Button--compoundPrimary': {
          backgroundColor: palette.themePrimary,
          borderColor: palette.themePrimary,
          ...getFocusStyle(theme, { inset: -1, borderColor: palette.white })
        },
        '&.ms-Button--compound': {
          ...getFocusStyle(theme, { inset: -1, borderColor: palette.white })
        }
      }
    },
    rootHovered: {
      backgroundColor: palette.neutralLight,

      // Primary styles require targeting a selector for now.
      selectors: {
        '&.ms-Button--compoundPrimary:hover': {
          backgroundColor: palette.themeDarkAlt,
          borderColor: palette.themeDarkAlt
        }
      }
    },
    rootPressed: {
      backgroundColor: palette.neutralTertiaryAlt,

      // Primary styles require targeting a selector for now.
      selectors: {
        '&.ms-Button--compoundPrimary:active': {
          backgroundColor: palette.themeDark,
          borderColor: palette.themeDark
        }
      }
    },
    rootChecked: {
      backgroundColor: palette.neutralTertiaryAlt,

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

      // Primary styles require targeting a selector for now.
      selectors: {
        '&.ms-Button--compoundPrimary': {
          backgroundColor: palette.neutralLighter,
          borderColor: palette.neutralLighter
        }
      }
    }
  };
};
