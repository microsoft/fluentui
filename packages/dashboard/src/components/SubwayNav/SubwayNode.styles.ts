import { DefaultFontStyles, FontWeights, IStyle, keyframes } from 'office-ui-fabric-react';
import { NeutralColors, SharedColors } from '@uifabric/fluent-theme';
import {
  IconNames,
  IconMap,
  ISubwayNavNodeStyles,
  ISubwayNavNodeStyleProps,
  SubwayNavNodeState,
  IconColorMap,
  IconRingColorMap
} from './SubwayNode.types';

export const subwayColors = {
  text: NeutralColors.gray160,
  disableText: NeutralColors.gray90,
  completedWizard: '#6BB700' /* online color not yet in fluent theme*/,
  completed: SharedColors.cyanBlue10,
  current: '#C0DEF6',
  error: '#A80000' /*Error Block Icon color not yet in fluent theme */,
  none: 'none',
  notStarted: NeutralColors.gray30
};

export const fadeIn = keyframes({
  from: {
    opacity: '0.0',
    visibility: 'visible',
    transform: 'translateY(10px)'
  },
  to: {
    opacity: '1.0'
  }
});

export const itemSpacing = 27;

export const getIconMap = (isSubStep: boolean): IconMap => {
  return isSubStep
    ? {
        Completed: IconNames.FullCircleMask,
        CurrentWithSubSteps: undefined,
        Current: IconNames.FullCircleMask,
        Error: IconNames.FullCircleMask,
        NotStarted: undefined,
        Skipped: undefined,
        Unsaved: IconNames.FullCircleMask,
        ViewedNotCompleted: IconNames.FullCircleMask,
        WizardComplete: IconNames.FullCircleMask
      }
    : {
        Completed: IconNames.CompletedSolid,
        CurrentWithSubSteps: IconNames.FullCircleMask,
        Current: IconNames.FullCircleMask,
        Error: IconNames.StatusErrorFull,
        NotStarted: undefined,
        Skipped: undefined,
        Unsaved: IconNames.FullCircleMask,
        ViewedNotCompleted: IconNames.FullCircleMask,
        WizardComplete: IconNames.CompletedSolid
      };
};

export const getIconColorMap = (isSubStep: boolean): IconColorMap => {
  return isSubStep
    ? {
        Completed: subwayColors.completed,
        CurrentWithSubSteps: subwayColors.none,
        Current: subwayColors.current,
        Error: subwayColors.error,
        NotStarted: subwayColors.none,
        Skipped: subwayColors.none,
        Unsaved: subwayColors.current,
        ViewedNotCompleted: subwayColors.completed,
        WizardComplete: subwayColors.completedWizard
      }
    : {
        Completed: subwayColors.completed,
        CurrentWithSubSteps: subwayColors.completed,
        Current: subwayColors.current,
        Error: subwayColors.error,
        NotStarted: subwayColors.none,
        Skipped: subwayColors.none,
        Unsaved: subwayColors.current,
        ViewedNotCompleted: subwayColors.completed,
        WizardComplete: subwayColors.completedWizard
      };
};

export const getIconRingColorMap = (isSubStep: boolean): IconRingColorMap => {
  return isSubStep
    ? {
        Completed: subwayColors.none,
        CurrentWithSubSteps: subwayColors.none,
        Current: subwayColors.none,
        Error: subwayColors.none,
        NotStarted: subwayColors.notStarted,
        Skipped: subwayColors.completed,
        Unsaved: subwayColors.completed,
        ViewedNotCompleted: subwayColors.none,
        WizardComplete: subwayColors.none
      }
    : {
        Completed: subwayColors.none,
        CurrentWithSubSteps: subwayColors.none,
        Current: subwayColors.none,
        Error: subwayColors.none,
        NotStarted: subwayColors.notStarted,
        Skipped: subwayColors.completed,
        Unsaved: subwayColors.completed,
        ViewedNotCompleted: subwayColors.none,
        WizardComplete: subwayColors.none
      };
};

export const getSubwayNodeStyles = (props: ISubwayNavNodeStyleProps): ISubwayNavNodeStyles => {
  const { disabled, isSubStep, iconRecord, state, index } = props;
  const useSelectedStyle: boolean = state === SubwayNavNodeState.Current || state === SubwayNavNodeState.CurrentWithSubSteps;

  const commonLabelStyles: IStyle = [
    {
      flex: '1 1 auto',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: subwayColors.text
    },
    isSubStep && {
      transform: 'translateY(-2px)'
    }
  ];

  const iconSize: string = isSubStep ? '8px' : '16px';
  return {
    root: [
      {
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column'
      }
    ],
    flexContainer: [
      {
        opacity: 0,
        display: 'flex',
        alignItems: 'center',
        cursor: disabled ? 'default' : 'pointer',
        animationName: fadeIn,
        animationDuration: '.300s',
        animationFillMode: 'forwards',
        animationDelay: 0.05 * index + 's',
        animationTimingFunction: 'cubic-bezier(.33, 0, .60, 1)',
        background: 'white'
      },
      !isSubStep && {
        padding: '2px 0px 3px 0px'
      }
    ],
    iconContainer: [
      {
        flex: '0 0 16px',
        height: '16px',
        display: 'block'
      }
    ],
    icon: [
      iconRecord && iconRecord.subset.className,
      {
        fill: getIconColorMap(isSubStep)[state],
        fontSize: iconSize
      }
    ],
    iconRing: [
      {
        stroke: getIconRingColorMap(isSubStep)[state],
        fill: 'none',
        strokeWidth: 2,
        fontSize: iconSize
      }
    ],
    spacer: [{ width: '12px' }],
    label: [
      isSubStep && DefaultFontStyles.small,
      commonLabelStyles,
      {
        display: useSelectedStyle ? 'none' : 'block'
      }
    ],
    labelSelected: [
      isSubStep && DefaultFontStyles.small,
      commonLabelStyles,
      {
        display: useSelectedStyle ? 'block' : 'none',
        fontWeight: FontWeights.semibold
      }
    ],
    subStepContainer: [
      {
        margin: '25px 0px 0px 0px',
        padding: 0,
        selectors: {
          '& > :nth-child(n)': {
            marginBottom: `${itemSpacing}px`
          },
          '& > :last-child': {
            marginBottom: '2px'
          }
        }
      }
    ]
  };
};
