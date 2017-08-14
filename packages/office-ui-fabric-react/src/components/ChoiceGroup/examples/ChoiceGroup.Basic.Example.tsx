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
      <div>
        <ChoiceGroup
          defaultSelectedKey='B'
          options={ [
            {
              key: 'A',
              text: 'Option A',
              'data-automation-id': 'auto1'
            } as IChoiceGroupOption,
            {
              key: 'B',
              text: 'Option B',
            },
            {
              key: 'C',
              text: 'Option C',
              disabled: true
            },
            {
              key: 'D',
              text: 'Option D',
              disabled: true
            }
          ] }
          onChange={ this._onChange }
          label='Pick one'
          required={ true }
        />
        <ChoiceGroup
          defaultSelectedKey='A'
          options={ [
            {
              key: 'A',
              text: 'Option A',
              disabled: true
            },
            {
              key: 'B',
              text: 'Option B',
              disabled: true
            }
          ] }
          onChange={ this._onChange }
          label='Pick one'
          required={ true }
        />
      </div>
    );
  }

  @autobind
  private _onChange(ev: React.FormEvent<HTMLInputElement>, option: any) {
    console.dir(option);
  }
}
