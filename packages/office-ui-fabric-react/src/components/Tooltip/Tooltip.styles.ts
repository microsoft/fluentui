import { ITooltipStyleProps, ITooltipStyles } from './Tooltip.types';
import { AnimationClassNames } from '../../Styling';

export const getStyles = (props: ITooltipStyleProps): ITooltipStyles => {
  const { className, beakWidth = 16, gapSpace = 0, maxWidth, theme } = props;
  const { palette, semanticColors, fonts, effects } = theme;

  // The math here is done to account for the 45 degree rotation of the beak
  const tooltipGapSpace = -(Math.sqrt((beakWidth * beakWidth) / 2) + gapSpace);

  return {
    root: [
      'ms-Tooltip',
      theme.fonts.medium,
      AnimationClassNames.fadeIn200,
      {
        background: semanticColors.menuBackground,
        boxShadow: effects.elevation8,
        padding: '8px',
        maxWidth: maxWidth,
        selectors: {
          ':after': {
            content: `''`,
            position: 'absolute',
            bottom: tooltipGapSpace,
            left: tooltipGapSpace,
            right: tooltipGapSpace,
            top: tooltipGapSpace,
            zIndex: 0
          }
        }
      },
      className
    ],
    content: [
      'ms-Tooltip-content',
      fonts.small,
      {
        position: 'relative',
        zIndex: 1,
        color: palette.neutralPrimary,
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        overflow: 'hidden'
      }
    ],
    subText: [
      'ms-Tooltip-subtext',
      {
        // Using inherit here to avoid unintentional global overrides of the <p> tag.
        fontSize: 'inherit',
        fontWeight: 'inherit',
        color: 'inherit',
        margin: 0
      }
    ]
  };
};
