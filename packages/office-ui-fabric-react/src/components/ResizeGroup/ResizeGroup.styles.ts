import { IResizeGroupStyleProps, IResizeGroupStyles } from './ResizeGroup.types';
import { globalClassNamesWhenEnabled } from '../../Styling';

export const getStyles = (
  props: IResizeGroupStyleProps
): IResizeGroupStyles => {
  const {
    className,
    theme,
  } = props;

  return ({
    root: [
      globalClassNamesWhenEnabled(theme, ['ms-ResizeGroup']),
      {
        display: 'block',
        position: 'relative'
      },
      className
    ]
  });
};
