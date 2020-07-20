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
  SearchBox,
  Link,
  Label,
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
import { TagPickerBasicExample } from '../components/tags';
import { DetailsListCompactExample } from '../components/detailsList';
import { DatePickerBoundedExample } from '../components/dateBoundary';

const Example = () => (
  <Stack gap={8} horizontalAlign="center" style={{ maxWidth: 1000 }}>
    <Stack gap={8} horizontalAlign="center">
      <Label>Buttons</Label>
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
      <DefaultButton text="WIP: default button > primary" primary />
      <DefaultButton text="WIP: Primary button" primary />
    </Stack>
    <Stack gap={8} horizontalAlign="center" style={{ marginTop: 40 }}>
      <Label className="section">DatePicker</Label>
      <DatePickerBoundedExample />
    </Stack>

    <Stack gap={8} horizontalAlign="center" style={{ marginTop: 40 }}>
      <Label>Picker</Label>
      <TagPickerBasicExample />
    </Stack>

    <Stack gap={8} horizontalAlign="center" style={{ marginTop: 40 }}>
      <Label>CommandBar</Label>
      <CommandBarBasicExample />
    </Stack>

    <Stack gap={8} horizontalAlign="center" style={{ marginTop: 40 }}>
      <Label>DetailsList / Grid</Label>
      <DetailsListCompactExample />
    </Stack>

    <Stack gap={8} horizontalAlign="center" style={{ marginTop: 40 }}>
      <Label>Checkboxes</Label>
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
    </Stack>

    <Stack gap={8} horizontalAlign="center" style={{ marginTop: 40 }}>
      <Label>Links</Label>
      <Link>Hello I am a link, hover underline</Link>
    </Stack>

    <Stack gap={8} horizontalAlign="center" style={{ marginTop: 40 }}>
      <Label>ComboBox</Label>
      <ComboBoxBasicExample />
    </Stack>

    <Stack gap={8} horizontalAlign="center" style={{ marginTop: 40 }}>
      <Label>Dropdowns</Label>
      <DropdownBasicExample />
    </Stack>

    <Stack gap={8} horizontalAlign="center" style={{ marginTop: 40 }}>
      <Label>Search / input fields</Label>
      <SearchBox />
      <TextField placeholder="Hello" />
      <TextField placeholder="Hello" disabled />
    </Stack>

    <Stack gap={8} horizontalAlign="center" style={{ marginTop: 40 }}>
      <Label>Misc</Label>
      <ActivityItemBasicExample />
      <ChoiceGroupBasicExample />
      <ToggleBasicExample />
      <ColorPickerBasicExample />
      <ContextualMenuDefaultExample />
    </Stack>
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
