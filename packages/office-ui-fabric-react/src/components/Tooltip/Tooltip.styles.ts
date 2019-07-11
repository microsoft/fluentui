import { ITooltipStyleProps, ITooltipStyles, TooltipDelay } from './Tooltip.types';
import { AnimationClassNames } from '../../Styling';
import { DirectionalHint } from '../../common/DirectionalHint';

export const getStyles = (props: ITooltipStyleProps): ITooltipStyles => {
  const { className, delay, directionalHint, gapSpace, maxWidth, theme } = props;
  const { palette, fonts } = theme;

  // To add a hidden area to allow for hover over the tooltip we check the render position of the Tooltip and add add the
  // hover area on the opposite end of the tooltip (i.e. if the Tooltip is rendered on the top right of the component we
  // should add a hover area on the bottom left of the tooltip).
  const bottomDirection =
    directionalHint === DirectionalHint.leftTopEdge ||
    directionalHint === DirectionalHint.rightTopEdge ||
    directionalHint === DirectionalHint.topAutoEdge ||
    directionalHint === DirectionalHint.topCenter ||
    directionalHint === DirectionalHint.topLeftEdge ||
    directionalHint === DirectionalHint.topRightEdge;
  const leftDirection =
    directionalHint === DirectionalHint.bottomRightEdge ||
    directionalHint === DirectionalHint.rightBottomEdge ||
    directionalHint === DirectionalHint.rightCenter ||
    directionalHint === DirectionalHint.rightTopEdge ||
    directionalHint === DirectionalHint.topRightEdge;
  const rightDirection =
    directionalHint === DirectionalHint.bottomLeftEdge ||
    directionalHint === DirectionalHint.leftBottomEdge ||
    directionalHint === DirectionalHint.leftCenter ||
    directionalHint === DirectionalHint.leftTopEdge ||
    directionalHint === DirectionalHint.topLeftEdge;
  const topDirection =
    directionalHint === DirectionalHint.bottomAutoEdge ||
    directionalHint === DirectionalHint.bottomCenter ||
    directionalHint === DirectionalHint.bottomLeftEdge ||
    directionalHint === DirectionalHint.bottomRightEdge ||
    directionalHint === DirectionalHint.leftBottomEdge ||
    directionalHint === DirectionalHint.rightBottomEdge;

  return {
    root: [
      'ms-Tooltip',
      theme.fonts.medium,
      AnimationClassNames.fadeIn200,
      {
        background: palette.white,
        padding: '8px',
        animationDelay: '300ms',
        maxWidth: maxWidth,
        selectors: {
          ':after': {
            content: `''`,
            position: 'absolute',
            bottom: bottomDirection ? -1 * gapSpace : 0,
            left: leftDirection ? -1 * gapSpace : 0,
            right: rightDirection ? -1 * gapSpace : 0,
            top: topDirection ? -1 * gapSpace : 0
          }
        }
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
