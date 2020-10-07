import { IButtonStyles, IButtonProps } from '@fluentui/react/lib/Button';
import { IsFocusVisibleClassName } from '@fluentui/react/lib/Utilities';

export const PrimaryButtonStyles = (props: IButtonProps): Partial<IButtonStyles> => {
  const { theme } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  const { palette } = theme;

  return {
    root: {
      backgroundColor: palette.themePrimary,
      color: palette.white,
      selectors: {
        [`.${IsFocusVisibleClassName} &:focus`]: {
          selectors: {
            ':after': {
              outlineColor: palette.neutralSecondary,
            },
          },
        },
      },
    },
    rootHovered: {
      backgroundColor: palette.themeDarkAlt,
    },
    rootPressed: {
      backgroundColor: palette.themeDark,
    },
    rootChecked: {
      backgroundColor: palette.themeDark,
    },
  };
};
