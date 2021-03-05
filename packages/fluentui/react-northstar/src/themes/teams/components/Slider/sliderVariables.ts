import { pxToRem } from '../../../../utils';
import { SiteVariablesPrepared } from '@fluentui/styles';

export interface SliderVariables {
  height: string;
  length: string;

  railColor: string;
  railHeight: string;
  disabledRailColor: string;

  thumbColor: string;
  activeThumbColor: string;
  disabledThumbColor: string;
  thumbHeight: string;
  activeThumbHeight: string;
  thumbBorderPadding: string;
  thumbWidth: string;
  activeThumbWidth: string;

  trackColor: string;
  disabledTrackColor: string;
}
export const sliderVariables = (siteVars: SiteVariablesPrepared): SliderVariables => {
  const { colorScheme } = siteVars;

  return {
    height: pxToRem(16),
    length: pxToRem(320),

    railColor: colorScheme.default.border,
    disabledRailColor: colorScheme.default.backgroundDisabled1,
    railHeight: pxToRem(2),

    thumbColor: colorScheme.default.foreground2,
    activeThumbColor: colorScheme.default.foreground1,
    disabledThumbColor: colorScheme.default.foregroundDisabled1,
    thumbHeight: pxToRem(10),
    activeThumbHeight: pxToRem(14),
    thumbBorderPadding: pxToRem(4),
    thumbWidth: pxToRem(10),
    activeThumbWidth: pxToRem(14),

    trackColor: colorScheme.brand.foregroundActive,
    disabledTrackColor: colorScheme.default.foregroundDisabled1,
  };
};
