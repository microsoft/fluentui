import { ITooltipStyleProps, ITooltipStyles } from './Tooltip.types';
import { AnimationClassNames } from '../../Styling';

export const getStyles = (props: ITooltipStyleProps): ITooltipStyles => {
  const { className, gapSpace = 0, maxWidth, theme } = props;
  const { palette, fonts } = theme;

  const tooltipGapSpace = -15 - gapSpace;

  return {
    root: [
      'ms-Tooltip',
      theme.fonts.medium,
      AnimationClassNames.fadeIn200,
      {
        background: palette.white,
        padding: '8px',
        maxWidth: maxWidth,
        selectors: {
          ':after': {
            content: `''`,
            position: 'absolute',
            bottom: tooltipGapSpace,
            left: tooltipGapSpace,
            right: tooltipGapSpace,
            top: tooltipGapSpace
          }
        }
      },
      className
    ],
    content: [
      'ms-Tooltip-content',
      fonts.small,
      {
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
