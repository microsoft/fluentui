import * as React from 'react';

import { ToggleButton } from '@fluentui/react-button';

import { Scenario } from './utils';

export const DeviceControlsToggleButtonsAccessibilityScenario: React.FunctionComponent = () => {
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

export default {
  title: 'Accessibility Scenarios/ Device controls toggle buttons',
  id: 'toggle-button-accessibility-scenario',
};
