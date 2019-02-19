import { ISetupWizardActionBarStyles } from './SetupWizardActionBar.types';

export const getStyles = (): ISetupWizardActionBarStyles => {
  return {
    root: {
      whiteSpace: 'nowrap',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      border: '1px solid #E1DFDD',
      height: '75px',
      alignItems: 'center'
    },
    actionLink: {
      color: '#605E5C'
    },
    backAction: {
      fontSize: '14px',
      marginLeft: '30px',
      width: '221px'
    },
    mainAction: {
      fontSize: '28px',
      marginLeft: '30px',
      flexGrow: '1'
    },
    exitAction: {
      fontSize: '14px',
      marginRight: '30px'
    }
  };
};
