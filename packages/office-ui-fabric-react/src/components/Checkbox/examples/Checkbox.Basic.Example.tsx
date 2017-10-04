import * as React from 'react';
import {
  Checkbox,
  ICheckboxStyles,
  ICheckboxProps
} from 'office-ui-fabric-react/lib/Checkbox';

export interface ICheckboxBasicExampleState {
  isChecked: boolean;
}

export class CheckboxBasicExample extends React.Component<{}, ICheckboxBasicExampleState> {
  constructor() {
    super();

    this.state = {
      isChecked: false
    };

    this._onCheckboxChange = this._onCheckboxChange.bind(this);
  }

  public render() {
    let { isChecked } = this.state;

    return (
      <div>
        <Checkbox
          label='Standard checkbox'
          onChange={ this._onCheckboxChange }
          ariaDescribedBy={ 'descriptionID' }
        />
      </div>
    );
  }

  private _onCheckboxChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean) {
    console.log(`The option has been changed to ${isChecked}.`);
  }
}