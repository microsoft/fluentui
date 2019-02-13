import { ISetupWizardActionBarStyles } from './SetupWizardActionBar.types';

const actionLinkStyle = {
  color: '#605E5C'
};

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
    backAction: [
      actionLinkStyle,
      {
        fontSize: '14px',
        marginLeft: '30px',
        width: '221px'
      }
    ],
    mainAction: [
      actionLinkStyle,
      {
        fontSize: '28px',
        marginLeft: '30px',
        flexGrow: '1'
      }
    ],
    exitAction: [
      actionLinkStyle,
      {
        fontSize: '14px',
        marginRight: '30px'
      }
    ]
  };
};
