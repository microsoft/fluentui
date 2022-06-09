import * as React from 'react';

import { Switch } from '@fluentui/react-switch';

import { Scenario } from './utils';

export const DeviceControlsSwitchAccessibilityScenario: React.FunctionComponent = () => {
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

export default {
  title: 'Accessibility Scenarios/ Device controls switches',
  id: 'switch-accessibility-scenario',
};
