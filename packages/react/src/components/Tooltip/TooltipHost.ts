import * as React from 'react';
import { styled } from '../../Utilities';
import { TooltipHostBase } from './TooltipHost.base';
import { getStyles } from './TooltipHost.styles';
import type { ITooltipHostProps, ITooltipHostStyleProps, ITooltipHostStyles } from './TooltipHost.types';

export const TooltipHost: React.FunctionComponent<ITooltipHostProps> = styled<
  ITooltipHostProps,
  ITooltipHostStyleProps,
  ITooltipHostStyles
>(TooltipHostBase, getStyles, undefined, {
  scope: 'TooltipHost',
});
