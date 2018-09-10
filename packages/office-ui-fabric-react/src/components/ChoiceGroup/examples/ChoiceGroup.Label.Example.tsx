// @codepen
import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';

/**
 * Interface for ChoiceGroupLabelExample state.
 */
export interface IChoiceGroupLabelExampleState {
  imageKey: string;
}

export class ChoiceGroupLabelExample extends React.Component<{}, IChoiceGroupLabelExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      imageKey: ''
    };
  }

  public render() {
    return (
      <div>
        <div id="labelElement">Here is a custom label</div>
        <ChoiceGroup
          defaultSelectedKey="B"
          options={[
            {
              key: 'A',
              text: 'Option A',
              'data-automation-id': 'auto1'
            } as IChoiceGroupOption,
            {
              key: 'B',
              text: 'Option B'
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
          ]}
          onChange={this._onChange}
          ariaLabelledBy="labelElement"
          required={true}
        />
      </div>
    );
  }

  private _onChange = (ev: React.FormEvent<HTMLInputElement>, option: any): void => {
    console.dir(option);
  };
}
