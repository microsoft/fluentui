import { ITooltipStyleProps, ITooltipStyles, TooltipDelay } from './Tooltip.types';
import { AnimationClassNames } from '../../Styling';

export const getStyles = (props: ITooltipStyleProps): ITooltipStyles => {
  const { className, delay, maxWidth, theme } = props;
  const { palette, fonts } = theme;

  return {
    root: [
      'ms-Tooltip',
      theme.fonts.medium,
      AnimationClassNames.fadeIn200,
      {
        background: palette.white,
        padding: '8px',
        animationDelay: '300ms',
        maxWidth: maxWidth
      },
      delay === TooltipDelay.zero && {
        animationDelay: '0s'
      },
      delay === TooltipDelay.long && {
        animationDelay: '500ms'
      },
      className
    ],
    content: [
      'ms-Tooltip-content',
      fonts.small,
      palette.neutralPrimary,
      {
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        overflow: 'hidden'
      }
    ],
    subText: [
      'ms-Tooltip-subtext',
      {
        margin: 0
      }
    ]
  };
};
