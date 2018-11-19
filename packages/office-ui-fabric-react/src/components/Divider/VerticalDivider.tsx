import * as React from 'react';
import { getDividerClassNames } from './VerticalDivider.classNames';
import { IVerticalDividerProps } from './VerticalDivider.types';
import { getTheme } from '../../Styling';

export const VerticalDivider = (props: IVerticalDividerProps) => {
  const theme = getTheme();
  const classNames = props.getClassNames ? props.getClassNames(theme) : getDividerClassNames(theme);

  return (
    <span className={classNames.wrapper}>
      <span className={classNames.divider} />
    </span>
  );
};
