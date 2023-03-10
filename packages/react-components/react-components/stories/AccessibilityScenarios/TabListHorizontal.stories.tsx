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

import { Scenario } from './utils';

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
