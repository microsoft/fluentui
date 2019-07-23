import * as React from 'react';
import { ICheckProps } from './Check.types';
import { Icon } from '../../Icon';
import { classNamesFunction } from '../../Utilities';
import { ICheckStyleProps, ICheckStyles } from './Check.types';

const getClassNames = classNamesFunction<ICheckStyleProps, ICheckStyles>();

export const CheckBase: React.FunctionComponent<ICheckProps> = props => {
  const { checked = false, className, theme, styles } = props;

  const classNames = getClassNames(styles!, { theme: theme!, className, checked });

  return (
    <div className={classNames.root}>
      <Icon iconName="CircleRing" className={classNames.circle} />
      <Icon iconName="StatusCircleCheckmark" className={classNames.check} />
    </div>
  );
};
