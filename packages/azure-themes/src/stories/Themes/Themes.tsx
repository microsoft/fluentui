import * as React from 'react';
import {
  Customizer,
  DefaultButton,
  PrimaryButton,
  TextField,
  Stack,
  Fabric,
  CompoundButton,
  Checkbox,
  DatePicker,
  SearchBox,
  Link,
} from 'office-ui-fabric-react';
import { AzureCustomizationsLight, AzureCustomizationsDark } from '../../index';
import { ButtonCommandBarExample } from '../components/commandBarButton';
import { ButtonSplitExample } from '../components/splitButton';
import { ButtonIconExample } from '../components/iconButton';
import { ButtonIconWithTooltipExample } from '../components/iconTooltip';
import { ButtonContextualMenuExample } from '../components/contextualMenu';
import { ButtonActionExample } from '../components/actionButton';
import { ButtonToggleExample } from '../components/buttonToggle';
import { CalloutBasicExample } from '../components/callout';
import { ActivityItemBasicExample } from '../components/activityitem';
import { ChoiceGroupBasicExample } from '../components/choicegroup';
import { ToggleBasicExample } from '../components/toggle';
import { ColorPickerBasicExample } from '../components/colorpicker';
import { ComboBoxBasicExample } from '../components/comboBox';
import { ContextualMenuDefaultExample } from '../components/ContextMenu';
import { DropdownBasicExample } from '../components/dropdown';
import { CommandBarBasicExample } from '../components/commandBar';

const Example = () => (
  // tslint:disable-next-line:jsx-ban-props
  <Stack gap={8} horizontalAlign="center" style={{ maxWidth: 1000 }}>
    <CommandBarBasicExample />
    <DefaultButton text="DefaultButton" />
    <PrimaryButton text="PrimaryButton" />
    <CompoundButton primary text="CompoundButton" />
    <CompoundButton secondaryText="secondary text." text="CompoundButton" />
    <ButtonIconExample checked={false} />
    <ButtonCommandBarExample />
    <ButtonIconWithTooltipExample />
    <ButtonContextualMenuExample />
    <ButtonActionExample />
    <ButtonToggleExample />
    <ButtonSplitExample checked={false} />
    <CalloutBasicExample />
    <Checkbox label="Unchecked checkbox (uncontrolled)" />
    <Checkbox label="Checked checkbox (uncontrolled)" defaultChecked />
    <Checkbox label="Disabled checkbox" disabled />
    <Checkbox label="Disabled checked checkbox" disabled defaultChecked />
    <Checkbox label="Indeterminate checkbox (uncontrolled)" defaultIndeterminate />
    <Checkbox
      label="Indeterminate checkbox which defaults to true when clicked (uncontrolled)"
      defaultIndeterminate
      defaultChecked={true}
    />
    <Link>Hello I am a link, hover underline</Link>
    <ComboBoxBasicExample />
    <DropdownBasicExample />
    <SearchBox />
    <TextField placeholder="Hello" />
    <ActivityItemBasicExample />
    <ChoiceGroupBasicExample />
    <ToggleBasicExample />
    <ColorPickerBasicExample />

    <ContextualMenuDefaultExample />

    <DatePicker />

    <p>Checked components are not supported in the portal, listed below</p>
    <CompoundButton checked={true} primary text="CompoundButton" />
    <CompoundButton checked={true} secondaryText="This is the secondary text." text="CompoundButton" />
    <DefaultButton checked={true} disabled text="Default disabled" />
    <PrimaryButton checked={true} disabled text="Primary disabled" />
    <ButtonIconExample checked={true} />
    <ButtonSplitExample checked={true} />
    <PrimaryButton checked={true} text="PrimaryButton checked" />
    <DefaultButton checked={true} text="DefaultButton checked" />
    <p>end checked components</p>
  </Stack>
);

export const Light = () => (
  <Customizer {...AzureCustomizationsLight}>
    <Fabric applyThemeToBody>
      <Example />
    </Fabric>
  </Customizer>
);

export const Dark = () => (
  <Customizer {...AzureCustomizationsDark}>
    <Fabric applyThemeToBody>
      <Example />
    </Fabric>
  </Customizer>
);
