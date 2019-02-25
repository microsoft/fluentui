import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { PanelWizard } from '../PanelWizard';
import { IWizardExampleBaseState, WizardExampleBase } from './WizardExample.Base';

export interface IPanelWizardExampleState extends IWizardExampleBaseState {
  showPanel: boolean;
}

export class PanelWizardExample extends WizardExampleBase<IPanelWizardExampleState> {
  constructor(props: {}) {
    super(props);
    const steps = this.getTestSteps();
    this.state = {
      steps: steps,
      currentStepId: steps[0].id,
      showPanel: false
    };
  }
  public render(): React.ReactNode {
    const wizardCompleteContent = this.getWizCompleteContent('Panel wizard example');

    return (
      <div className="ms-WizardExample">
        <DefaultButton secondaryText="Opens the Sample Panel" onClick={this._showPanel} text="Open Panel" />
        <PanelWizard
          wizardProps={{
            steps: this.state.steps,
            wizardCompleteContent: wizardCompleteContent
          }}
          panelProps={{
            onDismiss: this._hidePanel,
            isOpen: this.state.showPanel
          }}
        />
      </div>
    );
  }

  private _showPanel = () => {
    this.setState({ showPanel: true });
  };

  private _hidePanel = () => {
    this.setState({ showPanel: false });
  };
}
