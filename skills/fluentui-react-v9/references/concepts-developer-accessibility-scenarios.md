# Concepts/Developer/Accessibility/Scenarios

## Examples

### Add People Popover

```tsx
import * as React from 'react';

import { Button, Input, Label, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';

interface AddPeopleContentProps {
  setPopoverOpened: (state: boolean) => void;
}

const AddPeopleContent: React.FunctionComponent<AddPeopleContentProps> = (props: AddPeopleContentProps) => {
  const { setPopoverOpened } = props;

  return (
    <>
      <Label htmlFor="addPeopleInput">Enter name, email or tag</Label>
      <Input type="text" name="addPeopleInput" id="addPeopleInput" />
      <Button
        onClick={() => {
          setPopoverOpened(false);
        }}
      >
        Cancel
      </Button>
    </>
  );
};

export const AddPeoplePopover: React.FunctionComponent = () => {
  const [popoverOpened, setPopoverOpened] = React.useState(false);

  return (
    <Scenario pageTitle="Add people popover">
      <Popover
        open={popoverOpened}
        onOpenChange={(event, data) => {
          setPopoverOpened(data.open);
        }}
        trapFocus
      >
        <PopoverTrigger disableButtonEnhancement>
          <Button>Add people</Button>
        </PopoverTrigger>

        <PopoverSurface aria-label="Add someone to the chat">
          <AddPeopleContent setPopoverOpened={setPopoverOpened} />
        </PopoverSurface>
      </Popover>
    </Scenario>
  );
};
```

### Buttons With Tooltip

```tsx
import * as React from 'react';

import { Button, Tooltip } from '@fluentui/react-components';

import { TextItalic24Regular, TextUnderline24Regular, TextBold24Regular } from '@fluentui/react-icons';

export const ButtonsWithTooltip: React.FunctionComponent = () => {
  return (
    <Scenario pageTitle="Buttons with tooltip">
      <h1>Tooltip variants</h1>
      <h2>Tooltips for text formatting icon-only buttons</h2>
      <Tooltip relationship="label" content="Make text bold">
        <Button icon={<TextBold24Regular />} />
      </Tooltip>

      <Tooltip relationship="label" content="Make text underline">
        <Button icon={<TextUnderline24Regular />} />
      </Tooltip>

      <Tooltip relationship="label" content="Make text italic">
        <Button icon={<TextItalic24Regular />} />
      </Tooltip>

      <h2>Tooltip as an additional button description</h2>
      <Tooltip relationship="description" content="App and account settings, status and more">
        <Button>Settings</Button>
      </Tooltip>
    </Scenario>
  );
};
```

### Device Controls Switches

```tsx
import * as React from 'react';

import { Switch } from '@fluentui/react-components';

export const DeviceControlsSwitches: React.FunctionComponent = () => {
  const [hotspotSwitchDisabled, setHotSpotSwitchDisabled] = React.useState<boolean | undefined>(true);
  const [wiFiSwitchChecked, setWiFiSwitchChecked] = React.useState(false);
  const [hotspotSwitchChecked, setHotspotSwitchChecked] = React.useState(false);

  const onWiFiSwitchClick = (event: React.MouseEvent) => {
    setHotSpotSwitchDisabled(hotspotSwitchDisabled ? undefined : true);
    if (wiFiSwitchChecked) {
      setHotspotSwitchChecked(false);
    }
    setWiFiSwitchChecked(!wiFiSwitchChecked);
  };

  const onHotspotSwitchClick = () => {
    setHotspotSwitchChecked(!hotspotSwitchChecked);
  };

  return (
    <Scenario pageTitle="Device controls switches">
      <h1>Device controls</h1>
      <p>This is a basic control panel for your device</p>
      <Switch onClick={onWiFiSwitchClick} label="Wi-Fi" />
      <Switch
        checked={hotspotSwitchChecked}
        disabled={hotspotSwitchDisabled}
        onClick={onHotspotSwitchClick}
        label="Hotspot"
      />

      <Switch label="Bluetooth" />
    </Scenario>
  );
};
```

### Device Controls Toggle Buttons

```tsx
import * as React from 'react';

import { ToggleButton } from '@fluentui/react-components';

export const DeviceControlsToggleButtons: React.FunctionComponent = () => {
  const [hotspotButtonDisabled, setHotspotButtonDisabled] = React.useState<boolean | undefined>(true);
  const [wiFiButtonPressed, setWiFiButtonPressed] = React.useState(false);
  const [hotspotButtonPressed, setHotspotButtonPressed] = React.useState(false);

  const onWiFiButtonClick = (event: React.MouseEvent) => {
    setHotspotButtonDisabled(hotspotButtonDisabled ? undefined : true);
    if (wiFiButtonPressed) {
      setHotspotButtonPressed(false);
    }
    setWiFiButtonPressed(!wiFiButtonPressed);
  };

  const onHotspotButtonClick = () => {
    setHotspotButtonPressed(!hotspotButtonPressed);
  };

  return (
    <Scenario pageTitle="Device controls toggle buttons">
      <h1>Device controls</h1>
      <p>This is a basic control panel for your device</p>
      <ToggleButton onClick={onWiFiButtonClick}>Wi-Fi</ToggleButton>
      <ToggleButton
        checked={hotspotButtonPressed}
        disabledFocusable={hotspotButtonDisabled}
        onClick={onHotspotButtonClick}
      >
        Hotspot
      </ToggleButton>
      <ToggleButton>Bluetooth</ToggleButton>
    </Scenario>
  );
};
```

### Event Reminder Split Button

```tsx
import * as React from 'react';

import { Button, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, SplitButton } from '@fluentui/react-components';
import type { MenuButtonProps } from '@fluentui/react-components';

export const EventReminderSplitButton: React.FunctionComponent = () => {
  const [statusText, setStatusText] = React.useState<string | undefined>(undefined);

  const focusStatus = () => {
    document.getElementById('statusText')?.focus();
  };

  const onDismissButtonClick = () => {
    setStatusText('The reminder has been dismissed.');
    focusStatus();
  };

  const showPostponeText = (duration: string) => {
    const postponeMessages: Record<string, string> = {
      tenMinutes: 'for 10 minutes',
      thirtyMinutes: 'for 30 minutes',
      oneHour: 'for 1 hour',
      tomorrow: 'until tomorrow',
    };
    setStatusText(`The event has been postponed ${postponeMessages[duration]}.`);
    focusStatus();
  };

  return (
    <Scenario pageTitle="Event reminder split button">
      <h1>Event reminder</h1>
      {!statusText && (
        <>
          <p>Your meeting starts in 10 minutes.</p>
          <Button onClick={onDismissButtonClick}>Dismiss</Button>
          <Menu positioning="below-end">
            <MenuTrigger disableButtonEnhancement>
              {(menuButtonProps: MenuButtonProps) => {
                const extendedMenuButtonProps = {
                  ...menuButtonProps,
                  'aria-label': 'Postpone for later',
                };

                return (
                  <SplitButton
                    menuButton={extendedMenuButtonProps}
                    primaryActionButton={{
                      children: 'Postpone for 10 minutes',
                      onClick: () => {
                        showPostponeText('tenMinutes');
                      },
                    }}
                  />
                );
              }}
            </MenuTrigger>

            <MenuPopover>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    showPostponeText('thirtyMinutes');
                  }}
                >
                  Postpone for 30 minutes
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    showPostponeText('oneHour');
                  }}
                >
                  Postpone for 1 hour
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    showPostponeText('tomorrow');
                  }}
                >
                  Postpone until tomorrow
                </MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        </>
      )}
      <div id="statusText" tabIndex={-1}>
        {statusText && <p>{statusText}</p>}
      </div>
    </Scenario>
  );
};
```

### FAQ Accordion

```tsx
import * as React from 'react';

import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-components';

export const FAQAccordion: React.FunctionComponent = () => {
  return (
    <Scenario pageTitle="FAQ accordion">
      <h1>Frequently asked questions about Windows</h1>
      <Accordion multiple>
        <AccordionItem value="faq1">
          <AccordionHeader as="h2">
            What's the difference between 32-bit and 64-bit versions of Windows?
          </AccordionHeader>
          <AccordionPanel>
            <p>
              The terms 32-bit and 64-bit refer to the way a computer's processor (also called a CPU) handles
              information. The 64-bit version of Windows handles large amounts of random access memory (RAM) more
              effectively than a 32-bit system. Not all devices can run the 64-bit versions of Windows.
            </p>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="faq2">
          <AccordionHeader as="h2">How do I tell if my computer can run a 64-bit version of Windows?</AccordionHeader>
          <AccordionPanel>
            <p>If you have a Windows operating system installed, open File Explorer or This PC.</p>
            <ol>
              <li>Right click on This PC or Computer in the navigation pane and select Properties.</li>
              <li>
                In the System information screen, find the System type entry. This will indicate what type of processor
                your device has.
              </li>
            </ol>
            <p>
              If you do not have an operating system installed, you should refer to the documentation that came with the
              device. Most device and processor manufacturers also provide information regarding processor capabilities
              on their websites.
            </p>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="faq3">
          <AccordionHeader as="h2">How do I find my Windows product key?</AccordionHeader>
          <AccordionPanel>
            <p>
              The product key is located inside the product packaging, on the receipt or confirmation page for a digital
              purchase or in a confirmation e-mail that shows you purchased Windows. If you purchased a digital copy
              from Microsoft Store, you can locate your product key in your Account under Digital Content.
            </p>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Scenario>
  );
};
```

### Mail Settings Horizontal Tab List

```tsx
import * as React from 'react';

import {
  Label,
  Checkbox,
  RadioGroup,
  Radio,
  TabList,
  Tab,
  TabValue,
  Textarea,
  SelectTabEvent,
  SelectTabData,
} from '@fluentui/react-components';

import { MusicNote1Filled, InfoRegular } from '@fluentui/react-icons';

export const MailSettingsHorizontalTabList: React.FunctionComponent = () => {
  const [selectedTabValue, setSelectedTabValue] = React.useState<TabValue>('general');

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedTabValue(data.value);
  };

  const GeneralPanel = React.memo(() => (
    <div role="tabpanel" aria-labelledby="generalTab">
      <div>
        <Checkbox label="Run app at startup" />
      </div>

      <div>
        <Checkbox label="Enable spell-check" />
      </div>

      <Label htmlFor="oofTextarea">Out of office message:</Label>
      <Textarea id="oofTextarea" />
    </div>
  ));

  const AppearancePanel = React.memo(() => (
    <div role="tabpanel" aria-labelledby="appearanceTab">
      <Label id="themeLabel">Select theme:</Label>
      <RadioGroup defaultValue="light" aria-labelledby="themeLabel">
        <Radio value="light" label="Light" />
        <Radio value="dark" label="Dark" />
      </RadioGroup>

      <Label id="fontSizeLabel">Font size:</Label>
      <RadioGroup defaultValue="medium" aria-labelledby="fontSizeLabel">
        <Radio value="small" label="Small" />
        <Radio value="medium" label="Medium" />
        <Radio value="large" label="Large" />
      </RadioGroup>
      <Checkbox defaultChecked={true} label="Show message preview pane" />
    </div>
  ));

  const SoundsPanel = React.memo(() => (
    <div role="tabpanel" aria-labelledby="SoundsTab">
      <Checkbox label="Disable all notification sounds" />
    </div>
  ));

  const AboutPanel = React.memo(() => (
    <div role="tabpanel" aria-labelledby="aboutTab">
      <h2>Mail</h2>
      <p>Version: 1.0.0.</p>
      <p>Copyright 2022. All rights reserved.</p>
    </div>
  ));

  return (
    <Scenario pageTitle="Mail settings with horizontal tablist">
      <h1>Settings</h1>
      <TabList selectedValue={selectedTabValue} onTabSelect={onTabSelect}>
        <Tab id="generalTab" value="general">
          General
        </Tab>
        <Tab id="appearanceTab" value="appearance">
          Appearance
        </Tab>
        <Tab id="soundsTab" value="sounds" icon={<MusicNote1Filled />} aria-label="Sounds" />
        <Tab id="advancedTab" value="advanced" disabled>
          Advanced
        </Tab>
        <Tab id="aboutTab" icon={<InfoRegular />} value="about">
          About
        </Tab>
      </TabList>

      {selectedTabValue === 'general' && <GeneralPanel />}
      {selectedTabValue === 'appearance' && <AppearancePanel />}
      {selectedTabValue === 'sounds' && <SoundsPanel />}
      {selectedTabValue === 'about' && <AboutPanel />}
    </Scenario>
  );
};
```

### Mail Settings Overflow Tab List

```tsx
import * as React from 'react';

import { makeStyles, mergeClasses } from '@fluentui/react-components';

import {
  tokens,
  Button,
  Label,
  Checkbox,
  RadioGroup,
  Radio,
  TabList,
  Tab,
  TabValue,
  Textarea,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Overflow,
  OverflowItem,
  useIsOverflowItemVisible,
  useOverflowMenu,
} from '@fluentui/react-components';

import { MusicNote1Filled, InfoRegular, MoreHorizontalRegular } from '@fluentui/react-icons';

type SettingsTab = {
  id: string;
  name: string | undefined;
  icon: React.ReactElement | undefined;
  disabled: boolean;
};

const tabs: SettingsTab[] = [
  {
    id: 'general',
    name: 'General',
    icon: undefined,
    disabled: false,
  },
  {
    id: 'appearance',
    name: 'Appearance',
    icon: undefined,
    disabled: false,
  },
  {
    id: 'sounds',
    name: 'Sounds',
    icon: <MusicNote1Filled />,
    disabled: false,
  },
  {
    id: 'advanced',
    name: 'Advanced',
    icon: undefined,
    disabled: true,
  },
  {
    id: 'about',
    name: 'About',
    icon: <InfoRegular />,
    disabled: false,
  },
];

type OverflowMenuItemProps = {
  tab: SettingsTab;
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

const OverflowMenuItem = (props: OverflowMenuItemProps) => {
  const { tab, onClick } = props;
  const isVisible = useIsOverflowItemVisible(tab.id);

  if (isVisible) {
    return null;
  }

  return (
    <MenuItem as="div" key={tab.id} icon={tab.icon} onClick={onClick} disabled={tab.disabled}>
      <div>{tab.name}</div>
    </MenuItem>
  );
};

type OverflowMenuProps = {
  onTabSelect?: (tabId: string) => void;
};

const OverflowMenu = (props: OverflowMenuProps) => {
  const { onTabSelect } = props;
  const { ref, isOverflowing, overflowCount } = useOverflowMenu<HTMLButtonElement>();

  const onItemClick = (tabId: string) => {
    onTabSelect?.(tabId);
  };

  if (!isOverflowing) {
    return null;
  }

  return (
    <Menu hasIcons>
      <MenuTrigger>
        <Button
          ref={ref}
          icon={<MoreHorizontalRegular />}
          role="tab"
          aria-label={`${overflowCount} more tabs`}
          aria-selected="false"
        />
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          {tabs.map(tab => (
            <OverflowMenuItem key={tab.id} tab={tab} onClick={() => onItemClick(tab.id)} />
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const useSettingsStyles = makeStyles({
  settings: {
    backgroundColor: tokens.colorNeutralBackground2,
    overflow: 'hidden',
    padding: '5px',
    zIndex: 0, //stop the browser resize handle from piercing the overflow menu
  },
  horizontal: {
    height: 'fit-content',
    minWidth: '150px',
    resize: 'horizontal',
    width: '300px',
  },
});

export const MailSettingsOverflowTabList: React.FunctionComponent = () => {
  const styles = useSettingsStyles();

  const [selectedTabValue, setSelectedTabValue] = React.useState<TabValue>('general');

  const onTabSelect = (tabId: string) => {
    setSelectedTabValue(tabId);
  };

  const GeneralPanel = React.memo(() => (
    <div role="tabpanel" aria-labelledby="generalTab">
      <div>
        <Checkbox label="Run app at startup" />
      </div>

      <div>
        <Checkbox label="Enable spell-check" />
      </div>

      <Label htmlFor="oofTextarea">Out of office message:</Label>
      <Textarea id="oofTextarea" />
    </div>
  ));

  const AppearancePanel = React.memo(() => (
    <div role="tabpanel" aria-labelledby="appearanceTab">
      <Label id="themeLabel">Select theme:</Label>
      <RadioGroup defaultValue="light" aria-labelledby="themeLabel">
        <Radio value="light" label="Light" />
        <Radio value="dark" label="Dark" />
      </RadioGroup>

      <Label id="fontSizeLabel">Font size:</Label>
      <RadioGroup defaultValue="medium" aria-labelledby="fontSizeLabel">
        <Radio value="small" label="Small" />
        <Radio value="medium" label="Medium" />
        <Radio value="large" label="Large" />
      </RadioGroup>
      <Checkbox defaultChecked={true} label="Show message preview pane" />
    </div>
  ));

  const SoundsPanel = React.memo(() => (
    <div role="tabpanel" aria-labelledby="SoundsTab">
      <Checkbox label="Disable all notification sounds" />
    </div>
  ));

  const AboutPanel = React.memo(() => (
    <div role="tabpanel" aria-labelledby="aboutTab">
      <h2>Mail</h2>
      <p>Version: 1.0.0.</p>
      <p>Copyright 2022. All rights reserved.</p>
    </div>
  ));

  return (
    <Scenario pageTitle="Mail settings with overflow tablist">
      <h1>Settings</h1>
      <div className={mergeClasses(styles.settings, styles.horizontal)}>
        <Overflow minimumVisible={2}>
          <TabList selectedValue={selectedTabValue} onTabSelect={(event, data) => onTabSelect(data.value as string)}>
            {tabs.map(tab => {
              return (
                <OverflowItem key={tab.id} id={tab.id} priority={tab.id === selectedTabValue ? 2 : 1}>
                  <Tab value={tab.id} icon={<span>{tab.icon}</span>} disabled={tab.disabled}>
                    {tab.name}
                  </Tab>
                </OverflowItem>
              );
            })}
            <OverflowMenu onTabSelect={onTabSelect} />
          </TabList>
        </Overflow>
      </div>

      {selectedTabValue === 'general' && <GeneralPanel />}
      {selectedTabValue === 'appearance' && <AppearancePanel />}
      {selectedTabValue === 'sounds' && <SoundsPanel />}
      {selectedTabValue === 'about' && <AboutPanel />}
    </Scenario>
  );
};
```

### Mail Settings Vertical Tab List

```tsx
import * as React from 'react';

import {
  Label,
  Checkbox,
  RadioGroup,
  Radio,
  Textarea,
  TabList,
  Tab,
  TabValue,
  SelectTabEvent,
  SelectTabData,
} from '@fluentui/react-components';

import { MusicNote1Filled, InfoRegular } from '@fluentui/react-icons';

export const MailSettingsVerticalTabList: React.FunctionComponent = () => {
  const [selectedTabValue, setSelectedTabValue] = React.useState<TabValue>('general');

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedTabValue(data.value);
  };

  const GeneralPanel = React.memo(() => (
    <div role="tabpanel" aria-labelledby="generalTab">
      <div>
        <Checkbox label="Run app at startup" />
      </div>

      <div>
        <Checkbox label="Enable spell-check" />
      </div>

      <Label htmlFor="oofTextarea">Out of office message:</Label>
      <Textarea id="oofTextarea" />
    </div>
  ));

  const AppearancePanel = React.memo(() => (
    <div role="tabpanel" aria-labelledby="appearanceTab">
      <Label id="themeLabel">Select theme:</Label>
      <RadioGroup defaultValue="light" aria-labelledby="themeLabel">
        <Radio value="light" label="Light" />
        <Radio value="dark" label="Dark" />
      </RadioGroup>

      <Label id="fontSizeLabel">Font size:</Label>
      <RadioGroup defaultValue="medium" aria-labelledby="fontSizeLabel">
        <Radio value="small" label="Small" />
        <Radio value="medium" label="Medium" />
        <Radio value="large" label="Large" />
      </RadioGroup>
      <Checkbox defaultChecked={true} label="Show message preview pane" />
    </div>
  ));

  const SoundsPanel = React.memo(() => (
    <div role="tabpanel" aria-labelledby="SoundsTab">
      <Checkbox label="Disable all notification sounds" />
    </div>
  ));

  const AboutPanel = React.memo(() => (
    <div role="tabpanel" aria-labelledby="aboutTab">
      <h2>Mail</h2>
      <p>Version: 1.0.0.</p>
      <p>Copyright 2022. All rights reserved.</p>
    </div>
  ));

  return (
    <Scenario pageTitle="Mail settings with vertical tablist">
      <h1>Settings</h1>
      <TabList selectedValue={selectedTabValue} onTabSelect={onTabSelect} vertical>
        <Tab id="generalTab" value="general">
          General
        </Tab>
        <Tab id="appearanceTab" value="appearance">
          Appearance
        </Tab>
        <Tab id="soundsTab" value="sounds" icon={<MusicNote1Filled />} aria-label="Sounds" />
        <Tab id="advancedTab" value="advanced" disabled>
          Advanced
        </Tab>
        <Tab id="aboutTab" icon={<InfoRegular />} value="about">
          About
        </Tab>
      </TabList>

      {selectedTabValue === 'general' && <GeneralPanel />}
      {selectedTabValue === 'appearance' && <AppearancePanel />}
      {selectedTabValue === 'sounds' && <SoundsPanel />}
      {selectedTabValue === 'about' && <AboutPanel />}
    </Scenario>
  );
};
```

### Menu With Split Item

```tsx
import * as React from 'react';

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuSplitGroup,
  MenuTrigger,
} from '@fluentui/react-components';

export const MenuWithSplitItem: React.FunctionComponent = () => {
  return (
    <Scenario pageTitle="Menu with split item">
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <MenuButton>More actions</MenuButton>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuItem>New Window</MenuItem>
            <MenuItem>Create Folder</MenuItem>
            <Menu>
              <MenuSplitGroup>
                <MenuItem>Open</MenuItem>
                <MenuTrigger disableButtonEnhancement>
                  <MenuItem id="nestedTrigger" aria-label="More open options" />
                </MenuTrigger>
              </MenuSplitGroup>

              <MenuPopover>
                <MenuList>
                  <MenuItem>In browser</MenuItem>
                  <MenuItem>In desktop app</MenuItem>
                  <MenuItem>In mobile</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </MenuList>
        </MenuPopover>
      </Menu>
    </Scenario>
  );
};
```

### Messenger Buttons

```tsx
import * as React from 'react';

import { Button } from '@fluentui/react-components';

export const MessengerButtons: React.FunctionComponent = () => {
  const [deleteButtonDisabled, setDeleteButtonDisabled] = React.useState<boolean | undefined>(true);
  const [increaseFontButtonDisabled, setIncreaseFontButtonDisabled] = React.useState<boolean | undefined>(undefined);
  const [decreaseFontButtonDisabled, setDecreaseFontButtonDisabled] = React.useState<boolean | undefined>(true);
  const [fontSizeIndex, setFontSizeIndex] = React.useState(0);
  const [message, setMessage] = React.useState('');
  const [statusText, setStatusText] = React.useState('');

  const increaseFontButtonRef = React.useRef<HTMLButtonElement>(null);
  const decreaseFontButtonRef = React.useRef<HTMLButtonElement>(null);

  const possibleFontSizes = ['100%', '140%', '180%'];
  const messageStyle = {
    fontSize: possibleFontSizes[fontSizeIndex],
  };

  const resetMessage = () => {
    setMessage('');
    setDeleteButtonDisabled(true);
  };

  const onSendButtonClick = () => {
    if (message.length > 0) {
      setStatusText('Message has been sent.');
    } else {
      setStatusText('Please type a message.');
    }
    resetMessage();
  };
  const onDeleteButtonClick = () => {
    resetMessage();
  };
  const onIncreaseFontButtonClick = () => {
    if (fontSizeIndex < possibleFontSizes.length - 1) {
      if (fontSizeIndex === possibleFontSizes.length - 2) {
        setIncreaseFontButtonDisabled(true);
        decreaseFontButtonRef.current!.focus();
      } else if (fontSizeIndex === 0) {
        setDecreaseFontButtonDisabled(undefined);
      }
      setFontSizeIndex(fontSizeIndex + 1);
    }
  };
  const onDecreaseFontButtonClick = () => {
    if (fontSizeIndex > 0) {
      if (fontSizeIndex === possibleFontSizes.length - 1) {
        setIncreaseFontButtonDisabled(undefined);
      } else if (fontSizeIndex === 1) {
        setDecreaseFontButtonDisabled(true);
        increaseFontButtonRef.current!.focus();
      }
      setFontSizeIndex(fontSizeIndex - 1);
    }
  };
  const onMessageTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (value.length > 0) {
      setDeleteButtonDisabled(undefined);
      setStatusText('');
    } else {
      setDeleteButtonDisabled(true);
    }
    setMessage(value);
  };

  return (
    <Scenario pageTitle="Messenger buttons">
      <Button ref={increaseFontButtonRef} disabled={increaseFontButtonDisabled} onClick={onIncreaseFontButtonClick}>
        Increase font size
      </Button>
      <Button ref={decreaseFontButtonRef} disabled={decreaseFontButtonDisabled} onClick={onDecreaseFontButtonClick}>
        Decrease font size
      </Button>
      <textarea
        name="message"
        rows={3}
        cols={50}
        placeholder="Enter message here...."
        aria-label="Message"
        onChange={onMessageTextareaChange}
        value={message}
        style={messageStyle}
      />

      <Button onClick={onSendButtonClick}>Send</Button>
      <Button disabledFocusable={deleteButtonDisabled} onClick={onDeleteButtonClick}>
        Delete
      </Button>

      <p aria-live="polite">{statusText}</p>
    </Scenario>
  );
};
```

### Personal Form Accordion

```tsx
import * as React from 'react';

import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Button,
  Input,
  Label,
  Radio,
  RadioGroup,
  Checkbox,
} from '@fluentui/react-components';

export const PersonalFormAccordion = () => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  React.useEffect(() => {
    if (isSubmitted) {
      document.getElementById('formSubmittedText')?.focus();
    }
  }, [isSubmitted]);

  const onSubmit = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <Scenario pageTitle="Personal form accordion">
      <h1>Personal form</h1>
      {!isSubmitted ? (
        <form onSubmit={onSubmit}>
          <Accordion defaultOpenItems="basicInfo">
            <AccordionItem value="basicInfo">
              <AccordionHeader as="h2">Basic information</AccordionHeader>
              <AccordionPanel>
                <Label htmlFor="name">Name:</Label>
                <Input type="text" id="name" name="name" />
                <Label htmlFor="email">Email:</Label>
                <Input type="email" id="email" name="email" />
                <Label id="ageLabel">Your age:</Label>
                <RadioGroup defaultValue="ageClass1" aria-labelledby="ageLabel">
                  <Radio value="ageClass1" label="Under 16" />
                  <Radio value="ageClass2" label="Between 16 and 50" />
                  <Radio value="ageClass3" label="Over 50" />
                </RadioGroup>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="residence">
              <AccordionHeader as="h2">Residence</AccordionHeader>
              <AccordionPanel>
                <Label htmlFor="street">Street:</Label>
                <Input type="text" id="street" name="street" />
                <Label htmlFor="city">City:</Label>
                <Input type="text" id="city" name="city" />
                <Label htmlFor="country">Country:</Label>
                <Input type="text" id="country" name="country" />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem value="hobbies">
              <AccordionHeader as="h2">Hobbies</AccordionHeader>
              <AccordionPanel>
                <div role="group" aria-labelledby="hobbiesLabel">
                  <Label id="hobbiesLabel">Please select your hobbies:</Label>
                  <Checkbox label="Books" />
                  <Checkbox label="Sports" />
                  <Checkbox label="Music" />
                  <Checkbox label="Travelling" />
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Button type="submit">Submit</Button>
        </form>
      ) : (
        <p id="formSubmittedText" tabIndex={-1}>
          The form would have been submitted.
        </p>
      )}
    </Scenario>
  );
};
```

### Posts Loading Spinner

```tsx
import * as React from 'react';

import { Spinner } from '@fluentui/react-components';

export const PostsLoadingSpinner: React.FunctionComponent = () => {
  return (
    <Scenario pageTitle="Posts loading spinner">
      <Spinner label="Loading posts..." />
    </Scenario>
  );
};
```

### Profile Menu

```tsx
import * as React from 'react';

import {
  Menu,
  MenuButton,
  MenuGroup,
  MenuGroupHeader,
  MenuItem,
  MenuItemCheckbox,
  MenuItemRadio,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-components';

interface StatusSubmenuProps {
  checkedValues: Record<string, string[]>;
  onChange: OnCheckedValueChangeCallback;
}

const StatusSubmenu: React.FunctionComponent<StatusSubmenuProps> = props => {
  const { checkedValues, onChange } = props;

  return (
    <Menu checkedValues={checkedValues} onCheckedValueChange={onChange}>
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>Status</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItemRadio name="status" value="online">
            Online
          </MenuItemRadio>
          <MenuItemRadio name="status" value="away">
            Away
          </MenuItemRadio>
          <MenuItemRadio name="status" value="offline" disabled>
            Offline
          </MenuItemRadio>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

type OnCheckedValueChangeDataType = {
  name: string;
  checkedItems: string[];
};

type OnCheckedValueChangeCallback = (
  event: React.MouseEvent | React.KeyboardEvent,
  data: OnCheckedValueChangeDataType,
) => void;

type ProfileMenuStatus = { status: Array<'online' | 'away' | 'offline'> };

export const ProfileMenu: React.FunctionComponent = () => {
  const [statusCheckedValues, setStatusCheckedValues] = React.useState<ProfileMenuStatus>({ status: ['online'] });
  const onStatusChange = (
    event: React.MouseEvent | React.KeyboardEvent,
    { name, checkedItems }: OnCheckedValueChangeDataType,
  ) => {
    setStatusCheckedValues(state => ({ ...state, [name]: checkedItems }));
  };

  return (
    <Scenario pageTitle="Profile menu">
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <MenuButton>Profile</MenuButton>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            <MenuGroup>
              <MenuGroupHeader>Information</MenuGroupHeader>
              <MenuItem>Help</MenuItem>
            </MenuGroup>
            <MenuGroup>
              <MenuGroupHeader>Settings</MenuGroupHeader>
              <MenuItemCheckbox name="settings" value="runAtStartup">
                Run at startup
              </MenuItemCheckbox>
              <MenuItemCheckbox name="settings" value="showNotifications">
                Show notifications
              </MenuItemCheckbox>
            </MenuGroup>
            <MenuGroup>
              <MenuGroupHeader>Account</MenuGroupHeader>
              <StatusSubmenu checkedValues={statusCheckedValues} onChange={onStatusChange} />
              <MenuItem>Logout</MenuItem>
            </MenuGroup>
          </MenuList>
        </MenuPopover>
      </Menu>
    </Scenario>
  );
};
```

### Questionnaire About Customer Experience Textareas

```tsx
import * as React from 'react';

import { Button, Textarea, Checkbox, Label } from '@fluentui/react-components';

import { useForm, Controller, OnSubmit } from 'react-hook-form';
import { usePubSub, PubSubProvider as _PubSubProvider, Handler } from '@cactuslab/usepubsub';

// '@cactuslab/usepubsub' doesn't ship React 18 compatible types
const PubSubProvider = _PubSubProvider as React.FC<
  React.PropsWithChildren<React.ComponentProps<typeof _PubSubProvider>>
>;

const generateCustomerId = (): string => {
  let char;
  let hash = 0;
  const random = Math.random().toString();
  for (let i = 0; i < random.length; i++) {
    char = random.charCodeAt(i);
    //eslint-disable-next-line no-bitwise
    hash = (hash << 5) - hash + char;
    //eslint-disable-next-line no-bitwise
    hash |= 0; // Convert to 32bit integer
  }
  hash += 2147483647; // Convert to positive integer
  return hash.toString().padStart(10, '0').substring(2);
};

let isSubmitting = false;

interface FormTextareas {
  knowledge: string;
  effort: string;
  problemNotSolved: string;
  otherComments: string;
  satisfaction: string;
}

interface FormValidation {
  subscribe: (channel: string, handler: Handler) => () => void;
  unsubscribe: (channel: string, handler: Handler) => void;
}

interface ValidationMessageProps {
  id: string;
  formValidation: FormValidation;
  children: React.ReactNode;
}
const ValidationMessage: React.FC<ValidationMessageProps> = ({ id, formValidation, children }) => {
  const [isAlerting, setIsAlerting] = React.useState(true);

  const alert = React.useCallback(() => {
    setIsAlerting(false);
    setTimeout(() => setIsAlerting(true), 200);
  }, [setIsAlerting]);

  React.useEffect(() => {
    formValidation.subscribe(id, alert);
    return () => formValidation.unsubscribe(id, alert);
  }, [formValidation, alert, id]);
  return (
    <>
      {isAlerting ? (
        <div role="alert" style={{ color: 'red' }} id={`${id}Errors`}>
          {children}
        </div>
      ) : (
        <div style={{ color: 'green' }} id={`${id}Errors`}>
          {children}
        </div>
      )}
    </>
  );
};

const useFormValidation = (
  handleSubmit: (callback: OnSubmit<FormTextareas>) => (e?: React.BaseSyntheticEvent) => Promise<void>,
) => {
  const pubSub = usePubSub();
  const isHandlingSubmit = React.useRef(false);

  const wrappedHandleSubmit = React.useCallback(
    (callback: OnSubmit<FormTextareas>) => {
      const handler = handleSubmit(callback);
      return async (e: React.BaseSyntheticEvent) => {
        isHandlingSubmit.current = true;
        const result = await handler(e);
        isHandlingSubmit.current = false;
        return result;
      };
    },
    [isHandlingSubmit, handleSubmit],
  );

  const onFieldValidated = React.useCallback(
    (field: string) => {
      if (!isHandlingSubmit.current) {
        pubSub.publish(field, 'validate');
      }
      return true;
    },
    [isHandlingSubmit, pubSub],
  );

  const notifyFormFieldError = React.useCallback(
    (field: string) => {
      pubSub.publish(field, 'validate');
      return true;
    },
    [pubSub],
  );

  return {
    subscribe: pubSub.subscribe,
    unsubscribe: pubSub.unsubscribe,
    onFieldValidated,
    handleSubmit: wrappedHandleSubmit,
    notifyFormFieldError,
  };
};

const QuestionnaireAboutCustomerExperienceAccessibility = () => {
  const { control, handleSubmit, errors, formState, unregister } = useForm<FormTextareas>({
    validateCriteriaMode: 'all',
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const formValidation = useFormValidation(handleSubmit);

  const [isProblemNotSolved, setIsProblemNotSolved] = React.useState(false);
  const [isSubmittedAndValid, setIsSubmittedAndValid] = React.useState(false);

  React.useEffect(() => {
    if (formState.isSubmitting) {
      isSubmitting = true;
    }
  }, [formState]);

  React.useEffect(() => {
    // If the form is submitting and has errors, focus the first error fiel, otherwise do nothing
    if (!isSubmitting || !formState.isSubmitted || formState.isValid) {
      return;
    }
    isSubmitting = false;

    const firstErrorName = Object.keys(errors)[0] as keyof FormTextareas;
    const firstErrorField = document.getElementById(firstErrorName);

    if (firstErrorField) {
      setTimeout(() => firstErrorField.focus(), 500);
    }
  }, [errors, formState, formValidation]);

  React.useEffect(() => {
    if (isSubmittedAndValid) {
      document.getElementById('validMessage')?.focus();
    }
  }, [isSubmittedAndValid]);

  const onSubmit = (data: FormTextareas, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault();
    if (formState.isValid) {
      setIsSubmittedAndValid(true);
    }
  };

  const onProblemNotSolvedChange = (event: React.ChangeEvent) => {
    unregister('problemNotSolved');
    setIsProblemNotSolved(!isProblemNotSolved);
  };

  return (
    <Scenario pageTitle="Textareas in questionnaire about customer experience">
      <h1>Questionnaire about telepohne customer experience</h1>
      {!isSubmittedAndValid ? (
        <>
          <p>
            Please answer the questions below regarding your last experience as a customer of our telephone banking
            services.
          </p>
          <form onSubmit={formValidation.handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="knowledge">Describe the knowledge of the problem by the operator</Label>
              <Controller
                name="knowledge"
                control={control}
                as={
                  <Textarea
                    id="knowledge"
                    aria-required="true"
                    aria-invalid={!!errors.knowledge}
                    aria-describedby="knowledgeErrors"
                  />
                }
                rules={{
                  required: true,
                  minLength: 20,
                  validate: {
                    always: () => {
                      if (!formState.isSubmitting) {
                        formValidation.onFieldValidated('knowledge');
                      }
                      return true;
                    },
                  },
                }}
              />
            </div>
            {errors.knowledge?.types && (
              <ValidationMessage id="knowledge" formValidation={formValidation}>
                {'required' in errors.knowledge.types ? (
                  <p>This field is required.</p>
                ) : (
                  <>
                    <p>This field is invalid. It must:</p>
                    <ul>{'minLength' in errors.knowledge.types && <li>Have at least 20 characters.</li>}</ul>
                  </>
                )}
              </ValidationMessage>
            )}

            <div>
              <Label htmlFor="effort">Describe the kindness and effort to solve your problem by the operator</Label>
              <Controller
                name="effort"
                control={control}
                as={
                  <Textarea
                    id="effort"
                    aria-required="true"
                    aria-invalid={!!errors.effort}
                    aria-describedby="effortErrors"
                  />
                }
                rules={{
                  required: true,
                  minLength: 20,
                  validate: {
                    always: () => {
                      if (!formState.isSubmitting) {
                        formValidation.onFieldValidated('effort');
                      }
                      return true;
                    },
                  },
                }}
              />
            </div>
            {errors.effort?.types && (
              <ValidationMessage id="effort" formValidation={formValidation}>
                {'required' in errors.effort.types ? (
                  <p>This field is required.</p>
                ) : (
                  <>
                    <p>This field is invalid. It must:</p>
                    <ul>{'minLength' in errors.effort.types && <li>Have at least 20 characters.</li>}</ul>
                  </>
                )}
              </ValidationMessage>
            )}

            <div>
              <Checkbox
                checked={isProblemNotSolved}
                onChange={onProblemNotSolvedChange}
                label="My problem has not been solved."
              />
            </div>

            <div>
              <Label htmlFor="problemNotSolved">Tell us why your problem has not been solved</Label>
              <Controller
                name="problemNotSolved"
                control={control}
                as={
                  <Textarea
                    id="problemNotSolved"
                    disabled={!isProblemNotSolved}
                    aria-required={isProblemNotSolved}
                    aria-invalid={!!errors.problemNotSolved}
                    aria-describedby="problemNotSolvedErrors"
                  />
                }
                rules={{
                  required: isProblemNotSolved,
                  minLength: isProblemNotSolved ? 20 : 0,
                  validate: {
                    always: () => {
                      if (!formState.isSubmitting) {
                        formValidation.onFieldValidated('problemNotSolved');
                      }
                      return true;
                    },
                  },
                }}
              />
            </div>
            {errors.problemNotSolved?.types && (
              <ValidationMessage id="problemNotSolved" formValidation={formValidation}>
                {'required' in errors.problemNotSolved.types ? (
                  <p>This field is required.</p>
                ) : (
                  <>
                    <p>This field is invalid. It must:</p>
                    <ul>{'minLength' in errors.problemNotSolved.types && <li>Have at least 20 characters.</li>}</ul>
                  </>
                )}
              </ValidationMessage>
            )}

            <div>
              <Label htmlFor="otherComments">
                Anything else you want to tell us about your last telephone experience
              </Label>
              <Textarea id="otherComments" />
            </div>

            <div>
              <Label htmlFor="satisfaction">Extra question: How satisfied are you otherwise with our services?</Label>
              <Controller
                name="satisfaction"
                control={control}
                as={
                  <Textarea
                    id="satisfaction"
                    placeholder="Try to be concise, not to use more than three sentences..."
                    aria-invalid={!!errors.satisfaction}
                    aria-describedby="satisfactionErrors"
                  />
                }
                rules={{
                  maxLength: 150,
                  validate: {
                    always: () => {
                      if (!formState.isSubmitting) {
                        formValidation.onFieldValidated('satisfaction');
                      }
                      return true;
                    },
                  },
                }}
              />
            </div>
            {errors.satisfaction?.types && (
              <ValidationMessage id="satisfaction" formValidation={formValidation}>
                <p>This field is invalid. It must:</p>
                <ul>{'maxLength' in errors.satisfaction.types && <li>Have not more than150 characters.</li>}</ul>
              </ValidationMessage>
            )}

            <div>
              <Label htmlFor="customerId">Your customer id:</Label>
              <Textarea
                id="customerId"
                defaultValue={generateCustomerId()}
                readOnly
                aria-describedby="customerIdHint"
              />
            </div>

            <p id="customerIdHint">We will use the customer id to track your feedback.</p>

            <Button type="submit">Submit</Button>
          </form>
        </>
      ) : (
        <p id="validMessage" role="alert" tabIndex={-1}>
          The form is valid and would have been submitted.
        </p>
      )}
    </Scenario>
  );
};

export const QuestionnaireAboutCustomerExperienceTextareas: React.FunctionComponent = () => (
  <PubSubProvider>
    <QuestionnaireAboutCustomerExperienceAccessibility />
  </PubSubProvider>
);
```

### Questionnaire About Food Checkboxes

```tsx
import * as React from 'react';

import { Button, Checkbox, CheckboxOnChangeData, Label } from '@fluentui/react-components';

export const QuestionnaireAboutFoodCheckboxes: React.FunctionComponent = () => {
  const [isAppleSelected, setIsAppleSelected] = React.useState(false);
  const [isBananaSelected, setIsBananaSelected] = React.useState(false);
  const [isOrangeSelected, setIsOrangeSelected] = React.useState(false);
  const [isSpecialDietSelected, setIsSpecialDietSelected] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const getSpecialDietDisabled = () => {
    return isSpecialDietSelected ? false : true;
  };

  React.useEffect(() => {
    if (isSubmitted) {
      document.getElementById('formSubmittedText')?.focus();
    }
  }, [isSubmitted]);

  const onSubmit = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <Scenario pageTitle="Checkboxes in questionnaire about food">
      <h1>Questionnaire about food</h1>
      {!isSubmitted ? (
        <form onSubmit={onSubmit}>
          <div role="group" aria-labelledby="foodLabel">
            <Label id="foodLabel">Select food that you like:</Label>

            <Checkbox
              checked={
                isAppleSelected && isBananaSelected && isOrangeSelected
                  ? true
                  : !(isAppleSelected || isBananaSelected || isOrangeSelected)
                  ? false
                  : 'mixed'
              }
              onChange={(event: React.ChangeEvent, data: CheckboxOnChangeData) => {
                setIsAppleSelected(!!data.checked);
                setIsBananaSelected(!!data.checked);
                setIsOrangeSelected(!!data.checked);
              }}
              label="All fruits"
            />

            <Checkbox
              checked={isAppleSelected}
              onChange={() => setIsAppleSelected(checked => !checked)}
              label="Apple"
            />

            <Checkbox
              checked={isBananaSelected}
              onChange={() => setIsBananaSelected(checked => !checked)}
              label="Banana"
            />

            <Checkbox
              checked={isOrangeSelected}
              onChange={() => setIsOrangeSelected(checked => !checked)}
              label="Orange"
            />
          </div>

          <Checkbox
            checked={isSpecialDietSelected}
            onChange={() => setIsSpecialDietSelected(checked => !checked)}
            label="I am on special diet"
          />

          <div role="group" aria-labelledby="cannotEatLabel">
            <Label id="cannotEatLabel">I cannot eat the following:</Label>
            <Checkbox disabled={getSpecialDietDisabled()} label="Sugar" />
            <Checkbox disabled={getSpecialDietDisabled()} label="Meat" />
            <Checkbox disabled={getSpecialDietDisabled()} label="Dairy products" />
          </div>
          <Checkbox
            required
            label={
              <>
                I accept the <a href="#">terms and conditions</a>.
              </>
            }
          />

          <Button type="submit">Submit</Button>
        </form>
      ) : (
        <p id="formSubmittedText" tabIndex={-1}>
          The form would have been submitted.
        </p>
      )}
    </Scenario>
  );
};
```

### Questionnaire About Transportation Radios

```tsx
import * as React from 'react';

import { Button, Label, RadioGroup, Radio, RadioGroupOnChangeData } from '@fluentui/react-components';

export const QuestionnaireAboutTransportationRadios: React.FunctionComponent = () => {
  const [isDrivingAllowed, setIsDrivingAllowed] = React.useState(true);
  const [isMotor, setIsMotor] = React.useState(false);
  const [preferredMeans, setPreferredMeans] = React.useState('bicycle');
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const onAgeChange = (event: React.BaseSyntheticEvent, data: RadioGroupOnChangeData) => {
    if (data.value === 'ageClass1') {
      setIsDrivingAllowed(false);
      if (['car', 'motorbike'].includes(preferredMeans)) {
        setPreferredMeans('bicycle');
      }
    } else {
      setIsDrivingAllowed(true);
    }
  };

  const onPreferredMeansChange = (event: React.BaseSyntheticEvent, data: RadioGroupOnChangeData) => {
    setPreferredMeans(data.value);
    setIsMotor(['car', 'motorbike'].includes(data.value));
  };

  React.useEffect(() => {
    if (isSubmitted) {
      document.getElementById('formSubmittedText')?.focus();
    }
  }, [isSubmitted]);

  const onSubmit = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <Scenario pageTitle="Radio groups in questionnaire about transportation">
      <h1>Questionnaire about transportation</h1>
      {!isSubmitted ? (
        <form onSubmit={onSubmit}>
          <Label id="ageLabel">Your age:</Label>
          <RadioGroup defaultValue="ageClass2" onChange={onAgeChange} aria-labelledby="ageLabel">
            <Radio value="ageClass1" label="Under 16" />
            <Radio value="ageClass2" label="Between 16 and 50" />
            <Radio value="ageClass3" label="Over 50" />
          </RadioGroup>

          <Label id="preferredMeansLabel">The most preferred transportation means as a driver/rider:</Label>
          <RadioGroup value={preferredMeans} onChange={onPreferredMeansChange} aria-labelledby="preferredMeansLabel">
            <Radio value="bicycle" label="Bicycle" />
            <Radio value="scooter" label="Scooter" />
            <Radio value="rollerSkates" label="Roller-skates" />
            <Radio value="car" disabled={!isDrivingAllowed} label="Car" />
            <Radio value="motorbike" disabled={!isDrivingAllowed} label="Motorbike" />
          </RadioGroup>

          <Label id="preferredTypeLabel">The most preferred type of motor vehicle:</Label>
          <RadioGroup defaultValue="gasoline" disabled={!isMotor} aria-labelledby="preferredTypeLabel">
            <Radio value="gasoline" label="Gasoline" />
            <Radio value="diesel" label="Diesel" />
            <Radio value="electric" label="Electric" />
          </RadioGroup>

          <Button type="submit">Submit</Button>
        </form>
      ) : (
        <p id="formSubmittedText" tabIndex={-1}>
          The form would have been submitted.
        </p>
      )}
    </Scenario>
  );
};
```

### Site Navigation Links

```tsx
import * as React from 'react';

import { Link } from '@fluentui/react-components';

export const SiteNavigationLinks: React.FunctionComponent = () => {
  return (
    <Scenario pageTitle="Site navigation links">
      <nav aria-label="Main menu">
        <ul>
          <li>
            <Link href="https://www.microsoft.com" target="_blank">
              Microsoft
            </Link>
          </li>
          <li>
            <Link href="https://www.office.com" target="_blank">
              Microsoft Office
            </Link>
          </li>
          <li>
            <Link href="https://www.github.com" target="_blank">
              GitHub
            </Link>
          </li>
          <li>
            <Link href="https://www.linkedin.com" target="_blank">
              LinkedIn
            </Link>
          </li>
          <li>
            <Link href="https://www.skype.com" target="_blank" disabled>
              Skype
            </Link>
          </li>
          <li>
            <Link href="https://www.bing.com" target="_blank" disabledFocusable>
              Bing
            </Link>
          </li>
        </ul>
      </nav>
    </Scenario>
  );
};
```

### Sound Control Sliders

```tsx
import * as React from 'react';

import { Label, Slider } from '@fluentui/react-components';

export const SoundControlSliders: React.FunctionComponent = () => {
  return (
    <Scenario pageTitle="Sound control sliders">
      <h1>Sound control panel</h1>

      <Label htmlFor="volume">Volume:</Label>
      <Slider id="volume" defaultValue={30} />

      <Label htmlFor="bass">Bass:</Label>
      <Slider id="bass" defaultValue={5} min={0} max={10} vertical />

      <Label htmlFor="treble">Treble:</Label>
      <Slider id="treble" defaultValue={5} min={0} max={10} vertical />
    </Scenario>
  );
};
```

### Ticket Order Form Inputs

```tsx
import * as React from 'react';

import { Button, Checkbox, Input, Label } from '@fluentui/react-components';

import { useForm, Controller, OnSubmit } from 'react-hook-form';
import { usePubSub, PubSubProvider as _PubSubProvider, Handler } from '@cactuslab/usepubsub';

// '@cactuslab/usepubsub' doesn't ship React 18 compatible types
const PubSubProvider = _PubSubProvider as React.FC<
  React.PropsWithChildren<React.ComponentProps<typeof _PubSubProvider>>
>;

const regexes = {
  onlyNameChars: /^[A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ -]*$/,
  startsAndEndsWithLetter:
    /^(([A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ][A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ -]*[A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ])|[A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ])?$/,
  noWhitespace: /^\S*$/,
  hasNumber: /^\S*[0-9]\S*$/,
  hasLowercaseLetter: /^\S*[a-z]\S*$/,
  hasUppercaseLetter: /^\S*[A-Z]\S*$/,
  hasSpecialChar: /^\S*[^0-9a-zA-ZÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ\s]\S*$/,
  validDate: /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/,
  validEmail:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
};

const generateTicketNumber = (): string => {
  let char;
  let hash = 0;
  const random = Math.random().toString();
  for (let i = 0; i < random.length; i++) {
    char = random.charCodeAt(i);
    //eslint-disable-next-line no-bitwise
    hash = (hash << 5) - hash + char;
    //eslint-disable-next-line no-bitwise
    hash |= 0; // Convert to 32bit integer
  }
  hash += 2147483647; // Convert to positive integer
  return hash.toString().padStart(8, '0').substring(2);
};

let isSubmitting = false;

interface FormInputs {
  fullName: string;
  nickname: string;
  password: string;
  birthDate: string;
  email: string;
}

interface FormValidation {
  subscribe: (channel: string, handler: Handler) => () => void;
  unsubscribe: (channel: string, handler: Handler) => void;
}

interface ValidationMessageProps {
  id: string;
  formValidation: FormValidation;
  children: React.ReactNode;
}
const ValidationMessage: React.FC<ValidationMessageProps> = ({ id, formValidation, children }) => {
  const [isAlerting, setIsAlerting] = React.useState(true);

  const alert = React.useCallback(() => {
    setIsAlerting(false);
    setTimeout(() => setIsAlerting(true), 200);
  }, [setIsAlerting]);

  React.useEffect(() => {
    formValidation.subscribe(id, alert);
    return () => formValidation.unsubscribe(id, alert);
  }, [formValidation, alert, id]);
  return (
    <>
      {isAlerting ? (
        <div role="alert" style={{ color: 'red' }} id={`${id}Errors`}>
          {children}
        </div>
      ) : (
        <div style={{ color: 'green' }} id={`${id}Errors`}>
          {children}
        </div>
      )}
    </>
  );
};

const useFormValidation = (
  handleSubmit: (callback: OnSubmit<FormInputs>) => (e?: React.BaseSyntheticEvent) => Promise<void>,
) => {
  const pubSub = usePubSub();
  const isHandlingSubmit = React.useRef(false);

  const wrappedHandleSubmit = React.useCallback(
    (callback: OnSubmit<FormInputs>) => {
      const handler = handleSubmit(callback);
      return async (e: React.BaseSyntheticEvent) => {
        isHandlingSubmit.current = true;
        const result = await handler(e);
        isHandlingSubmit.current = false;
        return result;
      };
    },
    [isHandlingSubmit, handleSubmit],
  );

  const onFieldValidated = React.useCallback(
    (field: string) => {
      if (!isHandlingSubmit.current) {
        pubSub.publish(field, 'validate');
      }
      return true;
    },
    [isHandlingSubmit, pubSub],
  );

  const notifyFormFieldError = React.useCallback(
    (field: string) => {
      pubSub.publish(field, 'validate');
      return true;
    },
    [pubSub],
  );

  return {
    subscribe: pubSub.subscribe,
    unsubscribe: pubSub.unsubscribe,
    onFieldValidated,
    handleSubmit: wrappedHandleSubmit,
    notifyFormFieldError,
  };
};

const TicketOrderFormInputsAccessibility = () => {
  const { control, handleSubmit, errors, formState, unregister } = useForm<FormInputs>({
    validateCriteriaMode: 'all',
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const formValidation = useFormValidation(handleSubmit);

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isSendNewsletter, setIsSendNewsletter] = React.useState(false);
  const [isSubmittedAndValid, setIsSubmittedAndValid] = React.useState(false);

  React.useEffect(() => {
    if (formState.isSubmitting) {
      isSubmitting = true;
    }
  }, [formState]);

  React.useEffect(() => {
    // If the form is submitting and has errors, focus the first error fiel, otherwise do nothing
    if (!isSubmitting || !formState.isSubmitted || formState.isValid) {
      return;
    }
    isSubmitting = false;

    const firstErrorName = Object.keys(errors)[0] as keyof FormInputs;
    const firstErrorField = document.getElementById(firstErrorName);
    if (firstErrorField) {
      setTimeout(() => firstErrorField.focus(), 500);
    }
  }, [errors, formState, formValidation]);

  React.useEffect(() => {
    if (isSubmittedAndValid) {
      document.getElementById('validMessage')?.focus();
    }
  }, [isSubmittedAndValid]);

  const onSubmit = (data: FormInputs, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault();
    if (formState.isValid) {
      setIsSubmittedAndValid(true);
    }
  };

  const onShowPasswordChange = (event: React.ChangeEvent) => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSendNewsletterChange = (event: React.ChangeEvent) => {
    unregister('email');
    setIsSendNewsletter(!isSendNewsletter);
  };

  return (
    <Scenario pageTitle="Ticket order form inputs">
      <h1>Ticket order form</h1>
      {!isSubmittedAndValid ? (
        <>
          <p>Please fill the following form to order your ticket.</p>
          <form onSubmit={formValidation.handleSubmit(onSubmit)}>
            <Label htmlFor="ticketNumber">Your ticket number:</Label>
            <Input
              type="text"
              id="ticketNumber"
              value={generateTicketNumber()}
              readOnly
              aria-describedby="ticketNumberHint"
            />

            <p id="ticketNumberHint">Please remember the ticket number. You will need it for identification.</p>

            <Label htmlFor="fullName">Full name:</Label>
            <Controller
              name="fullName"
              control={control}
              as={
                <Input
                  type="text"
                  id="fullName"
                  aria-required="true"
                  aria-invalid={!!errors.fullName}
                  aria-describedby="fullNameErrors"
                />
              }
              rules={{
                required: true,
                minLength: 2,
                maxLength: 50,
                validate: {
                  onlyNameChars: value => regexes.onlyNameChars.test(value),
                  startsAndEndsWithLetter: value => regexes.startsAndEndsWithLetter.test(value),
                  always: () => {
                    if (!formState.isSubmitting) {
                      formValidation.onFieldValidated('fullName');
                    }
                    return true;
                  },
                },
              }}
            />

            {errors.fullName?.types && (
              <ValidationMessage id="fullName" formValidation={formValidation}>
                {'required' in errors.fullName.types ? (
                  <p>Full name is required.</p>
                ) : (
                  <>
                    <p>Full name is invalid. It must:</p>
                    <ul>
                      {('minLength' in errors.fullName.types || 'maxLength' in errors.fullName.types) && (
                        <li>Have between 2 and 50 characters.</li>
                      )}
                      {'onlyNameChars' in errors.fullName.types && (
                        <li>Contain only lowercase or uppercase letters, spaces or hyphens.</li>
                      )}
                      {'startsAndEndsWithLetter' in errors.fullName.types && <li>Start and end wit letter.</li>}
                    </ul>
                  </>
                )}
              </ValidationMessage>
            )}

            <Label htmlFor="nickname">Nickname:</Label>
            <Controller
              name="nickname"
              control={control}
              as={
                <Input type="text" id="nickname" aria-invalid={!!errors.nickname} aria-describedby="nicknameErrors" />
              }
              rules={{
                minLength: 2,
                maxLength: 20,
                validate: {
                  onlyNameChars: value => regexes.onlyNameChars.test(value),
                  startsAndEndsWithLetter: value => regexes.startsAndEndsWithLetter.test(value),
                  always: () => {
                    if (!formState.isSubmitting) {
                      formValidation.onFieldValidated('nickname');
                    }
                    return true;
                  },
                },
              }}
            />

            {errors.nickname?.types && (
              <ValidationMessage id="nickname" formValidation={formValidation}>
                <p>Nickname is invalid. It must:</p>
                <ul>
                  {('minLength' in errors.nickname.types || 'maxLength' in errors.nickname.types) && (
                    <li>Have between 2 and 20 characters.</li>
                  )}
                  {'onlyNameChars' in errors.nickname.types && (
                    <li>Contain only lowercase or uppercase letters, spaces or hyphens.</li>
                  )}
                  {'startsAndEndsWithLetter' in errors.nickname.types && <li>Start and end wit letter.</li>}
                </ul>
              </ValidationMessage>
            )}

            <Label htmlFor="password">Password:</Label>
            <Controller
              name="password"
              control={control}
              as={
                <Input
                  type={isPasswordVisible ? 'text' : 'password'}
                  id="password"
                  aria-required="true"
                  aria-invalid={!!errors.password}
                  aria-describedby="passwordErrors"
                />
              }
              rules={{
                required: true,
                minLength: 8,
                maxLength: 20,
                validate: {
                  hasLowercaseLetter: value => regexes.hasLowercaseLetter.test(value),
                  hasUppercaseLetter: value => regexes.hasUppercaseLetter.test(value),
                  hasNumber: value => regexes.hasNumber.test(value),
                  hasSpecialChar: value => regexes.hasSpecialChar.test(value),
                  noWhitespace: value => regexes.noWhitespace.test(value),
                  always: () => {
                    if (!formState.isSubmitting) {
                      formValidation.onFieldValidated('password');
                    }
                    return true;
                  },
                },
              }}
            />

            <Checkbox label="Show password" onChange={onShowPasswordChange} />

            {errors.password?.types && (
              <ValidationMessage id="password" formValidation={formValidation}>
                {'required' in errors.password.types ? (
                  <p>Password is required.</p>
                ) : (
                  <>
                    <p>Password is invalid. It must:</p>
                    <ul>
                      {('minLength' in errors.password.types || 'maxLength' in errors.password.types) && (
                        <li>Have between 8 and 20 characters.</li>
                      )}
                      {('hasLowercaseLetter' in errors.password.types ||
                        'hasUppercaseLetter' in errors.password.types ||
                        'hasSpecialChar' in errors.password.types ||
                        'hasNumber' in errors.password.types ||
                        'noWhiteSpace' in errors.password.types) && (
                        <li>
                          Contain at least one lower case letter, upper case letter, number, special character and no
                          spaces.
                        </li>
                      )}
                    </ul>
                  </>
                )}
              </ValidationMessage>
            )}

            <Label htmlFor="birthDate">Birth date:</Label>
            <Controller
              name="birthDate"
              control={control}
              as={
                <Input
                  type="text"
                  id="birthDate"
                  placeholder="E.g. 3/21/1995"
                  aria-required="true"
                  aria-invalid={!!errors.birthDate}
                  aria-describedby="birthDateErrors"
                />
              }
              rules={{
                required: true,
                validate: {
                  validDate: value => regexes.validDate.test(value),
                  always: () => {
                    if (!formState.isSubmitting) {
                      formValidation.onFieldValidated('birthDate');
                    }
                    return true;
                  },
                },
              }}
            />

            {errors.birthDate?.types && (
              <ValidationMessage id="birthDate" formValidation={formValidation}>
                {'required' in errors.birthDate.types ? (
                  <p>Birth date is required.</p>
                ) : (
                  <>
                    <p>Birth date is invalid. It must:</p>
                    <ul>{'validDate' in errors.birthDate.types && <li>Be in the MM/DD/YYYY format.</li>}</ul>
                  </>
                )}
              </ValidationMessage>
            )}

            <Checkbox label="Send me newsletter" onChange={onSendNewsletterChange} />

            <Label htmlFor="email">E-mail:</Label>
            <Controller
              name="email"
              control={control}
              as={
                <Input
                  type="text"
                  id="email"
                  disabled={!isSendNewsletter}
                  aria-required={isSendNewsletter}
                  aria-invalid={!!errors.email}
                  aria-describedby="emailErrors"
                />
              }
              rules={{
                required: isSendNewsletter,
                validate: {
                  validEmail: value => !isSendNewsletter || regexes.validEmail.test(value),
                  always: () => {
                    if (!formState.isSubmitting) {
                      formValidation.onFieldValidated('email');
                    }
                    return true;
                  },
                },
              }}
            />

            {errors.email?.types && (
              <ValidationMessage id="email" formValidation={formValidation}>
                {'required' in errors.email.types ? (
                  <p>E-mail is required.</p>
                ) : (
                  <>
                    <p>E-mail is invalid. It must:</p>
                    <ul>
                      {'validEmail' in errors.email.types && <li>Be a valid e-mail address, like name@example.com.</li>}
                    </ul>
                  </>
                )}
              </ValidationMessage>
            )}

            <Button type="submit">Order ticket</Button>
          </form>
        </>
      ) : (
        <p id="validMessage" role="alert" tabIndex={-1}>
          The form is valid and would have been submitted.
        </p>
      )}
    </Scenario>
  );
};

export const TicketOrderFormInputs = () => (
  <PubSubProvider>
    <TicketOrderFormInputsAccessibility />
  </PubSubProvider>
);
```
