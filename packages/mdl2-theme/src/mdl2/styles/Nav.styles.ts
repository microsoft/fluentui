import { INavStyleProps, INavStyles } from 'office-ui-fabric-react/lib/Nav';

export const NavStyles = (props: INavStyleProps): Partial<INavStyles> => {
  const { theme, isDisabled, isSelected, isGroup, isLink, navHeight = 36 } = props;
  const { palette } = theme;

  return {
    link: [
      {
        height: navHeight,
        lineHeight: `${navHeight}px`
      },
      !isDisabled && {
        selectors: {
          '.ms-Nav-compositeLink:hover &': {
            backgroundColor: palette.neutralLighterAlt
          }
        }
      },
      isSelected && {
        backgroundColor: palette.neutralLighter
      }
    ],
    chevronButton: [
      {
        lineHeight: `${navHeight}px`,
        selectors: {
          '&:hover': {
            backgroundColor: palette.neutralLighterAlt
          },
          '$compositeLink:hover &': {
            backgroundColor: palette.neutralLighterAlt
          }
        }
      },
      isGroup && {
        height: navHeight
      },
      isLink && {
        height: navHeight - 2
      }
    ],
    chevronIcon: {
      height: navHeight,
      lineHeight: `${navHeight}px`
    }
  };
};
