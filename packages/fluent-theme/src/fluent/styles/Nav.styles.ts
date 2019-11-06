import { INavStyleProps, INavStyles } from 'office-ui-fabric-react/lib/Nav';

export const NavStyles = (props: INavStyleProps): Partial<INavStyles> => {
  const { theme, isDisabled, isSelected, isGroup, isLink, navHeight = 44 } = props;
  const { semanticColors } = theme;

  return {
    link: [
      {
        height: navHeight,
        lineHeight: `${navHeight}px`
      },
      !isDisabled && {
        selectors: {
          '.${classNames.compositeLink}:hover &': {
            backgroundColor: semanticColors.bodyBackgroundHovered
          }
        }
      },
      isSelected && {
        backgroundColor: semanticColors.bodyBackgroundChecked
      }
    ],
    chevronButton: [
      {
        lineHeight: `${navHeight}px`,
        selectors: {
          '&:hover': {
            backgroundColor: semanticColors.bodyBackgroundHovered
          },
          '.${classNames.compositeLink}:hover &': {
            backgroundColor: semanticColors.bodyBackgroundHovered
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
