import { IThemeSlotsPageStyleProps, IThemeSlotsPageStyles } from './ThemeSlotsPage.types';

export const getStyles = (props: IThemeSlotsPageStyleProps): IThemeSlotsPageStyles => {
  const { className } = props;

  return {
    root: [{}, className],
  };
};
