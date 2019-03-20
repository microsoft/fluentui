import { IButtonStyles, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export const PrimaryButtonStyles = (props: IButtonProps): Partial<IButtonStyles> => {
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { palette, effects } = theme;

  return {
    root: {
      borderRadius: effects.roundedCorner2,
      border: 'none',
      backgroundColor: palette.themePrimary,
      color: palette.white
    },
    rootHovered: {
      backgroundColor: palette.themeDarkAlt
    },
    rootPressed: {
      backgroundColor: palette.themeDark
    },
    rootChecked: {
      backgroundColor: palette.themeDark
    }
  };
};
