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

  const indeterminateProgress = keyframes({
    '0%': {
      left: '-30%',
    },
    '100%': {
      left: '100%',
    }
  });
  const indeterminateProgressRTL = keyframes({
    '100%': {
      right: '-30%',
    },
    '0%': {
      right: '100%',
    }
  });

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
        paddingTop: `${marginBetweenText / 2}px`,
        lineHeight: `${textHeight + 2}px`,
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
        height: `${barHeight}px`,
        padding: `${marginBetweenText}px 0`,
      }
    ],

    progressTrack: [
      'ms-ProgressIndicator-progressTrack',
      {
        position: 'absolute',
        width: '100%',
        height: `${barHeight}px`,
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
        height: `${barHeight}px`,
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
        },
        isRTL
          ? {
            animation: `${indeterminateProgressRTL} 3s infinite`,
          } :
          {
            animation: `${indeterminateProgress} 3s infinite`,
          }
      ],
    ],
  });
};