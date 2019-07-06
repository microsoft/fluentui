import * as React from 'react';
import { LayoutGroup } from '@uifabric/experiments/lib/LayoutGroup';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class LayoutGroupBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <h3>Layout Group</h3>

        <LayoutGroup layoutGap={20} direction="vertical">
          <h2>A List of Inputs</h2>
          <Dropdown
            placeholder="Select an Option"
            label="Basic uncontrolled example:"
            ariaLabel="Basic dropdown example"
            options={[
              { key: 'A', text: 'Option a' },
              { key: 'B', text: 'Option b' },
              { key: 'C', text: 'Option c' },
              { key: 'D', text: 'Option d' },
              { key: 'E', text: 'Option e' },
              { key: 'F', text: 'Option f' },
              { key: 'G', text: 'Option g' },
              { key: 'H', text: 'Option h' },
              { key: 'I', text: 'Option i' },
              { key: 'J', text: 'Option j' }
            ]}
          />
          <LayoutGroup layoutGap={20} direction="horizontal" justify="fill">
            <TextField label="TextField with a placeholder" placeholder="Now I am a Placeholder" ariaLabel="Please enter text here" />
            <TextField label="TextField with an icon" iconProps={{ iconName: 'Calendar' }} />
          </LayoutGroup>

          <LayoutGroup layoutGap={20} direction="horizontal" justify="fill">
            <ChoiceGroup
              defaultSelectedKey="B"
              options={[
                {
                  key: 'A',
                  text: 'Option A'
                },
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
              label="Pick one"
              required={true}
            />
            <LayoutGroup layoutGap={10}>
              <Label>Pick a few</Label>
              <Checkbox label="Checkbox A" />
              <Checkbox label="Checkbox A" />
              <Checkbox label="Checkbox A" />
              <Checkbox label="Checkbox A" />
              <Checkbox label="Checkbox A" />
            </LayoutGroup>
          </LayoutGroup>

          <PrimaryButton>Submit</PrimaryButton>
        </LayoutGroup>
      </div>
    );
  }
}
