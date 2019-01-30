import { ISubwayNavStyles, ISubwayNavStyleProps } from './SubwayNav.types';

const regularFontSize = 14;
const regularLineHeight = 20;
const fontWeight = 300;
const commonFontFamily = 'Segoe UI';
const subwayNavBaseColor = '#333333';

export const getSubwayNavStyles = (props: ISubwayNavStyleProps): ISubwayNavStyles => {
  const { className } = props;

  return {
    subwayNavContainer: [
      {
        width: '221px',
        height: '470px',
        overflow: 'auto',
        background: 'white',
        border: '1px solid blue',
      },
      className
    ],
    subwayNavContentContainer: {
      marginLeft: '48px',
      marginTop: '48px',
      marginBottom: '48px'
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
  };
};
