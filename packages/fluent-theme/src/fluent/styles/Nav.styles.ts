import { INavStyleProps, INavStyles } from 'office-ui-fabric-react/lib/Nav';

export const NavStyles = (props: INavStyleProps): Partial<INavStyles> => {
  const { theme, isDisabled, isSelected } = props;
  const { palette } = theme;

  return {
    link: [
      !isDisabled && {
        selectors: {
          '.ms-Nav-compositeLink:hover &': {
            backgroundColor: palette.neutralLighter
          }
        }
      },
      isSelected && {
        backgroundColor: palette.neutralLight
      }
    ]
  };
};
