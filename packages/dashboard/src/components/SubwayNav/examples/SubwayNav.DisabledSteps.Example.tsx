import * as React from 'react';
import { generateRandomId } from '@uifabric/dashboard/lib/components/SubwayNav/examples/SubwayNav.Util';
import { SubwayNav } from '@uifabric/dashboard/lib/components/SubwayNav/SubwayNav';
import { ISubwayNavStep } from '@uifabric/dashboard/lib/components/SubwayNav/SubwayNav.types';

export class SubwayNavDisabledStepsExample extends React.Component<any, any> {
  public render(): JSX.Element {
    let steps: ISubwayNavStep[] = [];
    let subSteps: ISubwayNavStep[] = [];

    const substep0: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Sub Step 0',
      isCurrentStep: true,
      onClickStep: this._handleClickStep
    };
    const substep1: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Sub Step 1',
      isDisabledStep: true,
      onClickStep: this._handleClickStep
    };
    const substep2: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Sub Step 2',
      isDisabledStep: true,
      onClickStep: this._handleClickStep
    };

    subSteps.push(substep0);
    subSteps.push(substep1);
    subSteps.push(substep2);

    const data0: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 0',
      isCurrentStep: true,
      onClickStep: this._handleClickStep,
      subSteps: subSteps
    };
    const data1: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 1',
      isDisabledStep: true,
      onClickStep: this._handleClickStep
    };
    const data2: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 2',
      isDisabledStep: true,
      onClickStep: this._handleClickStep
    };
    const data3: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 3',
      isDisabledStep: true,
      onClickStep: this._handleClickStep
    };
    const data4: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 4',
      isDisabledStep: true,
      onClickStep: this._handleClickStep
    };

    const data5: ISubwayNavStep = {
      key: generateRandomId(),
      label: 'Step 5',
      isDisabledStep: true,
      onClickStep: this._handleClickStep
    };


    steps.push(data0);
    steps.push(data1);
    steps.push(data2);
    steps.push(data3);
    steps.push(data4);
    steps.push(data5);

    return (
      <div>
        <SubwayNav steps={steps} />
      </div>
    );
  }

  private _handleClickStep(step: ISubwayNavStep, subStep: ISubwayNavStep | undefined): void {
    let alertStr = 'Clicked ' + step.label;
    step.isCurrentStep = true;
    if (subStep !== undefined) {
      subStep.isCurrentStep = true;
      alertStr += ' and ' + subStep.label;
    }

    console.log(alertStr);
  }
}
