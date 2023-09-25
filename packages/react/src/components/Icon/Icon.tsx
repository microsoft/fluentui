import * as React from 'react';
import { styled } from '../../Utilities';
import { IconBase } from './Icon.base';
import { getStyles } from './Icon.styles';
import type { IIconProps, IIconStyleProps, IIconStyles } from './Icon.types';

/**
 * Legacy Icon component which can be targeted by customization. It's recommended to use `FontIcon`
 * or `ImageIcon` instead, especially in scenarios where rendering performance is important.
 * {@docCategory Icon}
 */
export const Icon: React.FunctionComponent<IIconProps> = styled<IIconProps, IIconStyleProps, IIconStyles>(
  IconBase,
  getStyles,
  undefined,
  {
    scope: 'Icon',
  },
  true,
);
Icon.displayName = 'Icon';
