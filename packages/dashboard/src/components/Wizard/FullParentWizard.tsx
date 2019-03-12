import { styled } from 'office-ui-fabric-react/lib/Utilities';
import { FullParentWizardBase } from './FullParentWizard.Base';
import { IFullParentWizardProps, IFullParentWizardStyleProps, IFullParentWizardStyles } from './FullParentWizard.types';
import { getFullParentWizardStyles } from './FullParentWizard.styles';

export const FullParentWizard: React.StatelessComponent<IFullParentWizardProps> = styled<
  IFullParentWizardProps,
  IFullParentWizardStyleProps,
  IFullParentWizardStyles
>(FullParentWizardBase, getFullParentWizardStyles, undefined, { scope: 'FullParentWizard' });
