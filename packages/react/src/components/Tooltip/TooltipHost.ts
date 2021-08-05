import * as React from 'react';
import { styled } from '../../Utilities';
import { TooltipHostBase } from './TooltipHost.base';
import { ITooltipHostProps, ITooltipHostStyleProps, ITooltipHostStyles } from './TooltipHost.types';
import { getStyles } from './TooltipHost.styles';

export const TooltipHost: React.FunctionComponent<ITooltipHostProps> = styled<
  ITooltipHostProps,
  ITooltipHostStyleProps,
  ITooltipHostStyles
>(TooltipHostBase, getStyles, undefined, {
  scope: 'TooltipHost',
});
