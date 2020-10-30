import * as React from 'react';
import { IVerticalDividerProps, IVerticalDividerPropsStyles, IVerticalDividerStyles } from './VerticalDivider.types';
import { classNamesFunction } from '../../Utilities';
const getClassNames = classNamesFunction<IVerticalDividerPropsStyles, IVerticalDividerStyles>();

export const VerticalDividerBase: React.FunctionComponent<IVerticalDividerProps> = React.forwardRef<
  HTMLDivElement,
  IVerticalDividerProps
>((props, ref) => {
  // eslint-disable-next-line deprecation/deprecation
  const { styles, theme, getClassNames: deprecatedGetClassNames, className } = props;
  const classNames = getClassNames(styles, { theme: theme, getClassNames: deprecatedGetClassNames, className });
  return (
    <span className={classNames.wrapper} ref={ref}>
      <span className={classNames.divider} />
    </span>
  );
});
VerticalDividerBase.displayName = 'VerticalDividerBase';
