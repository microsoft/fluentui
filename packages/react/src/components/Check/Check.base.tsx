import * as React from 'react';
import { Icon, FontIcon } from '../../Icon';
import { classNamesFunction } from '../../Utilities';
import type { ICheckProps, ICheckStyleProps, ICheckStyles } from './Check.types';

const getClassNames = classNamesFunction<ICheckStyleProps, ICheckStyles>();

export const CheckBase: React.FunctionComponent<ICheckProps> = React.forwardRef<HTMLDivElement, ICheckProps>(
  (props, ref) => {
    const { checked = false, className, theme, styles, useFastIcons = true } = props;

    const classNames = getClassNames(styles!, { theme: theme!, className, checked });
    const IconComponent = useFastIcons ? FontIcon : Icon;

    return (
      <div className={classNames.root} ref={ref}>
        <IconComponent iconName="CircleRing" className={classNames.circle} />
        <IconComponent iconName="StatusCircleCheckmark" className={classNames.check} />
      </div>
    );
  },
);
CheckBase.displayName = 'CheckBase';
