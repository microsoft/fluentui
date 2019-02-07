import { ISetupWizardActionBarStyles } from './SetupWizardActionBar.types';

export const getStyles = (): ISetupWizardActionBarStyles => {
  return {
    root: {
      whiteSpace: 'nowrap',
      width: '100%',
      height: '32px'
    },
    actionLink: {
      color: '#605E5C',
      marginTop: '20px',
      marginBottom: '20px'
    },
    backAction: {
      fontSize: '14px',
      lineHeight: '20px',
      marginLeft: '30px'
    },
    exitAction: {
      float: 'right',
      fontSize: '14px',
      lineHeight: '20px',
      marginRight: '30px'
    },
    mainAction: {
      fontSize: '28px',
      lineHeight: '36px',
      marginLeft: '400px'
    }
  };
};
