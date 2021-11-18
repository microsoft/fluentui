import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Divider } from '@fluentui/react-divider';
import { TestWrapperDecorator } from '../utilities/TestWrapperDecorator';

storiesOf('Divider Converged', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <Screener steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </Screener>
  ))
  .addStory(
    'Horizontal without content',
    () => (
      <div style={{ width: '200px' }}>
        <Divider />
      </div>
    ),
    { includeRtl: true },
  )
  .addStory(
    'Horizontal with content',
    () => (
      <div style={{ width: '200px' }}>
        <Divider>Today</Divider>
      </div>
    ),
    { includeRtl: true, includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Horizontal Start Aligned',
    () => (
      <div style={{ width: '200px' }}>
        <Divider alignContent="start">Today</Divider>
      </div>
    ),
    { includeRtl: true },
  )
  .addStory(
    'Horizontal End Aligned',
    () => (
      <div style={{ width: '200px' }}>
        <Divider alignContent="end">Today</Divider>
      </div>
    ),
    { includeRtl: true },
  )
  .addStory('Vertical Center Aligned', () => (
    <div style={{ height: '200px' }}>
      <Divider vertical>Today</Divider>
    </div>
  ))
  .addStory('Vertical Start Aligned', () => (
    <div style={{ height: '200px' }}>
      <Divider vertical alignContent="start">
        Today
      </Divider>
    </div>
  ))
  .addStory('Vertical End Aligned', () => (
    <div style={{ height: '200px' }}>
      <Divider vertical alignContent="end">
        Today
      </Divider>
    </div>
  ))
  .addStory(
    'Appearance subtle',
    () => (
      <div style={{ width: '200px' }}>
        <Divider appearance="subtle">Today</Divider>
      </div>
    ),
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Appearance strong',
    () => (
      <div style={{ width: '200px' }}>
        <Divider appearance="strong">Today</Divider>
      </div>
    ),
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Appearance brand',
    () => (
      <div style={{ width: '200px' }}>
        <Divider appearance="brand">Today</Divider>
      </div>
    ),
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory('Inset', () => (
    <div style={{ width: '200px' }}>
      <Divider inset>Today</Divider>
    </div>
  ))
  .addStory('Vertical inset', () => (
    <div style={{ height: '200px' }}>
      <Divider inset vertical>
        Today
      </Divider>
    </div>
  ));
