import * as React from 'react';
import { ActionButton, DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { itemWrapper } from '../shared/style';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { SamplesCardHeader } from './SamplesCardHeader';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

export class Samples extends React.Component {
  public render() {
    return (
      <div className={itemWrapper}>
        <h1>Samples</h1>
        <Stack horizontal gap={50}>
          <Stack gap={10}>
            <SamplesCardHeader label="TEXT" />
            <SamplesCardHeader size="tiny" label="MEMBER FEATURE STORY" />
            <Text variant="xLarge">The Mystery of Color</Text>
            <Stack>
              <Text variant="tiny" block>
                Contrast is the difference in
              </Text>
              <Text variant="tiny" block>
                luminance or color that makes an{' '}
              </Text>
              <Text variant="tiny" block>
                {' '}
                object (or its representation in an{' '}
              </Text>
              <Text variant="tiny" block>
                {' '}
                image or display) distinguishable.{' '}
              </Text>
              <Text variant="tiny" block>
                {' '}
                In visual perception of the real{' '}
              </Text>
              <Text variant="tiny" block>
                {' '}
                world, contrast is determined{' '}
              </Text>
            </Stack>
          </Stack>

          <Stack gap={10}>
            <SamplesCardHeader label="LINKS" />
            <Link href="http://dev.office.com/fabric/components/link">Title hyperlink</Link>
            <Link disabled={true} href="http://dev.office.com/fabric/components/link">
              Disabled link
            </Link>
            <SamplesCardHeader label="BUTTONS" />
            <Stack horizontal>
              <PrimaryButton text="Primary" />
              <DefaultButton text="Standard" />
            </Stack>
            <SamplesCardHeader label="ACTION BUTTONS" />
            <Stack horizontal gap={5}>
              <ActionButton
                data-automation-id="test"
                iconProps={{ iconName: 'Add' }}
                allowDisabledFocus={true}
                disabled={false}
                checked={true}
              >
                Action text
              </ActionButton>
              <ActionButton
                data-automation-id="test"
                iconProps={{ iconName: 'ChevronLeft' }}
                allowDisabledFocus={true}
                disabled={false}
                checked={true}
              />
              <ActionButton
                data-automation-id="test"
                iconProps={{ iconName: 'Cancel' }}
                allowDisabledFocus={true}
                disabled={false}
                checked={true}
              />
            </Stack>
          </Stack>

          <Stack gap={10}>
            <SamplesCardHeader label="TEXT FIELD" />
            <TextField label="Label" />
            <TextField label="Label" disabled={true} />
            <SamplesCardHeader label="TEXT FIELD - UNDERLINE" />
            <TextField label="Label: " underlined />
            <SamplesCardHeader label="DROPDOWN MENU" />
            <Dropdown
              placeholder="Content"
              label="Label"
              ariaLabel="Content dropdown"
              options={[{ key: 'content', text: 'Content' }, { key: 'morecontent', text: 'More content' }]}
            />
          </Stack>

          <Stack gap={10}>
            <SamplesCardHeader label="TOGGLE" />
            <Toggle
              defaultChecked={true}
              label="Enabled and checked"
              onText="On"
              offText="Off"
              // onFocus={() => console.log('onFocus called')}
              // onBlur={() => console.log('onBlur called')}
              onChange={this._onToggleChange}
            />
            <SamplesCardHeader label="CHECKBOX" />
            <Checkbox label="Standard checkbox" onChange={this._onCheckboxChange} />
            <SamplesCardHeader label="RADIO BUTTON" />
          </Stack>
        </Stack>
      </div>
    );
  }
  private _onToggleChange(ev: React.MouseEvent<HTMLElement>, checked: boolean | undefined) {
    console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
  }
  private _onCheckboxChange(ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined, checked?: boolean | undefined) {
    console.log(`The option has been changed to ${checked}.`);
  }
}
