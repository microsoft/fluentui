import * as React from 'react';
import { IVerticalDividerProps, IVerticalDividerPropsStyles, IVerticalDividerStyles } from './VerticalDivider.types';
import { classNamesFunction } from '../../Utilities';
const getClassNames = classNamesFunction<IVerticalDividerPropsStyles, IVerticalDividerStyles>();

export const VerticalDividerBase = (props: IVerticalDividerProps) => {
  const { styles, theme, getClassNames: deprecatedGetClassNames, className, domRef } = props;
  const classNames = getClassNames(styles, { theme: theme, getClassNames: deprecatedGetClassNames, className });
  return (
    <span className={classNames.wrapper} ref={domRef}>
      <span className={classNames.divider} />
    </span>
  );
};
