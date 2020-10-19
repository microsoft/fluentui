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
  Text,
} from '@fluentui/react';
import {
  AzureCustomizationsLight,
  AzureCustomizationsDark,
  AzureCustomizationsHighContrastLight,
  AzureCustomizationsHighContrastDark,
} from '@fluentui/azure-themes';
import { ButtonCommandBarExample } from '../components/commandBarButton.stories';
import { ButtonSplitExample } from '../components/splitButton.stories';
import { ButtonIconExample } from '../components/iconButton.stories';
import { ButtonIconWithTooltipExample } from '../components/iconTooltip.stories';
import { ButtonContextualMenuExample } from '../components/contextualMenu.stories';
import { ButtonActionExample } from '../components/actionButton.stories';
import { ButtonToggleExample } from '../components/buttonToggle.stories';
import { CalloutBasicExample } from '../components/callout.stories';
import { ActivityItemBasicExample } from '../components/activityitem.stories';
import { ChoiceGroupBasicExample } from '../components/choicegroup.stories';
import { ToggleBasicExample } from '../components/toggle.stories';
import { ColorPickerBasicExample } from '../components/colorpicker.stories';
import { ComboBoxBasicExample } from '../components/comboBox.stories';
import { ContextualMenuDefaultExample } from '../components/ContextMenu.stories';
import { DropdownBasicExample } from '../components/dropdown.stories';
import { CommandBarBasicExample } from '../components/commandBar.stories';
import { TagPickerBasicExample } from '../components/tags.stories';
import { DetailsListCompactExample } from '../components/detailsList.stories';
import { DatePickerBoundedExample } from '../components/dateBoundary.stories';
import { PivotBasicExample } from '../components/Pivots.stories';
import { TeachingBubbleBasicExample } from '../components/TeachingBubble.stories';
import { MessageBarBasicExample } from '../components/messageBar.stories';

const Example = () => (
  <Stack gap={8} horizontalAlign="center" style={{ maxWidth: 1000 }}>
    <Stack gap={8} horizontalAlign="center">
      <Text>13px body text</Text>
      <Label>MessageBar / InfoBox</Label>
      <MessageBarBasicExample />
      <Label>TeachingBubble</Label>
      <TeachingBubbleBasicExample />
      <Label>Pivots</Label>
      <PivotBasicExample />
      <Label>Buttons</Label>
      <DefaultButton text="DefaultButton" />
      <PrimaryButton text="PrimaryButton" />
      <CompoundButton primary text="CompoundButton" />
      <CompoundButton secondaryText="secondary text." text="CompoundButton" />
      <DefaultButton primary={true} text="Default button as primary" />
      <DefaultButton primary={true} disabled={true} text="Default w/ primary disabled" />
      <Label>Disabled Buttons</Label>
      <DefaultButton disabled text="DefaultButton disabled" />
      <PrimaryButton disabled text="PrimaryButton disabled" />
      <PrimaryButton disabled text="PrimaryButton disabled" />
      <CompoundButton disabled primary text="CompoundButton primary disabled" />
      <Label disabled>I am a disabled label</Label>
      <Label>Icon Buttons</Label>
      <ButtonIconExample checked={false} />
      <ButtonCommandBarExample />
      <ButtonIconWithTooltipExample />
      <ButtonContextualMenuExample />
      <ButtonActionExample />

      <Label>Toggle button</Label>
      <ButtonToggleExample />
      <ButtonSplitExample checked={false} />
      <CalloutBasicExample />
      <DefaultButton text="WIP: default button > primary" primary />
      <DefaultButton text="WIP: Primary button" primary />
    </Stack>

    <Stack gap={8} horizontalAlign="center" style={{ marginTop: 40 }}>
      <Label>DetailsList / Grid</Label>
      <DetailsListCompactExample />
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
      <Label>Checkboxes</Label>
      <Checkbox label="Unchecked checkbox (uncontrolled)" />
      <Checkbox label="Checked checkbox (uncontrolled)" defaultChecked />
      <Checkbox label="Disabled checkbox" disabled />
      <Checkbox label="Disabled checked checkbox" disabled defaultChecked />
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
      <TextField disabled placeholder="disabled placeholder" />
      <TextField disabled value="disabled text" />
      <TextField placeholder="Hello" />
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

export const HighContrastLight = () => (
  <Customizer {...AzureCustomizationsHighContrastLight}>
    <Fabric applyThemeToBody>
      <Example />
    </Fabric>
  </Customizer>
);

export const HighContrastDark = () => (
  <Customizer {...AzureCustomizationsHighContrastDark}>
    <Fabric applyThemeToBody>
      <Example />
    </Fabric>
  </Customizer>
);
