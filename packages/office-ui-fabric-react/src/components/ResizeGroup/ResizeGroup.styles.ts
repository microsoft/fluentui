import { IResizeGroupStyleProps, IResizeGroupStyles } from './ResizeGroup.types';

export const getStyles = (
  props: IResizeGroupStyleProps
): IResizeGroupStyles => {
  const {
    className,
  } = props;

  return ({
    root: [
      'ms-ResizeGroup',
      {
        display: 'block',
        position: 'relative'
      },
      className
    ]
  });
};
