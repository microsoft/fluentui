import { ISubwayNavStepStyles, ISubwayNavStepProps } from './SubwayNavStep.types';

const stepIconSize = '16px';
const subStepIconSize = '8px';

export const getSubwayNavStepStyles = (props: ISubwayNavStepProps): ISubwayNavStepStyles => {
  return {
    subwayNavStepDiv: {
      width: '100%',
      selectors: {
        ':hover': {
          cursor: 'pointer'
        },
        ':focus': {
          border: '1px solid black'
        }
      }
    },
    subwayNavStepIcon: {
      width: stepIconSize,
      height: stepIconSize,
      fontSize: stepIconSize,
      fontStyle: 'normal',
      lineHeight: 'normal',
      fontWeight: 'normal',
      marginLeft: '0px'
    },
    subwayNavSubStepIcon: {
      width: subStepIconSize,
      height: subStepIconSize,
      fontSize: subStepIconSize,
      fontStyle: 'normal',
      lineHeight: 'normal',
      fontWeight: 'normal',
      marginLeft: '4px'
    },
    stepLabel: {
      marginLeft: '12px',
      width: '180px',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    },
    subStepLabel: {
      marginLeft: '16px',
      width: '160px',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    },
    boldStep: {
      fontWeight: 'bold'
    },
    disableStep: {
      pointerEvents: 'none'
    },
    stepNotStarted: {
      color: '#EDEBE9'
    },
    stepCurrent: {
      color: '#C0DEF6'
    },
    stepCompleted: {
      color: '#0078D4'
    },
    stepViewedNotCompleted: {
      color: '#0078D4'
    },
    stepWithSubSteps: {
      color: '#0078D4'
    },
    stepUnsaved: {
      color: '#0078D4',
      fill: '#C0DEF6'
    },
    stepSkipped: {
      color: '#0078D4'
    },
    stepError: {
      color: '#A80000'
    },
    stepWizardComplete: {
      color: '#6BB700'
    },
    subStepNotStarted: {
      color: '#EDEBE9'
    },
    subStepCurrent: {
      color: '#C0DEF6'
    },
    subStepCompleted: {
      color: '#0078D4'
    },
    subStepUnsaved: {
      color: '#0078D4',
      fill: '#C0DEF6'
    },
    subStepSkipped: {
      color: '#0078D4'
    },
    subStepError: {
      color: '#A80000'
    }
  };
};
