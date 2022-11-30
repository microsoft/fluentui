/* eslint-disable react/jsx-no-bind */
import { ITheme, mergeStyles } from '@fluentui/react';
import { ThemeProvider } from '@fluentui/react';
import type { FunctionComponent } from 'react';
import { useState } from 'react';
import * as React from 'react';

import { BreadcrumbBasicExample } from './FluentV8ComponentDemos/Breadcrumb.example';
import { ButtonExample } from './FluentV8ComponentDemos/Button.example';
import { CalloutDirectionalExample } from './FluentV8ComponentDemos/Callout.example';
import { CheckboxExample } from './FluentV8ComponentDemos/Checkbox.example';
import { ChoiceGroupExample } from './FluentV8ComponentDemos/Choicegroup.example';
import { CommandBarBasicExample } from './FluentV8ComponentDemos/CommandBar.example';
import { ContextualMenuDefaultExample } from './FluentV8ComponentDemos/ContextualMenu';
import { DialogBasicExample } from './FluentV8ComponentDemos/Dialog.example';
import { DropdownExample } from './FluentV8ComponentDemos/Dropdown.example';
import { HoverCardInstantDismissExample } from './FluentV8ComponentDemos/Hovercard.example';
import { MessageBarBasicExample } from './FluentV8ComponentDemos/MessageBar.example';
import { PeoplePickerCompactExample } from './FluentV8ComponentDemos/PeoplePickerCompact.example';
import { PeoplePickerListExample } from './FluentV8ComponentDemos/PeoplePickerList.example';
import { PeoplePickerNormalExample } from './FluentV8ComponentDemos/people-picker.example';
import { PivotBasicExample } from './FluentV8ComponentDemos/Pivot.example';
import { SearchBoxFullSizeExample } from './FluentV8ComponentDemos/Searchbox.example';
import { SliderBasicExample } from './FluentV8ComponentDemos/Slider.example';
import { SpinButtonBasicExample } from './FluentV8ComponentDemos/SpinButton.example';
import { SpinnerLabeledExample } from './FluentV8ComponentDemos/Spinner.example';
import { SwatchColorPickerBasicExample } from './FluentV8ComponentDemos/SwatchColorPicker.example';
import { TagPickerBasicExample } from './FluentV8ComponentDemos/TagPicker.example';
import { TeachingBubbleBasicExample } from './FluentV8ComponentDemos/TeachingBubble.example';
import { TextFieldBasicExample } from './FluentV8ComponentDemos/TextField.example';
import { ToggleBasicExample } from './FluentV8ComponentDemos/Toggle.example';
import { TooltipBasicExample } from './FluentV8ComponentDemos/Tooltip.example';

import { Fluent2ForV8LightTheme } from '../../../../components/Theme/Fluent2ThemeForV8/fluent2-for-v8-light-theme';
import { Fluent2ForV8DarkTheme } from '../../../../components/Theme/Fluent2ThemeForV8/fluent2-for-v8-dark-theme';
import { Button, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components';
import { ChevronDown12Regular } from '@fluentui/react-icons';
import { FluentComponentSamples } from './FluentV8ComponentSamples';

const rootStyles = mergeStyles({ padding: 20 });

export const Fluent2ForV8ThemeDemo: FunctionComponent<{}> = (props: React.PropsWithChildren<{}>) => {
  const [selectedTheme, setSelectedTheme] = useState<ITheme>(Fluent2ForV8LightTheme);

  const handLightSelection = () => {
    setSelectedTheme(Fluent2ForV8LightTheme);
  };

  const handleDarkSelection = () => {
    setSelectedTheme(Fluent2ForV8DarkTheme);
  };

  return (
    <ThemeProvider theme={selectedTheme}>
      <div className={rootStyles}>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <Button icon={<ChevronDown12Regular />} iconPosition="after">
              {'Theme'}
            </Button>
          </MenuTrigger>
          {/* It's likley we'll add a high contrast mode some day, so don't use a toggle.*/}
          <MenuPopover>
            <MenuList>
              <MenuItem onClick={handLightSelection}>Light </MenuItem>
              <MenuItem onClick={handleDarkSelection}>Dark</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>

        <FluentComponentSamples />

        <h1>Specific components changes</h1>
        <p>The components below are the components this theme has changed.</p>
        {/* Please maintain alphabetical order */}
        <h2>Breadcrumb</h2>
        <BreadcrumbBasicExample />
        <h2>Buttons</h2>
        <ButtonExample />
        <h2>Callout</h2>
        <CalloutDirectionalExample />
        <h2>Checkbox</h2>
        <CheckboxExample />
        <h2>ChoiceGroup</h2>
        <ChoiceGroupExample />
        <h2>CommandBar</h2>
        <CommandBarBasicExample />
        <h2>Contextual Menu</h2>
        <ContextualMenuDefaultExample />
        <h2>Dialog</h2>
        <DialogBasicExample />
        <h2>Dropdown</h2>
        <DropdownExample />
        <h2>HoverCard</h2>
        <HoverCardInstantDismissExample />
        <h2>MessageBar</h2>
        <MessageBarBasicExample />
        <h2>Pivot</h2>
        <PivotBasicExample />
        <h2>TextField</h2>
        <TextFieldBasicExample />
        <h2>PeoplePicker</h2>
        <h4>Normal People Picker</h4>
        <PeoplePickerNormalExample />
        <h4>Compact People Picker</h4>
        <PeoplePickerCompactExample />
        <h4>List People Picker</h4>
        <PeoplePickerListExample />
        <h2>Pivot</h2>
        <PivotBasicExample />
        <h2>SearchBox</h2>
        <SearchBoxFullSizeExample />
        <h2>Slider</h2>
        <SliderBasicExample />
        <h2>SpinButton</h2>
        <SpinButtonBasicExample />
        <h2>Spinner</h2>
        <SpinnerLabeledExample />
        <h2>SwatchColorPicker</h2>
        <SwatchColorPickerBasicExample />
        <h2>TagPicker</h2>
        <TagPickerBasicExample />
        <h2>TeachingBubble</h2>
        <TeachingBubbleBasicExample />
        <h2>TextField</h2>
        <TextFieldBasicExample />
        <h2>Toggle</h2>
        <ToggleBasicExample />
        <h2>Tooltip</h2>
        <TooltipBasicExample />
      </div>
    </ThemeProvider>
  );
};
