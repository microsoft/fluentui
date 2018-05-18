import { IChicletStyleProps, IChicletStyles } from './Chiclet.types';

export const getStyles = (
  props: IChicletStyleProps
): IChicletStyles => {
  const { theme } = props;

  return ({
    root: {}
  });
};