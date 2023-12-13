import * as React from 'react';
import { TextField, Stack, Checkbox, SearchBox, Link, Label, Text, ThemeProvider } from '@fluentui/react';
import {
  AzureThemeLight,
  AzureThemeDark,
  AzureThemeHighContrastLight,
  AzureThemeHighContrastDark,
} from '@fluentui/azure-themes';
import { DefaultButton, CompoundButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { CommandBarSplitDisabledExample } from '../components/commandBarButton.stories';
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
import { TooltipBasicExample } from '../components/tooltip.stories';
import { SliderBasicExample } from '../components/slider.stories';
import { SpinButtonBasicExample } from '../components/SpinButton.stories';
import { DatePickerBasicExample } from '../components/defaultDatePicker';
import { ProgressIndicatorBasicExample } from '../components/ProgressIndicator.stories';
import { CalendarInlineMultidayDayViewExample } from '../components/CalendarInlineMultidayDayView.stories';
import { SpinnerBasicExample } from '../components/spinner.stories';
import { DetailsListCustomColumnsExample } from '../components/DetailsListCustomColumnsExample.stories';
import { ChoiceGroupImageExample } from '../components/choiceGroupWithImagesandIcons.stories';

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
      <Label>Danger buttons (both primary and default)</Label>
      <DefaultButton className="danger" text="danger defaultbutton" />
      <PrimaryButton className="danger" text="danger primarybutton" />

      <Label>Tag buttons (both primary and default)</Label>
      <DefaultButton className="tag" text="tag defaultbutton" />
      <PrimaryButton className="tag" text="tag primarybutton" />
      <Label>Disabled Buttons</Label>
      <DefaultButton disabled text="DefaultButton disabled" />
      <PrimaryButton disabled text="PrimaryButton disabled" />
      <PrimaryButton disabled text="PrimaryButton disabled" />
      <CompoundButton disabled primary text="CompoundButton primary disabled" />
      <Label disabled>I am a disabled label</Label>
      <Label>Icon Buttons</Label>
      <ButtonIconExample checked={false} />
      <Label>CommandBarSplitDisabledExample</Label>
      <CommandBarSplitDisabledExample />
      <ButtonIconWithTooltipExample />
      <ButtonContextualMenuExample />
      <ButtonActionExample />
      <Label>Toggle button</Label>
      <ButtonToggleExample />
      <ButtonSplitExample checked={false} />
      <CalloutBasicExample />
      <DefaultButton text="WIP: default button > primary" primary />
      <DefaultButton text="WIP: Primary button" primary />

      <Label>Tooltip</Label>
      <TooltipBasicExample />
    </Stack>

    <Stack gap={8} horizontalAlign="center" style={{ marginTop: 40 }}>
      <Label>DetailsList / Grid</Label>
      <DetailsListCompactExample />
      <DetailsListCustomColumnsExample />
    </Stack>

    <Stack gap={8} horizontalAlign="center" style={{ marginTop: 40 }}>
      <Label>Slider</Label>
      <SliderBasicExample />
    </Stack>

    <Stack gap={8} horizontalAlign="center" style={{ marginTop: 40 }}>
      <Label>Progress Indicator</Label>
      <ProgressIndicatorBasicExample />
    </Stack>

    <Stack gap={8} horizontalAlign="center" style={{ marginTop: 40 }}>
      <Label className="section">DatePicker</Label>
      <DatePickerBasicExample />
      <DatePickerBoundedExample />
      <CalendarInlineMultidayDayViewExample />
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
      <Checkbox label="Indeterminate checkbox (uncontrolled)" defaultIndeterminate />
      <Checkbox
        label="Indeterminate checkbox which defaults to true when clicked (uncontrolled)"
        defaultIndeterminate
        defaultChecked={true}
      />
      <Checkbox label="Disabled indeterminate checkbox" disabled defaultIndeterminate />
      <Checkbox label="Indeterminate checkbox (controlled)" indeterminate={true} />
    </Stack>

    <Stack gap={8} horizontalAlign="center" style={{ marginTop: 40 }}>
      <Label>Links</Label>
      <Link>Hello I am a link, hover underline</Link>
    </Stack>

    <Link>Loader / Spinner</Link>
    <SpinnerBasicExample />

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
      <TextField errorMessage="Error message!" />
    </Stack>

    <Stack gap={8} horizontalAlign="center" style={{ marginTop: 40 }}>
      <Label>Spin button example</Label>
      <SpinButtonBasicExample />
    </Stack>

    <Stack gap={8} horizontalAlign="center" style={{ marginTop: 40 }}>
      <Label>Misc</Label>
      <ActivityItemBasicExample />
      <ChoiceGroupBasicExample />
      <ChoiceGroupImageExample />
      <ToggleBasicExample />
      <ColorPickerBasicExample />
      <ContextualMenuDefaultExample />
    </Stack>
  </Stack>
);

export const Light = () => (
  <ThemeProvider theme={AzureThemeLight} applyTo="body">
    <Example />
  </ThemeProvider>
);

export const Dark = () => (
  <ThemeProvider theme={AzureThemeDark} applyTo="body">
    <Example />
  </ThemeProvider>
);

export const HighContrastLight = () => (
  <ThemeProvider theme={AzureThemeHighContrastLight} applyTo="body">
    <Example />
  </ThemeProvider>
);

export const HighContrastDark = () => (
  <ThemeProvider theme={AzureThemeHighContrastDark} applyTo="body">
    <Example />
  </ThemeProvider>
);
