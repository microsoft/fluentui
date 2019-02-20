import { IPanelStyles } from 'office-ui-fabric-react';
import { IWizardStyles } from './Wizard.types';
import { IPanelWizardStyles } from './PanelWizard.types';

export const defaultPanelStyleSet = (): Partial<IPanelStyles> => {
  return {
    // scrollableContent: {
    //   height: '100%'
    // },
    content: {
      height: '100%'
    }
  };
};

export const defaultWizardStyleSet = (): Partial<IWizardStyles> => {
  return {
    wizardContentNavContainer: {
      height: '100%'
    }
  };
};
export const getPanelWizardStyles = (): IPanelWizardStyles => {
  return {
    container: {}
  };
};
