import * as React from 'react';
import { getDividerClassNames, IVerticalDividerClassNames } from './VerticalDivider.classNames';
import { IVerticalDividerProps } from './VerticalDivider.Props';
import { mergeStyleSets, getTheme } from '../../Styling';

export const VerticalDivider = (props: IVerticalDividerProps) => {
  const theme = getTheme();
  const classNames = props.getClassNames ? props.getClassNames(theme) : getDividerClassNames(theme);

  return (
    <span className={ classNames.wrapper }>
      <span className={ classNames.divider } />
    </span>);
};