// THIS FILE IS GENERATED AS PART OF THE BUILD PROCESS. DO NOT MANUALLY MODIFY THIS FILE
import { cornerCtrlRestRaw } from '../../control/variables';
import { borderRadiusMedium, colorNeutralBackground1, colorNeutralForeground1 } from '../../legacy/tokens';
import { ctrlFabShadowRestRaw } from '../fab/variables';
import {
  ctrlTooltipCornerRaw,
  ctrlTooltipBackgroundRaw,
  ctrlTooltipForegroundRaw,
  ctrlTooltipShadowRaw,
} from './variables';

export const ctrlTooltipCorner = `var(${ctrlTooltipCornerRaw}, var(${cornerCtrlRestRaw}, ${borderRadiusMedium}))`;
export const ctrlTooltipBackground = `var(${ctrlTooltipBackgroundRaw}, ${colorNeutralBackground1})`;
export const ctrlTooltipForeground = `var(${ctrlTooltipForegroundRaw}, ${colorNeutralForeground1})`;
export const ctrlTooltipShadow = `var(${ctrlTooltipShadowRaw}, var(${ctrlFabShadowRestRaw}, drop-shadow(0 0 2px var(--colorNeutralShadowAmbient)) drop-shadow(0 4px 8px var(--colorNeutralShadowKey))))`;
