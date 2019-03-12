import * as React from 'react';
import { generateRandomId } from './SubwayNav.Util';
import { setSubwayState } from '../../Wizard/Wizard.utils';
import { SubwayNav, ISubwayNavNodeProps, SubwayNavNodeState } from '@uifabric/dashboard';

export interface ISubwayNavSubStepsExampleState {
  currentStepId: string;
  steps: ISubwayNavNodeProps[];
}

export class SubwayNavSubStepsExample extends React.Component<{}, ISubwayNavSubStepsExampleState> {
  private steps: ISubwayNavNodeProps[];

  constructor(props: {}) {
    super(props);
    this._handleClickStep = this._handleClickStep.bind(this);
    this.steps = [
      {
        id: generateRandomId(),
        label: 'Step 0',
        state: SubwayNavNodeState.Current,
        onClickStep: this._handleClickStep
      },
      {
        id: generateRandomId(),
        label: 'Step 1',
        state: SubwayNavNodeState.NotStarted,
        onClickStep: this._handleClickStep,
        subSteps: [
          {
            id: generateRandomId(),
            label: 'Sub Step 0',
            state: SubwayNavNodeState.NotStarted,
            isSubStep: true,
            onClickStep: this._handleClickStep
          },
          {
            id: generateRandomId(),
            label: 'Sub Step 1',
            state: SubwayNavNodeState.NotStarted,
            isSubStep: true,
            onClickStep: this._handleClickStep
          },
          {
            id: generateRandomId(),
            label: 'Sub Step 2',
            state: SubwayNavNodeState.NotStarted,
            isSubStep: true,
            onClickStep: this._handleClickStep
          }
        ]
      },
      {
        id: generateRandomId(),
        label: 'Step 2',
        state: SubwayNavNodeState.NotStarted,
        onClickStep: this._handleClickStep
      },
      {
        id: generateRandomId(),
        label: 'Step 3',
        state: SubwayNavNodeState.NotStarted,
        onClickStep: this._handleClickStep
      }
    ];
    this.state = {
      steps: this.steps,
      currentStepId: this.steps[0].id
    };
  }

  public render(): JSX.Element {
    return <SubwayNav steps={this.state.steps} />;
  }

  private _handleClickStep(step: ISubwayNavNodeProps): void {
    this.setState({ ...setSubwayState(step, this.state.steps, this.state.currentStepId) });
  }
}
