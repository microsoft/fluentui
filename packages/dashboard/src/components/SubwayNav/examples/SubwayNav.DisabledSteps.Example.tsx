import * as React from 'react';
import { generateRandomId } from '@uifabric/dashboard/lib/components/SubwayNav/examples/SubwayNav.Util';
import { SubwayNav, ISubwayNavNodeProps, SubwayNavNodeState } from '@uifabric/dashboard';

export class SubwayNavDisabledStepsExample extends React.Component<{}, {}> {
  private steps: ISubwayNavNodeProps[] = [
    {
      id: generateRandomId(),
      label: 'Step 0',
      state: SubwayNavNodeState.Current,
      onClickStep: this._handleClickStep,
      subSteps: [
        {
          id: generateRandomId(),
          label: 'Sub Step 0',
          state: SubwayNavNodeState.Current,
          isSubStep: true,
          onClickStep: this._handleClickStep
        },
        {
          id: generateRandomId(),
          label: 'Sub Step 1',
          state: SubwayNavNodeState.NotStarted,
          disabled: true,
          isSubStep: true,
          onClickStep: this._handleClickStep
        },
        {
          id: generateRandomId(),
          label: 'Sub Step 2',
          state: SubwayNavNodeState.NotStarted,
          disabled: true,
          isSubStep: true,
          onClickStep: this._handleClickStep
        }
      ]
    },
    {
      id: generateRandomId(),
      label: 'Step 1',
      state: SubwayNavNodeState.NotStarted,
      disabled: true,
      onClickStep: this._handleClickStep
    },
    {
      id: generateRandomId(),

      label: 'Step 2',
      state: SubwayNavNodeState.NotStarted,
      disabled: true,
      onClickStep: this._handleClickStep
    },
    {
      id: generateRandomId(),
      label: 'Step 3',
      state: SubwayNavNodeState.NotStarted,
      disabled: true,
      onClickStep: this._handleClickStep
    },
    {
      id: generateRandomId(),
      label: 'Step 4',
      state: SubwayNavNodeState.NotStarted,
      disabled: true,
      onClickStep: this._handleClickStep
    },
    {
      id: generateRandomId(),
      label: 'Step 5',
      state: SubwayNavNodeState.NotStarted,
      disabled: true,
      onClickStep: this._handleClickStep
    },
    {
      id: generateRandomId(),
      label: 'Step 6',
      state: SubwayNavNodeState.NotStarted,
      disabled: true,
      onClickStep: this._handleClickStep
    },
    {
      id: generateRandomId(),
      label: 'Step 7',
      state: SubwayNavNodeState.NotStarted,
      disabled: true,
      onClickStep: this._handleClickStep
    },
    {
      id: generateRandomId(),
      label: 'Step 8',
      state: SubwayNavNodeState.NotStarted,
      disabled: true,
      onClickStep: this._handleClickStep
    },
    {
      id: generateRandomId(),
      label: 'Step 9',
      state: SubwayNavNodeState.NotStarted,
      disabled: true,
      onClickStep: this._handleClickStep
    }
  ];

  public render(): JSX.Element {
    return (
      <div>
        <SubwayNav steps={this.steps} />
      </div>
    );
  }

  private _handleClickStep(step: ISubwayNavNodeProps): void {
    let alertStr = 'Clicked ' + step.label;

    console.log(alertStr);
  }
}
