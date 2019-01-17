import { ISubwayMapStyles, ISubwayMapStyleProps } from './SubwayMap.types';
import { DefaultFontStyles } from 'office-ui-fabric-react/lib/Styling';

const regularFontSize = 12;
const regularLineHeight = 18;
const fontWeight = 300;
const stepIconSize = '16px';
const subStepIconSize = '8px';
const commonFontFamily = DefaultFontStyles.medium.fontFamily;
const subwayMapBaseColor = '#333333';

export const getSubwayMapStyles = (props: ISubwayMapStyleProps): ISubwayMapStyles => {
  const { className } = props;

  return {
    subwayMapContainer: [
      {
        width: '221px',
        height: '470px',
        background: 'white',
        border: '1px solid blue'
      },
      className
    ],
    subwayMapContentContainer: {
      marginLeft: '48px',
      marginTop: '48px'
    },
    subwayMapContent: {
      fontSize: regularFontSize,
      lineHeight: regularLineHeight,
      fontWeight: fontWeight,
      fontFamily: commonFontFamily,
      color: subwayMapBaseColor,
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      wordWrap: 'break-word'
    },
    subwayMapStepDiv: {
      width: '100%',
      selectors: {
        ':hover': {
          cursor: 'pointer'
        }
      }
    },
    subwayMapStepLabel: {
      marginLeft: '12px'
    },
    subwayMapStepConnector: {
      width: '0px',
      height: '36px',
      marginLeft: '7px',
      border: '1px solid blue'
    },
    subwayMapStep: {
      width: stepIconSize,
      height: stepIconSize
    },
    subwayMapSubStep: {
      width: subStepIconSize,
      height: subStepIconSize
    },
    boldStep: {
      fontWeight: 'bold'
    },
    disableStep: {
      pointerEvents: 'none'
    },
    stepNotStarted: {
      color: '#EDEBE9',
      width: stepIconSize,
      height: stepIconSize
    },
    stepCurrent: {
      color: '#C0DEF6',
      width: stepIconSize,
      height: stepIconSize
    },
    stepCompleted: {
      color: '#0078D4',
      width: stepIconSize,
      height: stepIconSize
    },
    stepViewedNotCompleted: {
      color: '#0078D4',
      width: stepIconSize,
      height: stepIconSize
    },
    stepWithSubSteps: {
      color: '#0078D4',
      width: stepIconSize,
      height: stepIconSize
    },
    stepUnsaved: {
      color: '#0078D4',
      fill: '#C0DEF6',
      width: stepIconSize,
      height: stepIconSize
    },
    stepSkipped: {
      color: '#0078D4',
      width: stepIconSize,
      height: stepIconSize
    },
    stepError: {
      color: '#A80000',
      width: stepIconSize,
      height: stepIconSize
    },
    // Not working
    stepWizardComplete: {
      color: '#6BB700',
      width: stepIconSize,
      height: stepIconSize
    },
    stepErrorInSubstep: {
      color: '#A80000',
      width: subStepIconSize,
      height: subStepIconSize
    }
  };
};
