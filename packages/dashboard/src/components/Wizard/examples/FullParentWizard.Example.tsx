import * as React from 'react';
import { WizardExampleBase, IWizardExampleBaseState } from './WizardExample.Base';
import { FullParentWizard } from '../FullParentWizard';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';

const getClassName = classNamesFunction<{}, { containerHeight: IStyle }>();

export class FullParentWizardExample extends WizardExampleBase<IWizardExampleBaseState> {
  constructor(props: {}) {
    super(props);
    const steps = this.getTestSteps(true);
    this.state = {
      steps: steps,
      currentStepId: steps[0].id
    };
  }

  public render(): React.ReactNode {
    const containerHeight = { height: '80vh' };
    const classNames = getClassName({ containerHeight });
    return (
      <div className={`ms-WizardExample ${classNames.containerHeight}`}>
        <FullParentWizard wizardProps={{ steps: this.state.steps }} />
      </div>
    );
  }
}
