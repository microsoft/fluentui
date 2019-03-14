import { IWizardStepProps } from '../Wizard.types';

export interface ISetupWizardState {
  steps: IWizardStepProps[];
  currentStepId: string;
}

/**
 * generate Random id
 */
export function generateRandomId(): string {
  return (
    Math.random()
      .toString(36)
      .substring(2) + new Date().getTime().toString(36)
  );
}
