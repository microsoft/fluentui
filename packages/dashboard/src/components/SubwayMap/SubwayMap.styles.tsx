import { ISubwayMapStyles, ISubwayMapStyleProps } from './SubwayMap.types';
import { DefaultFontStyles } from 'office-ui-fabric-react/lib/Styling';

const regularFontSize = 14;
const regularLineHeight = 20;
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
    subwayMapSubStepConnector: {
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
    subwayMapStepIcon: {
      width: stepIconSize,
      height: stepIconSize,
      fontSize: stepIconSize,
      fontStyle: 'normal',
      lineHeight: 'normal',
      fontWeight: 'normal',
      marginLeft: '0px'
    },
    subwayMapSubStepIcon: {
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
