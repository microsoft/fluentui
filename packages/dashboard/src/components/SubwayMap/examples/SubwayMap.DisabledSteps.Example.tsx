import * as React from 'react';
import { generateRandomId } from '@uifabric/dashboard/lib/components/SubwayMap/examples/SubwayMap.Util';
import { SubwayMap } from '@uifabric/dashboard/lib/components/SubwayMap/SubwayMap';
import { ISubwayMapStep } from '@uifabric/dashboard/lib/components/SubwayMap/SubwayMap.types';

export class SubwayMapDisabledStepsExample extends React.Component<any, any> {
  public render(): JSX.Element {
    let steps: ISubwayMapStep[] = [];
    let subSteps: ISubwayMapStep[] = [];

    const substep0: ISubwayMapStep = {
      key: generateRandomId(),
      label: 'Sub Step 0',
      isCurrentStep: true,
      onClickStep: this._handleClickStep
    };
    const substep1: ISubwayMapStep = {
      key: generateRandomId(),
      label: 'Sub Step 1',
      isDisabledStep: true,
      onClickStep: this._handleClickStep
    };
    const substep2: ISubwayMapStep = {
      key: generateRandomId(),
      label: 'Sub Step 2',
      isDisabledStep: true,
      onClickStep: this._handleClickStep
    };

    subSteps.push(substep0);
    subSteps.push(substep1);
    subSteps.push(substep2);

    const data0: ISubwayMapStep = {
      key: generateRandomId(),
      label: 'Step 0',
      isCurrentStep: true,
      onClickStep: this._handleClickStep,
      subSteps: subSteps
    };
    const data1: ISubwayMapStep = {
      key: generateRandomId(),
      label: 'Step 1',
      isDisabledStep: true,
      onClickStep: this._handleClickStep
    };
    const data2: ISubwayMapStep = {
      key: generateRandomId(),
      label: 'Step 2',
      isDisabledStep: true,
      onClickStep: this._handleClickStep
    };
    const data3: ISubwayMapStep = {
      key: generateRandomId(),
      label: 'Step 3',
      isDisabledStep: true,
      onClickStep: this._handleClickStep
    };

    steps.push(data0);
    steps.push(data1);
    steps.push(data2);
    steps.push(data3);

    return (
      <div>
        <SubwayMap steps={steps} />
      </div>
    );
  }

  private _handleClickStep(step: ISubwayMapStep, subStep: ISubwayMapStep | undefined): void {
    let alertStr = 'Clicked ' + step.label;
    step.isCurrentStep = true;
    if (subStep !== undefined) {
      subStep.isCurrentStep = true;
      alertStr += ' and ' + subStep.label;
    }

    console.log(alertStr);
  }
}
