import {
  FontSizes,
  FontWeights,
  HighContrastSelector,
  keyframes,
  noWrap,
} from '../../Styling';
import { getRTL } from '../../Utilities';
import {
  IProgressIndicatorStyleProps,
  IProgressIndicatorStyles,
} from './ProgressIndicator.types';

const IndeterminateProgress = keyframes({
  '0%': {
    left: '-30%',
  },
  '100%': {
    left: '100%',
  }
});
const IndeterminateProgressRTL = keyframes({
  '100%': {
    right: '-30%',
  },
  '0%': {
    right: '100%',
  }
});

export const getStyles = (
  props: IProgressIndicatorStyleProps
): IProgressIndicatorStyles => {
  const isRTL = getRTL();
  const {
    className,
    indeterminate,
    theme,
    barHeight = 2,
  } = props;

  const { palette, semanticColors } = theme;

  const marginBetweenText = 8;
  const textHeight = 18;

  return ({
    root: [
      'ms-ProgressIndicator',
      {
        fontWeight: FontWeights.regular,
      },
      className
    ],

    itemName: [
      'ms-ProgressIndicator-itemName',
      noWrap,
      {
        color: semanticColors.bodyText,
        fontSize: FontSizes.medium,
        paddingTop: marginBetweenText / 2,
        lineHeight: textHeight + 2,
      }
    ],

    itemDescription: [
      'ms-ProgressIndicator-itemDescription',
      {
        color: semanticColors.bodySubtext,
        fontSize: FontSizes.xSmall,
        lineHeight: textHeight,
      }
    ],

    itemProgress: [
      'ms-ProgressIndicator-itemProgress',
      {
        position: 'relative',
        overflow: 'hidden',
        height: barHeight,
        padding: `${marginBetweenText}px 0`,
      }
    ],

    progressTrack: [
      'ms-ProgressIndicator-progressTrack',
      {
        position: 'absolute',
        width: '100%',
        height: barHeight,
        backgroundColor: palette.neutralLight,

        selectors: {
          [HighContrastSelector]: {
            borderBottom: '1px solid WindowText',
          }
        }
      }
    ],

    progressBar: [
      'ms-ProgressIndicator-progressBar',
      {
        backgroundColor: palette.themePrimary,
        height: barHeight,
        position: 'absolute',
        transition: 'width .3s ease',
        width: 0,

        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'WindowText',
          }
        }
      },
      !indeterminate && {
        transition: 'width .15s linear'
      },
      indeterminate && [
        {
          position: 'absolute',
          minWidth: '33%',
          background: `linear-gradient(to right, transparent 0%, ${palette.themePrimary} 50%, transparent 100%)`,
          animation: `${IndeterminateProgress} 3s infinite`,
        },
        isRTL && { animation: `${IndeterminateProgressRTL} 3s infinite` },
      ],
    ],
  });
};
