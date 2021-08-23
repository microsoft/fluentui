import * as React from 'react';
import { styled } from '../../Utilities';
import { TooltipBase } from './Tooltip.base';
import { getStyles } from './Tooltip.styles';
import type { ITooltipProps, ITooltipStyleProps, ITooltipStyles } from './Tooltip.types';

export const Tooltip: React.FunctionComponent<ITooltipProps> = styled<
  ITooltipProps,
  ITooltipStyleProps,
  ITooltipStyles
>(TooltipBase, getStyles, undefined, {
  scope: 'Tooltip',
});
