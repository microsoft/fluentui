import * as React from 'react';

import { Slider } from '@fluentui/react-slider';
import { Label } from '@fluentui/react-label';

import { Scenario } from './utils';

export const SoundControlSlidersAccessibilityScenario: React.FunctionComponent = () => {
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

export default {
  title: 'Accessibility Scenarios/ Sound control sliders',
  id: 'slider-accessibility-scenario',
};
