import {
  HighContrastSelector,
  keyframes,
  noWrap,
  getGlobalClassNames,
  getHighContrastNoAdjustStyle,
} from '../../Styling';
import { getRTL, memoizeFunction } from '../../Utilities';
import type { IRawStyle } from '../../Styling';
import type { IProgressIndicatorStyleProps, IProgressIndicatorStyles } from './ProgressIndicator.types';

const GlobalClassNames = {
  root: 'ms-ProgressIndicator',
  itemName: 'ms-ProgressIndicator-itemName',
  itemDescription: 'ms-ProgressIndicator-itemDescription',
  itemProgress: 'ms-ProgressIndicator-itemProgress',
  progressTrack: 'ms-ProgressIndicator-progressTrack',
  progressBar: 'ms-ProgressIndicator-progressBar',
};

const IndeterminateProgress = memoizeFunction(() =>
  keyframes({
    '0%': {
      left: '-30%',
    },
    '100%': {
      left: '100%',
    },
  }),
);

const IndeterminateProgressRTL = memoizeFunction(() =>
  keyframes({
    '100%': {
      right: '-30%',
    },
    '0%': {
      right: '100%',
    },
  }),
);

export const getStyles = (props: IProgressIndicatorStyleProps): IProgressIndicatorStyles => {
  const isRTL = getRTL(props.theme);
  const { className, indeterminate, theme, barHeight = 2 } = props;

  const { palette, semanticColors, fonts } = theme;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const marginBetweenText = 8;
  const textHeight = 18;
  const progressTrackColor = palette.neutralLight;

  return {
    root: [classNames.root, fonts.medium, className],

    itemName: [
      classNames.itemName,
      noWrap,
      {
        color: semanticColors.bodyText,
        paddingTop: marginBetweenText / 2,
        lineHeight: textHeight + 2,
      },
    ],

    itemDescription: [
      classNames.itemDescription,
      {
        color: semanticColors.bodySubtext,
        fontSize: fonts.small.fontSize,
        lineHeight: textHeight,
      },
    ],

    itemProgress: [
      classNames.itemProgress,
      {
        position: 'relative',
        overflow: 'hidden',
        height: barHeight,
        padding: `${marginBetweenText}px 0`,
      },
    ],

    progressTrack: [
      classNames.progressTrack,
      {
        position: 'absolute',
        width: '100%',
        height: barHeight,
        backgroundColor: progressTrackColor,

        selectors: {
          [HighContrastSelector]: {
            borderBottom: '1px solid WindowText',
          },
        },
      },
    ],

    progressBar: [
      {
        backgroundColor: palette.themePrimary,
        height: barHeight,
        position: 'absolute',
        transition: 'width .3s ease',
        width: 0,

        selectors: {
          [HighContrastSelector]: {
            backgroundColor: 'highlight',
            ...getHighContrastNoAdjustStyle(),
          },
        },
      },

      indeterminate
        ? ({
            position: 'absolute',
            minWidth: '33%',
            background:
              `linear-gradient(to right, ${progressTrackColor} 0%, ` +
              `${palette.themePrimary} 50%, ${progressTrackColor} 100%)`,
            animation: `${isRTL ? IndeterminateProgressRTL() : IndeterminateProgress()} 3s infinite`,
            selectors: {
              [HighContrastSelector]: {
                background: `highlight`,
              },
            },
          } as IRawStyle)
        : ({
            transition: 'width .15s linear',
          } as IRawStyle),
      classNames.progressBar,
    ],
  };
};
