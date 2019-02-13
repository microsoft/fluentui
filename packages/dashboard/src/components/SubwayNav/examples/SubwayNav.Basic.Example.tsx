import * as React from 'react';
import { generateRandomId, setSubwayState } from './SubwayNav.Util';
import { SubwayNav, ISubwayNavNodeProps, SubwayNavNodeState } from '@uifabric/dashboard';

export interface ISubwayNavBasicExampleState {
  currentStepId: string;
  steps: ISubwayNavNodeProps[];
}

export class SubwayNavBasicExample extends React.Component<{}, ISubwayNavBasicExampleState> {
  private steps: ISubwayNavNodeProps[];

  public constructor(props: {}) {
    super(props);
    this._handleClickStep = this._handleClickStep.bind(this);
    this.steps = [
      {
        id: generateRandomId(),
        label: 'Step 0 with a long label that needs to perform a text overflow with ellipsis in the end.',
        state: SubwayNavNodeState.Current,
        onClickStep: this._handleClickStep
      },
      {
        id: generateRandomId(),
        label: 'Step 1',
        state: SubwayNavNodeState.NotStarted,
        onClickStep: this._handleClickStep
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
