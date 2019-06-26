import { IButtonStyles, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export const IconButtonStyles = (props: IButtonProps): Partial<IButtonStyles> => {
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { palette } = theme;

  return {
    root: {
      backgroundColor: 'transparent',
      color: palette.neutralPrimary
    },
    rootHovered: {
      backgroundColor: 'transparent',
      color: palette.neutralDark
    },
    rootPressed: {
      backgroundColor: 'transparent',
      color: palette.themePrimary
    },
    rootChecked: {
      backgroundColor: palette.neutralTertiaryAlt,
      color: palette.neutralPrimary
    },
    rootCheckedHovered: {
      backgroundColor: palette.neutralLight,
      color: palette.neutralPrimary
    },
    rootDisabled: {
      color: palette.neutralTertiary
    }
  };
};
