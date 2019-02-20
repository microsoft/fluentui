import * as React from 'react';
import { generateRandomId } from './SubwayNav.Util';
import { SubwayNav } from '../SubwayNav';
import { ISubwayNavNodeProps, SubwayNavNodeState } from '../SubwayNode.types';

export class SubwayNavWizardCompleteExample extends React.Component<{}, {}> {
  private steps: ISubwayNavNodeProps[] = [
    {
      id: generateRandomId(),
      label: 'Step 0',
      state: SubwayNavNodeState.WizardComplete,
      onClickStep: this._handleClickStep
    },
    {
      id: generateRandomId(),
      label: 'Step 1',
      state: SubwayNavNodeState.WizardComplete,
      onClickStep: this._handleClickStep
    },
    {
      id: generateRandomId(),
      label: 'Step 2',
      state: SubwayNavNodeState.WizardComplete,
      onClickStep: this._handleClickStep
    },
    {
      id: generateRandomId(),
      label: 'Step 3',
      state: SubwayNavNodeState.WizardComplete,
      onClickStep: this._handleClickStep
    }
  ];

  public render(): JSX.Element {
    return (
      <div>
        <SubwayNav steps={this.steps} wizardComplete={true} />
      </div>
    );
  }

  private _handleClickStep(step: ISubwayNavNodeProps): void {
    const alertStr = 'Clicked ' + step.label;

    console.log(alertStr);
  }
}
