import { IBaseChicletStyleProps, IBaseChicletStyles } from './BaseChiclet.types';

export const getStyles = (
  props: IBaseChicletStyleProps
): IBaseChicletStyles => {
  const { theme } = props;

  return ({
    root: {}
  });
}