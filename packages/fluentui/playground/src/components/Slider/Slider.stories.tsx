import React from 'react';
import { Slider } from './Slider';
import { ISliderTokens } from './Slider.tokens';
import { ThemeProvider, ITheme, createTheme } from '@fluentui/react-theming';
import { SliderBase } from './Slider.base';

export default {
  component: 'Slider',
  title: 'Slider',
};

const defaultColorRamp = {
  values: [],
  index: -1,
};

const fluentLight: ITheme = createTheme({
  direction: 'ltr',
  colors: {
    background: 'white',
    bodyText: 'black',
    subText: '#333',
    disabledText: '#ccc',
    brand: defaultColorRamp,
    accent: defaultColorRamp,
    neutral: defaultColorRamp,
    success: defaultColorRamp,
    warning: defaultColorRamp,
    danger: defaultColorRamp,
    text: defaultColorRamp,
  },
  components: {},
  icons: {},
  radius: {
    base: 0,
    scale: 0,
    unit: 'px',
  },
  fonts: {
    default: '',
    userContent: '',
    mono: '',
  },
  fontSizes: {
    base: 0,
    scale: 0,
    unit: 'px',
  },
  animations: {
    fadeIn: {},
    fadeOut: {},
  },
  spacing: {
    base: 0,
    scale: 0,
    unit: 'px',
  },

  schemes: {
    header: {
      colors: {
        background: 'black',
        bodyText: 'white',
      },
    },
  },
});

const teamsLight: ITheme = createTheme(fluentLight, {
  colors: {},
  components: {
    Slider: {
      tokens: {
        railSize: '0.1429rem',
        trackSize: '0.1429rem',
        railColor: 'rgb(225, 223, 221)',
        railColorHovered: { dependsOn: 'railColor' },
        trackColor: 'rgb(98, 100, 167)',
        trackColorHovered: { dependsOn: 'trackColor' },
        thumbSize: '0.7143rem',
        thumbBorderWidth: 0,
        thumbColor: 'rgb(96, 94, 92)',
        thumbSizePressed: '1rem',
      } as ISliderTokens,
    },
  },
});

const Wrapper = (p: React.HTMLAttributes<any>) => <ThemeProvider theme={fluentLight} {...p} />;

export const fluentSlider = () => (
  <ThemeProvider theme={fluentLight}>
    Default (ltr):
    <Slider defaultValue={50} slotProps={{ thumb: { 'aria-label': 'I am a slider' } }} />
    Disabled:
    <Slider disabled defaultValue={50} slotProps={{ thumb: { 'aria-label': 'I am a slider' } }} />
    Header scheme:
    <ThemeProvider scheme="header">
      Default:
      <Slider defaultValue={50} slotProps={{ thumb: { 'aria-label': 'I am a slider' } }} />
      Disabled:
      <Slider disabled defaultValue={50} slotProps={{ thumb: { 'aria-label': 'I am a slider' } }} />
    </ThemeProvider>
  </ThemeProvider>
);

export const fluentSliderDisabled = () => (
  <Wrapper>
    <Slider disabled defaultValue={50} />
  </Wrapper>
);

export const fluentVerticalSlider = () => (
  <Wrapper style={{ display: 'flex', height: 200 }}>
    <Slider vertical defaultValue={50} />
    <Slider vertical defaultValue={50} />
    <Slider vertical defaultValue={50} />
  </Wrapper>
);

export const teamsLightSlider = (p: React.HTMLAttributes<any>) => (
  <ThemeProvider theme={teamsLight}>
    <Slider defaultValue={50} />
  </ThemeProvider>
);

export const aTypicalSlider = () => <SliderBase min={0} max={10} defaultValue={5} />;
