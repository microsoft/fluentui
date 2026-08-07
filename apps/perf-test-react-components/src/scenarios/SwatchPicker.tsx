import * as React from 'react';
import { SwatchPicker, ColorSwatch, ImageSwatch, EmptySwatch } from '@fluentui/react-components';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightThemeClassName } from '@fluentui/react-theme';

const Scenario = () => (
  <SwatchPicker aria-label="SwatchPicker default" defaultSelectedValue="FF1921">
    <ColorSwatch color="#FF1921" value="FF1921" aria-label="red" />
    <ImageSwatch src="path/img.png" value="img" aria-label="img" />
    <EmptySwatch />
  </SwatchPicker>
);

Scenario.decorator = (props: { children: React.ReactNode }) => (
  <FluentProvider themeClassName={webLightThemeClassName}>{props.children}</FluentProvider>
);

export default Scenario;
