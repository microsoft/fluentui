import * as React from 'react';
import { ICheckProps } from './Check.types';
import { Icon, FontIcon } from '../../Icon';
import { classNamesFunction } from '../../Utilities';
import { ICheckStyleProps, ICheckStyles } from './Check.types';

const getClassNames = classNamesFunction<ICheckStyleProps, ICheckStyles>();

export const CheckBase: React.FunctionComponent<ICheckProps> = props => {
  const { checked = false, className, theme, styles, useFastIcons = true } = props;

  const classNames = getClassNames(styles!, { theme: theme!, className, checked });
  const IconComponent = useFastIcons ? FontIcon : Icon;

  return (
    <div className={classNames.root}>
      <IconComponent iconName="CircleRing" className={classNames.circle} />
      <IconComponent iconName="StatusCircleCheckmark" className={classNames.check} />
    </div>
  );
};
