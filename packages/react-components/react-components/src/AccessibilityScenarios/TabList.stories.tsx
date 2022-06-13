import * as React from 'react';

import { TabList, Tab, TabValue, SelectTabEvent, SelectTabData } from '@fluentui/react-components';
import { Label } from '@fluentui/react-label';
import { Checkbox } from '@fluentui/react-checkbox';
import { RadioGroup, Radio } from '@fluentui/react-components';
import { Textarea } from '@fluentui/react-textarea';

import { Scenario } from './utils';

export const MailSettingsHorizontalTabListAccessibilityScenario: React.FunctionComponent = () => {
  const [tabSelectedValue, setTabSelectedValue] = React.useState<TabValue>('general');

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setTabSelectedValue(data.value);
  };

  const GeneralPanel = React.memo(() => (
    <div role="tabpanel" aria-labelledby="generalTab">
      <Checkbox label="Run app at startup" />

      <Checkbox label="Enable spell-check" />

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

      <Label id="fontsizeLabel">Font size:</Label>
      <RadioGroup defaultValue="medium" aria-labelledby="fontSizeLabel">
        <Radio value="small" label="Small" />
        <Radio value="medium" label="Medium" />
        <Radio value="large" label="Large" />
      </RadioGroup>
      <Checkbox defaultChecked={true} label="Show message preview pane" />
    </div>
  ));

  const NotificationsPanel = React.memo(() => (
    <div role="tabpanel" aria-labelledby="notificationsTab">
      <Checkbox label="Disable all notifications" />
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
    <Scenario pageTitle="Mail settings with horizontal tabs">
      <h1>Settings</h1>
      <TabList selectedValue={tabSelectedValue} onTabSelect={onTabSelect}>
        <Tab id="generalTab" value="general">
          General
        </Tab>
        <Tab id="appearanceTab" value="appearance">
          Appearance
        </Tab>
        <Tab id="notificationsTab" value="notifications">
          Notifications
        </Tab>
        <Tab id="advancedTab" value="advanced" disabled>
          Advanced
        </Tab>
        <Tab id="aboutTab" value="about">
          About
        </Tab>

        {tabSelectedValue === 'general' && <GeneralPanel />}
        {tabSelectedValue === 'appearance' && <AppearancePanel />}
        {tabSelectedValue === 'notifications' && <NotificationsPanel />}
        {tabSelectedValue === 'about' && <AboutPanel />}
      </TabList>
    </Scenario>
  );
};

export default {
  title: 'Accessibility Scenarios / Mail settings with horizontal tabs',
  id: 'tablist-accessibility-scenario',
};
