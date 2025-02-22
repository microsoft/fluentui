import * as React from 'react';
import { ColorPicker, ColorArea, ColorSlider, AlphaSlider } from '@fluentui/react-color-picker-preview';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

const Scenario = () => (
  <ColorPicker color={{ h: 109, s: 1, v: 0.91 }}>
    <ColorArea />
    <ColorSlider />
    <AlphaSlider />
  </ColorPicker>
);

Scenario.decorator = (props: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{props.children}</FluentProvider>
);

export default Scenario;
