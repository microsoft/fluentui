import { AnimationClassNames } from '../../Styling';
import type { ITooltipStyleProps, ITooltipStyles } from './Tooltip.types';

export const getStyles = (props: ITooltipStyleProps): ITooltipStyles => {
  const { className, beakWidth = 16, gapSpace = 0, maxWidth, theme } = props;
  const { semanticColors, fonts, effects } = theme;

  // The math here is done to account for the 45 degree rotation of the beak
  // and sub-pixel rounding that differs across browsers, which is more noticeable when
  // the device pixel ratio is larger
  const tooltipGapSpace =
    -(Math.sqrt((beakWidth * beakWidth) / 2) + gapSpace) +
    1 /
      // There isn't really a great way to pass in a `window` reference here so disabling the line rule
      // eslint-disable-next-line no-restricted-globals
      window.devicePixelRatio;

  return {
    root: [
      'ms-Tooltip',
      theme.fonts.medium,
      AnimationClassNames.fadeIn200,
      {
        background: semanticColors.menuBackground,
        boxShadow: effects.elevation8,
        padding: '8px',
        maxWidth,
        selectors: {
          ':after': {
            content: `''`,
            position: 'absolute',
            bottom: tooltipGapSpace,
            left: tooltipGapSpace,
            right: tooltipGapSpace,
            top: tooltipGapSpace,
            zIndex: 0,
          },
        },
      },
      className,
    ],
    content: [
      'ms-Tooltip-content',
      fonts.small,
      {
        position: 'relative',
        zIndex: 1,
        color: semanticColors.menuItemText,
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        overflow: 'hidden',
      },
    ],
    subText: [
      'ms-Tooltip-subtext',
      {
        // Using inherit here to avoid unintentional global overrides of the <p> tag.
        fontSize: 'inherit',
        fontWeight: 'inherit',
        color: 'inherit',
        margin: 0,
      },
    ],
  };
};
