import { ISetupWizardStyles } from './SetupWizard.types';
import { DefaultFontStyles } from 'office-ui-fabric-react';
import { NeutralColors } from '@uifabric/fluent-theme';

export const getSetupWizardStyles = (): ISetupWizardStyles => {
  return {
    wizardContainer: [
      DefaultFontStyles.medium,
      {
        color: NeutralColors.gray130,
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }
    ],
    titleSection: {
      border: `1px solid ${NeutralColors.gray40}`,
      height: '75px'
    },
    actionBarSection: {
      whiteSpace: 'nowrap',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      border: `1px solid ${NeutralColors.gray40}`,
      height: '75px',
      alignItems: 'center'
    }
  };
};
