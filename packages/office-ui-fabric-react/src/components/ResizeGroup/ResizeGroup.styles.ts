import { IResizeGroupStyleProps, IResizeGroupStyles } from './ResizeGroup.types';
import { getGlobalClassNames } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-ResizeGroup',
};

export const getStyles = (
  props: IResizeGroupStyleProps
): IResizeGroupStyles => {
  const {
    className,
    theme,
  } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return ({
    root: [
      classNames.root,
      {
        display: 'block',
        position: 'relative'
      },
      className
    ]
  });
};
