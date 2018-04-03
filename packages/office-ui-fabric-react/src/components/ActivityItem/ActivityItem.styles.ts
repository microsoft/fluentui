import {
  concatStyleSets,
  ITheme,
  getTheme,
  HighContrastSelector,
  keyframes,
  IRawStyle
  // PulsingBeaconAnimationStyles
} from '../../Styling';
import {
  memoizeFunction
} from '../../Utilities';
import { IActivityItemStyles, IActivityItemProps } from './ActivityItem.types';

const DEFAULT_PERSONA_SIZE = '32px';
const COMPACT_PERSONA_SIZE = '16px';
const DEFAULT_ICON_SIZE = '16px';
const COMPACT_ICON_SIZE = '13px';

function continuousPulseStepOne(beaconColorOne: string): IRawStyle {
  return {
    borderColor: beaconColorOne,
    borderWidth: '0px',
    width: '8px',
    height: '8px'
  };
}

function continuousPulseStepTwo(): IRawStyle {
  return {
    opacity: 1,
    borderWidth: '5px'
  };
}

function continuousPulseStepThree(): IRawStyle {
  return {
    opacity: 1
  };
}

function continuousPulseStepFour(beaconColorTwo: string): IRawStyle {
  return {
    borderWidth: '0',
    width: '32px',
    height: '32px',
    opacity: 0,
    borderColor: beaconColorTwo
  };
}

function continuousPulseStepFive(beaconColorOne: string): IRawStyle {
  return {
    ...continuousPulseStepOne(beaconColorOne),
    ...{
      opacity: 0
    }
  };
}

export const getStyles = memoizeFunction((
  props: IActivityItemProps,
  theme: ITheme = getTheme(),
  customStyles?: IActivityItemStyles
): IActivityItemStyles => {
  const ContinuousPulse: string = keyframes({
    '0%': continuousPulseStepOne(props.beaconColorOne!),
    '1.42%': continuousPulseStepTwo(),
    '3.57%': continuousPulseStepThree(),
    '7.14%': continuousPulseStepFour(props.beaconColorTwo!),
    '8%': continuousPulseStepFive(props.beaconColorOne!),
    '29.99%': continuousPulseStepFive(props.beaconColorOne!),
    '30%': continuousPulseStepOne(props.beaconColorOne!),
    '31.42%': continuousPulseStepTwo(),
    '33.57%': continuousPulseStepThree(),
    '37.14%': continuousPulseStepFour(props.beaconColorTwo!),
    '38%': continuousPulseStepFive(props.beaconColorOne!),
    '79.42%': continuousPulseStepFive(props.beaconColorOne!),
    '79.43': continuousPulseStepOne(props.beaconColorOne!),
    '81.85': continuousPulseStepTwo(),
    '83.42': continuousPulseStepThree(),
    '87%': continuousPulseStepFour(props.beaconColorTwo!),
    '100%': {}
  });

  // const ContinuousPulseTwo = PulsingBeaconAnimationStyles.continuousPulseAnimation(props.beaconColorOne!, props.beaconColorTwo!, '8px', '32px', '5px');

  const ActivityItemStyles: IActivityItemStyles = {

    root: [
      theme.fonts.small,
      {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        lineHeight: '17px',
        boxSizing: 'border-box',
        color: theme.palette.neutralSecondary
      }
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
        opacity: 0
      },
      (props.animateBeaconSignal && props.isCompact) && {
        animationName: ContinuousPulse,
        animationIterationCount: '1',
        animationDuration: '14s',
        animationDelay: '2s'
      }
    ],

    isCompactRoot: {
      alignItems: 'center'
    },

    personaContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: DEFAULT_PERSONA_SIZE,
      width: DEFAULT_PERSONA_SIZE,
      height: DEFAULT_PERSONA_SIZE
    },

    isCompactPersonaContainer: {
      display: 'inline-flex',
      flexWrap: 'nowrap',
      flexBasis: 'auto',
      height: COMPACT_PERSONA_SIZE,
      width: 'auto',
      minWidth: '0',
      paddingRight: '6px'
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
              marginTop: '0'
            }
          }
        }
      }
    },

    activityPersona: {
      display: 'block'
    },

    doublePersona: {
      selectors: {
        ':first-child': {
          alignSelf: 'flex-end'
        }
      }
    },

    isCompactPersona: {
      display: 'inline-block',
      width: '8px',
      minWidth: '8px',
      overflow: 'visible'
    },

    activityContent: {
      padding: '0 8px'
    },

    activityText: {
      display: 'inline'
    },

    isCompactContent: {
      flex: '1',
      padding: '0 4px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflowX: 'hidden'
    },

    commentText: {
      color: theme.palette.neutralPrimary
    },

    timeStamp: [
      theme.fonts.tiny,
      {
        fontWeight: 400,
        color: theme.palette.neutralSecondary
      }
    ],

    isCompactTimeStamp: {
      display: 'inline-block',
      paddingLeft: '0.3em', // One space character
      fontSize: '1em'
    }
  };

  return concatStyleSets(ActivityItemStyles, customStyles);
});
