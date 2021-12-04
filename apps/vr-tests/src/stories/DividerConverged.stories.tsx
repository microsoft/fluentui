import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Divider } from '@fluentui/react-divider';

const HorizontalWrapper: React.FC = props => (
  <div className="testWrapper" style={{ display: 'flex', padding: '10px', width: '300px' }}>
    {props.children}
  </div>
);

const VerticalWrapper: React.FC = props => (
  <div className="testWrapper" style={{ display: 'flex', padding: '10px', height: '200px' }}>
    {props.children}
  </div>
);

storiesOf('Divider Converged', module)
  .addDecorator(story => (
    <Screener steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </Screener>
  ))
  .addStory(
    'Horizontal without content',
    () => (
      <HorizontalWrapper>
        <Divider />
      </HorizontalWrapper>
    ),
    { includeRtl: true },
  )
  .addStory(
    'Horizontal with content',
    () => (
      <HorizontalWrapper>
        <Divider>Today</Divider>
      </HorizontalWrapper>
    ),
    { includeRtl: true, includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Horizontal Start Aligned',
    () => (
      <HorizontalWrapper>
        <Divider alignContent="start">Today</Divider>
      </HorizontalWrapper>
    ),
    { includeRtl: true },
  )
  .addStory(
    'Horizontal End Aligned',
    () => (
      <HorizontalWrapper>
        <Divider alignContent="end">Today</Divider>
      </HorizontalWrapper>
    ),
    { includeRtl: true },
  )
  .addStory('Vertical Center Aligned', () => (
    <VerticalWrapper>
      <Divider vertical>Today</Divider>
    </VerticalWrapper>
  ))
  .addStory('Vertical Start Aligned', () => (
    <VerticalWrapper>
      <Divider vertical alignContent="start">
        Today
      </Divider>
    </VerticalWrapper>
  ))
  .addStory('Vertical End Aligned', () => (
    <VerticalWrapper>
      <Divider vertical alignContent="end">
        Today
      </Divider>
    </VerticalWrapper>
  ))
  .addStory(
    'Appearance subtle',
    () => (
      <HorizontalWrapper>
        <Divider appearance="subtle">Today</Divider>
      </HorizontalWrapper>
    ),
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Appearance strong',
    () => (
      <HorizontalWrapper>
        <Divider appearance="strong">Today</Divider>
      </HorizontalWrapper>
    ),
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory(
    'Appearance brand',
    () => (
      <HorizontalWrapper>
        <Divider appearance="brand">Today</Divider>
      </HorizontalWrapper>
    ),
    { includeHighContrast: true, includeDarkMode: true },
  )
  .addStory('Inset', () => (
    <HorizontalWrapper>
      <Divider inset>Today</Divider>
    </HorizontalWrapper>
  ))
  .addStory('Vertical inset', () => (
    <VerticalWrapper>
      <Divider inset vertical>
        Today
      </Divider>
    </VerticalWrapper>
  ));
