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

import { Scenario } from './utils';

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
  // FIXME: This should be a consistent callback type
  // eslint-disable-next-line @nx/workspace-consistent-callback-type
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
  // FIXME: This should be a consistent callback type
  // eslint-disable-next-line @nx/workspace-consistent-callback-type
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
