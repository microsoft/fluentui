import * as React from 'react';
import { ICheckProps } from './Check.types';
import { FontIcon } from '../../Icon';
import { classNamesFunction } from '../../Utilities';
import { ICheckStyleProps, ICheckStyles } from './Check.types';

const getClassNames = classNamesFunction<ICheckStyleProps, ICheckStyles>();

export const CheckBase: React.StatelessComponent<ICheckProps> = props => {
  const { checked = false, className, theme, styles } = props;

  const classNames = getClassNames(styles!, { theme: theme!, className, checked });

  return (
    <div className={classNames.root}>
      <FontIcon iconName="CircleRing" className={classNames.circle} />
      <FontIcon iconName="StatusCircleCheckmark" className={classNames.check} />
    </div>
  );
};
