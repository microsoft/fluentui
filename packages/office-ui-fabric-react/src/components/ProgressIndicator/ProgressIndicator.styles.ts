import {
  FontSizes,
  FontWeights,
  HighContrastSelector,
  IStyle,
  keyframes,
  noWrap,
} from '../../Styling';
import {
  IProgressIndicatorStyleProps,
  IProgressIndicatorStyles,
} from './ProgressIndicator.types';

export const getStyles = (
  props: IProgressIndicatorStyleProps
): IProgressIndicatorStyles => {
  const {
    className,
    indeterminate,
    smoothTransition,
    theme,
    barHeight = 2,
  } = props;

  const { palette, semanticColors } = theme;

  const marginBetweenText = 8;
  const buttonsWidth = 218;
  const textHeight = 18;

  const indeterminateProgress = keyframes({
    '0%': {
      left: '-30%',
    },
    '100%': {
      left: '100%',
    }
  });

  const indeterminateStyles: IStyle = {
    position: 'absolute',
    minWidth: '33%',
    background: `linear-gradient(to right, transparent 0%, ${palette.themePrimary} 50%, transparent 100%)`,
    animation: `${indeterminateProgress} 3s infinite`,
  };

  const smoothTransitionStyles: IStyle = {
    transitionProperty: 'width',
    transitionTimingFunction: 'linear',
    transitionDuration: '150ms',
  };

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
        color: palette.neutralPrimary,
        fontSize: FontSizes.medium,
        paddingTop: marginBetweenText / 2,
        lineHeight: textHeight + 2,
      }
    ],

    itemDescription: [
      'ms-ProgressIndicator-itemDescription',
      {
        color: palette.neutralSecondary,
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
        padding: `${marginBetweenText} 0`,
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
      indeterminate && indeterminateStyles,
      smoothTransition && smoothTransitionStyles,
    ],
  });
};