import { styled } from 'office-ui-fabric-react/lib/Utilities';
import { ISetupWizardProps, ISetupWizardStyles, ISetupWizardStyleProps } from './SetupWizard.types';
import { getSetupWizardStyles } from './SetupWizard.styles';
import { SetupWizardBase } from './SetupWizard.Base';

export const SetupWizard: React.FunctionComponent<ISetupWizardProps> = styled<
  ISetupWizardProps,
  ISetupWizardStyleProps,
  ISetupWizardStyles
>(SetupWizardBase, getSetupWizardStyles, undefined, { scope: 'SetupWizard' });
