import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';

/**
 * Interface for ChoiceGroupBasicExample state.
 */
export interface IChoiceGroupBasicExampleState {
  imageKey: string;
}

export class ChoiceGroupBasicExample extends React.Component<any, IChoiceGroupBasicExampleState> {
  constructor() {
    super();

    this.state = {
      imageKey: ''
    };
  }

  public render() {
    return (
      <ChoiceGroup
        options={ [
          {
            key: 'A',
            text: 'Option A'
          },
          {
            key: 'B',
            text: 'Option B',
            checked: true
          },
          {
            key: 'C',
            text: 'Option C',
            disabled: true
          },
          {
            key: 'D',
            text: 'Option D',
            checked: true,
            disabled: true
          }
        ] }
        onChange={ this._onChange }
        label='Pick one'
        required={ true }
      />
    );
  }

  @autobind
  private _onChange(ev: React.FormEvent<HTMLInputElement>, option: any) {
    console.dir(option);
  }
}
