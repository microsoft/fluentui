import { getFocusStyle } from 'office-ui-fabric-react/lib/Styling';
import { IButtonStyles, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export const CommandBarButtonStyles = (props: IButtonProps): Partial<IButtonStyles> => {
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { palette } = theme;

  return {
    root: {
      backgroundColor: palette.neutralLighter,
      ...getFocusStyle(theme, { inset: 0 })
    },
    rootHovered: {
      backgroundColor: palette.neutralLight
    },
    rootPressed: {
      backgroundColor: palette.neutralQuaternaryAlt
    },
    rootExpanded: {
      backgroundColor: palette.neutralQuaternaryAlt
    },
    rootChecked: {
      backgroundColor: palette.neutralQuaternaryAlt
    },
    rootCheckedHovered: {
      backgroundColor: palette.neutralQuaternaryAlt
    },
    rootDisabled: {
      backgroundColor: palette.neutralLighter
    },
    splitButtonMenuButton: {
      backgroundColor: palette.neutralLighter,
      selectors: {
        ':hover': {
          backgroundColor: palette.neutralLight
        }
      }
    },
    splitButtonMenuButtonChecked: {
      backgroundColor: palette.neutralQuaternaryAlt
    },
    splitButtonMenuButtonExpanded: {
      backgroundColor: palette.neutralQuaternaryAlt
    },
    splitButtonMenuButtonDisabled: {
      backgroundColor: palette.neutralLighter
    }
  };
};
