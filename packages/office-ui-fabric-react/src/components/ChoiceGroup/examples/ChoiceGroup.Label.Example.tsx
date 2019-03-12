// @codepen
import * as React from 'react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { getId } from 'office-ui-fabric-react/lib/Utilities';

/**
 * Interface for ChoiceGroupLabelExample state.
 */
export interface IChoiceGroupLabelExampleState {
  imageKey: string;
}

export class ChoiceGroupLabelExample extends React.Component<{}, IChoiceGroupLabelExampleState> {
  public state: IChoiceGroupLabelExampleState = {
    imageKey: ''
  };

  // Use getId() to ensure that the label ID is unique on the page.
  // (It's also okay to use a plain string without getId() and manually ensure its uniqueness.)
  private _labelId: string = getId('labelElement');

  public render() {
    return (
      <div>
        <Label id={this._labelId} required={true}>
          Custom label
        </Label>
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
          ariaLabelledBy={this._labelId}
          required={true}
        />
      </div>
    );
  }

  private _onChange = (ev: React.FormEvent<HTMLInputElement>, option: any): void => {
    console.dir(option);
  };
}
