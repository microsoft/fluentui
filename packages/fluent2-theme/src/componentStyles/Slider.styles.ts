import type { ISliderStyleProps, ISliderStyles, IStyleFunctionOrObject } from '@fluentui/react';
import { getRTL } from '@fluentui/react';

export const fluent2SliderThumbSize = 20;

export function getSliderStyles(props: ISliderStyleProps): IStyleFunctionOrObject<ISliderStyleProps, ISliderStyles> {
  const { theme, vertical, disabled } = props;
  const { semanticColors } = theme;

  const slideBoxInactiveSectionStyles = !disabled
    ? {
        backgroundColor: semanticColors.smallInputBorder,
      }
    : undefined;

  const activeSectionStyles = !disabled
    ? {
        backgroundColor: semanticColors.primaryButtonBackgroundHovered,
      }
    : undefined;

  const thumbActiveStyles = !disabled
    ? {
        border: '1px solid ' + semanticColors.smallInputBorder,
      }
    : undefined;

  // since the thumb is now a little bigger,
  // we need to use margin to recenter it in the track
  const thumbMargin = -8;

  const styles: Partial<ISliderStyles> = {
    thumb: [
      {
        background: !disabled ? semanticColors.primaryButtonBackground : semanticColors.disabledBorder,
        boxShadow: `0 0 0 4px ${semanticColors.buttonBackground} inset`,
        borderWidth: 1,
        borderColor: semanticColors.disabledBorder,
        height: fluent2SliderThumbSize,
        width: fluent2SliderThumbSize,
        ':hover': {
          backgroundColor: !disabled ? semanticColors.primaryButtonBackgroundHovered : semanticColors.disabledBorder,
        },
      },
      vertical
        ? {
            left: thumbMargin,
            margin: '0 auto',
            transform: 'translateY(8px)',
          }
        : {
            top: thumbMargin,
            transform: getRTL(theme) ? 'translateX(50%)' : 'translateX(-50%)',
          },
    ],
    activeSection: [
      {
        background: !disabled ? semanticColors.primaryButtonBackground : semanticColors.disabledBorder,
      },
    ],
    inactiveSection: {
      backgroundColor: !disabled ? semanticColors.smallInputBorder : semanticColors.buttonBackgroundDisabled,
    },
    slideBox: [
      {
        [`:active .ms-Slider-inactive`]: slideBoxInactiveSectionStyles,
        [`:hover .ms-Slider-inactive`]: slideBoxInactiveSectionStyles,
        [`:active .ms-Slider-active`]: activeSectionStyles,
        [`:hover .ms-Slider-active`]: activeSectionStyles,
        [':active .' + 'ms-Slider-thumb']: thumbActiveStyles,
        [':hover .' + 'ms-Slider-thumb']: thumbActiveStyles,
      },
    ],
  };

  return styles;
}
