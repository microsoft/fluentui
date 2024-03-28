import {
  concatStyleSets,
  getTheme,
  HighContrastSelector,
  keyframes,
  PulsingBeaconAnimationStyles,
} from '../../Styling';
import { memoizeFunction } from '../../Utilities';
import type { ITheme } from '../../Styling';
import type { IActivityItemStyles, IActivityItemProps } from './ActivityItem.types';

const DEFAULT_PERSONA_SIZE = '32px';
const COMPACT_PERSONA_SIZE = '16px';
const DEFAULT_ICON_SIZE = '16px';
const COMPACT_ICON_SIZE = '13px';
const ANIMATION_INNER_DIMENSION = '4px';
const ANIMATION_OUTER_DIMENSION = '28px';
const ANIMATION_BORDER_WIDTH = '4px';

const fadeIn = memoizeFunction(() =>
  keyframes({
    from: { opacity: 0 },
    to: { opacity: 1 },
  }),
);

const slideIn = memoizeFunction(() =>
  keyframes({
    from: { transform: 'translateX(-10px)' },
    to: { transform: 'translateX(0)' },
  }),
);

export const getStyles = memoizeFunction(
  (
    theme: ITheme = getTheme(),
    customStyles?: IActivityItemStyles,
    animateBeaconSignal?: IActivityItemProps['animateBeaconSignal'],
    beaconColorOne?: IActivityItemProps['beaconColorOne'],
    beaconColorTwo?: IActivityItemProps['beaconColorTwo'],
    isCompact?: IActivityItemProps['isCompact'],
  ): IActivityItemStyles => {
    const continuousPulse = PulsingBeaconAnimationStyles.continuousPulseAnimationSingle(
      beaconColorOne ? beaconColorOne : theme.palette.themePrimary,
      beaconColorTwo ? beaconColorTwo : theme.palette.themeTertiary,
      ANIMATION_INNER_DIMENSION,
      ANIMATION_OUTER_DIMENSION,
      ANIMATION_BORDER_WIDTH,
    );

    const continuousPulseAnimation = {
      animationName: continuousPulse,
      animationIterationCount: '1',
      animationDuration: '.8s',
      zIndex: 1,
    };

    const slideInAnimation = {
      animationName: slideIn(),
      animationIterationCount: '1',
      animationDuration: '.5s',
    };

    const fadeInAnimation = {
      animationName: fadeIn(),
      animationIterationCount: '1',
      animationDuration: '.5s',
    };

    const ActivityItemStyles: IActivityItemStyles = {
      root: [
        theme.fonts.small,
        {
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          boxSizing: 'border-box',
          color: theme.palette.neutralSecondary,
        },
        isCompact && animateBeaconSignal && fadeInAnimation,
      ],

      pulsingBeacon: [
        {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '0px',
          height: '0px',
          borderRadius: '225px',
          borderStyle: 'solid',
          opacity: 0,
        },
        isCompact && animateBeaconSignal && continuousPulseAnimation,
      ],

      isCompactRoot: {
        alignItems: 'center',
      },

      personaContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: DEFAULT_PERSONA_SIZE,
        width: DEFAULT_PERSONA_SIZE,
        height: DEFAULT_PERSONA_SIZE,
      },

      isCompactPersonaContainer: {
        display: 'inline-flex',
        flexWrap: 'nowrap',
        flexBasis: 'auto',
        height: COMPACT_PERSONA_SIZE,
        width: 'auto',
        minWidth: '0',
        paddingRight: '6px',
      },

      activityTypeIcon: {
        height: DEFAULT_PERSONA_SIZE,
        fontSize: DEFAULT_ICON_SIZE,
        lineHeight: DEFAULT_ICON_SIZE,
        marginTop: '3px',
      },

      isCompactIcon: {
        height: COMPACT_PERSONA_SIZE,
        minWidth: COMPACT_PERSONA_SIZE,
        fontSize: COMPACT_ICON_SIZE,
        lineHeight: COMPACT_ICON_SIZE,
        color: theme.palette.themePrimary,
        marginTop: '1px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        selectors: {
          '.ms-Persona-imageArea': {
            margin: '-2px 0 0 -2px',
            border: '2px solid' + theme.palette.white,
            borderRadius: '50%',
            selectors: {
              [HighContrastSelector]: {
                border: 'none',
                margin: '0',
              },
            },
          },
        },
      },

      activityPersona: {
        display: 'block',
      },

      doublePersona: {
        selectors: {
          ':first-child': {
            alignSelf: 'flex-end',
          },
        },
      },

      isCompactPersona: {
        display: 'inline-block',
        width: '8px',
        minWidth: '8px',
        overflow: 'visible',
      },

      activityContent: [
        {
          padding: '0 8px',
        },
        isCompact && animateBeaconSignal && slideInAnimation,
      ],

      activityText: {
        display: 'inline',
      },

      isCompactContent: {
        flex: '1',
        padding: '0 4px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflowX: 'hidden',
      },

      commentText: {
        color: theme.palette.neutralPrimary,
      },

      timeStamp: [
        theme.fonts.tiny,
        {
          fontWeight: 400,
          color: theme.palette.neutralSecondary,
        },
      ],

      isCompactTimeStamp: {
        display: 'inline-block',
        paddingLeft: '0.3em', // One space character
        fontSize: '1em',
      },
    };

    const { __shadowConfig__, ...restStyles } = customStyles || {};

    if (__shadowConfig__) {
      return concatStyleSets(__shadowConfig__, ActivityItemStyles, restStyles);
    }

    return concatStyleSets(ActivityItemStyles, customStyles);
  },
);
