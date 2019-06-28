import * as React from 'react';
import { IFastCheckProps, ICheckStyleProps, ICheckStyles } from './Check.types';
import { getStyles } from './Check.styles';
import { FontIcon } from '../../Icon';
import { classNamesFunction, styled } from '../../Utilities';

const getClassNames = classNamesFunction<ICheckStyleProps, ICheckStyles>();

/**
 * Faster check component. Still in development, so props are subject to change.
 * @beta
 */
export const FastCheckBase: React.StatelessComponent<IFastCheckProps> = props => {
  const { checked = false, className, theme, styles } = props;

  const classNames = getClassNames(styles!, { theme: theme!, className, checked });

  return (
    <div className={classNames.root}>
      <FontIcon iconName="CircleRing" className={classNames.circle} />
      <FontIcon iconName="StatusCircleCheckmark" className={classNames.check} />
    </div>
  );
};

export const FastCheck: React.StatelessComponent<IFastCheckProps> = styled<IFastCheckProps, ICheckStyleProps, ICheckStyles>(
  FastCheckBase,
  getStyles,
  undefined,
  {
    scope: 'Check'
  },
  true
);
