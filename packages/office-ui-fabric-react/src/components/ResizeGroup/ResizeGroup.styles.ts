import { IResizeGroupStyleProps, IResizeGroupStyles } from './ResizeGroup.types';
import {
  IStyle,
  ITheme,
} from '../../Styling';

export const getStyles = (
  props: IResizeGroupStyleProps
): IResizeGroupStyles => {
  const {
    className,
    theme,
  } = props;

  const { palette, semanticColors } = theme;

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
