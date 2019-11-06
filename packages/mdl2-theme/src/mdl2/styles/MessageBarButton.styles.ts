import { IButtonStyles, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export const MessageBarButtonStyles = (props: IButtonProps): Partial<IButtonStyles> => {
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { palette } = theme;

  return {
    root: {
      backgroundColor: palette.neutralQuaternaryAlt,
      height: 32,
      width: 'auto',
      minWidth: 84
    },
    rootHovered: {
      backgroundColor: palette.neutralTertiaryAlt
    },
    rootPressed: {
      backgroundColor: palette.neutralTertiary
    }
  };
};
