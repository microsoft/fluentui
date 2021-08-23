import { borderNone } from '../Constants';
import type { INavStyleProps, INavStyles } from '@fluentui/react/lib/Nav';

export const NavStyles = (props: INavStyleProps): Partial<INavStyles> => {
  const { theme } = props;
  const { semanticColors } = theme;

  return {
    compositeLink: {
      border: borderNone,
    },
    link: {
      border: borderNone,
      color: semanticColors.bodyText,
      selectors: {
        '&:hover': {
          border: borderNone,
        },
        '&:active': {
          border: borderNone,
        },
      },
    },
  };
};
