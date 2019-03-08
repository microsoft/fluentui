import { styled } from '../../Utilities';
import { TooltipBase } from './Tooltip.base';
import { ITooltipProps, ITooltipStyleProps, ITooltipStyles } from './Tooltip.types';
import { getStyles } from './Tooltip.styles';

export const Tooltip: React.StatelessComponent<ITooltipProps> = styled<ITooltipProps, ITooltipStyleProps, ITooltipStyles>(
  TooltipBase,
  getStyles,
  undefined,
  {
    scope: 'Tooltip'
  }
);
