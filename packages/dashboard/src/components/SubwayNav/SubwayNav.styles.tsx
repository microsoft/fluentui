import { ISubwayNavStyles, ISubwayNavStyleProps } from './SubwayNav.types';
import { DefaultFontStyles } from 'office-ui-fabric-react/lib/Styling';

const regularFontSize = 14;
const regularLineHeight = 20;
const fontWeight = 300;
const stepIconSize = '16px';
const subStepIconSize = '8px';
const commonFontFamily = DefaultFontStyles.medium.fontFamily;
const subwayNavBaseColor = '#333333';

export const getSubwayNavStyles = (props: ISubwayNavStyleProps): ISubwayNavStyles => {
  const { className } = props;

  return {
    subwayNavContainer: [
      {
        width: '221px',
        height: '470px',
        background: 'white',
        border: '1px solid blue'
      },
      className
    ],
    subwayNavContentContainer: {
      marginLeft: '48px',
      marginTop: '48px'
    },
    subwayNavContent: {
      fontSize: regularFontSize,
      lineHeight: regularLineHeight,
      fontWeight: fontWeight,
      fontFamily: commonFontFamily,
      color: subwayNavBaseColor,
      display: 'flex',
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      wordWrap: 'break-word'
    },
    subwayNavStepDiv: {
      width: '100%',
      selectors: {
        ':hover': {
          cursor: 'pointer'
        }
      }
    },
    subwayNavStepLabel: {
      marginLeft: '12px'
    },
    subwayNavStepConnector: {
      width: '0px',
      height: '36px',
      marginLeft: '7px',
      border: '1px solid blue'
    },
    subwayNavSubStepConnector: {
      width: '0px',
      height: '24px',
      marginLeft: '7px'
    },
    stepConnectorNotStarted: {
      border: '1px solid #EBEBEB'
    },
    stepConnectorCompleted: {
      border: '1px solid #0078D4'
    },
    stepConnectorWizardComplete: {
      border: '1px solid #6BB700'
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
      marginLeft: '12px'
    },
    subStepLabel: {
      marginLeft: '16px'
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
