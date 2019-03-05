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
    const steps = this.getTestSteps(true);
    this.state = {
      steps: steps,
      currentStepId: steps[0].id,
      showPanel: false
    };
  }
  public render(): React.ReactNode {
    return (
      <div className="ms-WizardExample">
        <DefaultButton secondaryText="Opens the Sample Panel" onClick={this._showPanel} text="Open Panel" />
        <PanelWizard
          wizardProps={{
            steps: this.state.steps
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
