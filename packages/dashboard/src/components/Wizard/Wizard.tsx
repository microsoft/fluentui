import { WizardBase } from './Wizard.Base';
import { styled } from 'office-ui-fabric-react/lib/Utilities';
import { getWizardStyles } from './Wizard.styles';
import { IWizardProps, IWizardStyleProps, IWizardStyles } from './Wizard.types';

export const Wizard: React.FunctionComponent<IWizardProps> = styled<IWizardProps, IWizardStyleProps, IWizardStyles>(
  WizardBase,
  getWizardStyles,
  undefined,
  { scope: 'Wizard' }
);
