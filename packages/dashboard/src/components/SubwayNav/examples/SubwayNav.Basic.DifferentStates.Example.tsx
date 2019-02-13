import * as React from 'react';
import { generateRandomId } from '@uifabric/dashboard/lib/components/SubwayNav/examples/SubwayNav.Util';
import { SubwayNav } from '@uifabric/dashboard/lib/components/SubwayNav/SubwayNav';
import { ISubwayNavNodeProps, SubwayNavNodeState } from '@uifabric/dashboard/lib/components/SubwayNav/SubwayNode.types';

export class SubwayNavBasicDifferentStatesExample extends React.Component<{}, {}> {
  private steps: ISubwayNavNodeProps[] = [
    {
      id: generateRandomId(),
      label: 'Step 0',
      state: SubwayNavNodeState.Current,
      /*isCurrentStep: true,
    formError: true,
    formViewed: true,*/
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
