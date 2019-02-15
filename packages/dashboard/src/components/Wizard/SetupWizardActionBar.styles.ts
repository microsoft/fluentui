import { NeutralColors, SharedColors } from '@uifabric/fluent-theme';
import { DefaultFontStyles, FontWeights } from 'office-ui-fabric-react';
import { ISetupWizardActionBarStyles } from './SetupWizardActionBar.types';

const actionLinkStyle = {
  color: NeutralColors.gray130
};
export const getStyles = (): ISetupWizardActionBarStyles => {
  return {
    root: {
      whiteSpace: 'nowrap',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      border: `1px solid ${NeutralColors.gray40}`,
      height: '75px',
      alignItems: 'center'
    },
    backAction: [
      DefaultFontStyles.medium,
      actionLinkStyle,
      {
        marginLeft: '30px',
        width: '221px'
      }
    ],
    mainAction: [
      DefaultFontStyles.xxLarge,
      actionLinkStyle,
      {
        color: SharedColors.cyanBlue10,
        marginLeft: '30px',
        flexGrow: '1',
        fontWeight: FontWeights.bold
      }
    ],
    exitAction: [
      DefaultFontStyles.medium,
      actionLinkStyle,
      {
        marginRight: '30px'
      }
    ]
  };
};
