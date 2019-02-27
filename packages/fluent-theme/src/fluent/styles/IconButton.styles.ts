import { IButtonStyles, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export const IconButtonStyles = (props: IButtonProps): Partial<IButtonStyles> => {
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { palette } = theme;

  return {
    root: {
      backgroundColor: palette.white,
      color: palette.themePrimary
    },
    rootHovered: {
      backgroundColor: palette.neutralLighter,
      color: palette.themeDarkAlt
    },
    rootPressed: {
      backgroundColor: palette.neutralLight,
      color: palette.themeDark
    },
    rootChecked: {
      backgroundColor: palette.neutralLight,
      color: palette.themeDark
    },
    rootDisabled: {
      backgroundColor: palette.white,
      color: palette.neutralTertiary
    }
  };
};
