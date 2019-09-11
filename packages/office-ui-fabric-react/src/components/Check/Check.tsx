import * as React from 'react';
import { styled, memoizeFunction } from '../../Utilities';
import { ICheckProps, ICheckStyleProps, ICheckStyles } from './Check.types';
import { CheckBase } from './Check.base';
import { getStyles } from './Check.styles';
import { ITheme } from '../../Styling';

export const Check: React.FunctionComponent<ICheckProps> = styled<ICheckProps, ICheckStyleProps, ICheckStyles>(
  CheckBase,
  getStyles,
  undefined,
  {
    scope: 'Check'
  },
  true
);

/**
 * Memoized helper for rendering a Check. Always uses fast icons.
 * @param theme - Theme, so the check can be re-rendered if it changes.
 * @param checked - Whether the check is checked.
 * @param className - Class name for styling the check.
 */
export const getCheck = memoizeFunction((theme?: ITheme, checked?: boolean, className?: string) => {
  return <Check theme={theme} checked={checked} className={className} useFastIcons />;
});
