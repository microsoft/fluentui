import * as React from 'react';
import { generateRandomId } from '@uifabric/dashboard/lib/components/SubwayNav/examples/SubwayNav.Util';
import { ISubwayNavNodeProps, SubwayNavNodeState, SubwayNav } from '@uifabric/dashboard';

export class SubwayNavBasicDifferentStatesExample extends React.Component<{}, {}> {
  private steps: ISubwayNavNodeProps[];

  public constructor(props: {}) {
    super(props);
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
        state: SubwayNavNodeState.Error,
        onClickStep: this._handleClickStep
      },
      {
        id: generateRandomId(),
        label: 'Step 2',
        state: SubwayNavNodeState.Completed,
        onClickStep: this._handleClickStep
      },
      {
        id: generateRandomId(),
        label: 'Step 3',
        state: SubwayNavNodeState.Skipped,
        onClickStep: this._handleClickStep
      },
      {
        id: generateRandomId(),
        label: 'Step 4',
        state: SubwayNavNodeState.ViewedNotCompleted,
        onClickStep: this._handleClickStep
      },
      {
        id: generateRandomId(),
        label: 'Step 5',
        state: SubwayNavNodeState.Completed,
        onClickStep: this._handleClickStep
      }
    ];
  }
  public render(): JSX.Element {
    return <SubwayNav steps={this.steps} />;
  }

  private _handleClickStep(step: ISubwayNavNodeProps): void {
    const alertStr = 'Clicked ' + step.label;

    console.log(alertStr);
  }
}
