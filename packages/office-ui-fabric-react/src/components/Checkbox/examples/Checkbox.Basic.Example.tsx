import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

export interface ICheckboxBasicExampleState {
  isChecked: boolean;
}

export class CheckboxBasicExample extends React.Component<{}, ICheckboxBasicExampleState> {
  constructor(props: {}) {
    super(props);

    this._onCheckboxChange = this._onCheckboxChange.bind(this);
  }

<<<<<<< HEAD
  public render() {
=======
  public render(): JSX.Element {
    const { isChecked } = this.state;

>>>>>>> Add typedefs
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