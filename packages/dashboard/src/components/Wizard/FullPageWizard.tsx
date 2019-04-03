import { styled } from 'office-ui-fabric-react/lib/Utilities';
import { FullPageWizardBase } from './FullPageWizard.Base';
import { IFullPageWizardProps, IFullPageWizardStyleProps, IFullPageWizardStyles } from './FullPageWizard.types';
import { getFullPageWizardStyles } from './FullPageWizard.styles';

export const FullPageWizard: React.StatelessComponent<IFullPageWizardProps> = styled<
  IFullPageWizardProps,
  IFullPageWizardStyleProps,
  IFullPageWizardStyles
>(FullPageWizardBase, getFullPageWizardStyles, undefined, { scope: 'FullPageWizard' });
