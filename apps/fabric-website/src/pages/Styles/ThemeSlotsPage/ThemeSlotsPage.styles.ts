import { IStyle } from 'office-ui-fabric-react';
import { IThemeSlotsPageStyleProps, IThemeSlotsPageStyles } from './ThemeSlotsPage.types';

export const getStyles = (props: IThemeSlotsPageStyleProps): IThemeSlotsPageStyles => {
  const { theme, className } = props;

  return {
    root: [
      {
        // Add your styles here
      },
      className
    ]

    // Define your other classNames below
  };
};
