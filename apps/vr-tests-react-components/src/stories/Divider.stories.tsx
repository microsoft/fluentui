import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Divider, DividerProps } from '@fluentui/react-divider';
import { TestWrapperDecoratorFixedWidth } from '../utilities/index';

storiesOf('Divider Converged - Horizontal', module)
  .addDecorator(TestWrapperDecoratorFixedWidth)
  .addDecorator(story => (
    <Screener steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>
  ))
  .addStory(
    'Align content',
    () => (
      <>
        <h3>Horizontal</h3>
        <Divider alignContent="start">Start</Divider>
        <Divider alignContent="center">Center</Divider>
        <Divider alignContent="end">End</Divider>
        <h3>Vertical</h3>
        <div style={{ display: 'flex', height: 150 }}>
          <Divider vertical alignContent="start">
            Start
          </Divider>
          <Divider vertical alignContent="center">
            Center
          </Divider>
          <Divider vertical alignContent="end">
            End
          </Divider>
        </div>
      </>
    ),
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory(
    'Appearance',
    () => {
      const appearances: DividerProps['appearance'][] = ['subtle', 'strong', 'brand'];
      const horizontal = appearances.map(appearance => (
        <Divider key={appearance} appearance={appearance}>
          Divider
        </Divider>
      ));
      const vertical = appearances.map(appearance => (
        <Divider vertical key={appearance} appearance={appearance}>
          Divider
        </Divider>
      ));

      return (
        <>
          <h3>Horizontal</h3>
          <div style={{ gap: 10, display: 'flex', flexDirection: 'column' }}>{horizontal}</div>
          <h3>Vertical</h3>
          <div style={{ gap: 10, display: 'flex', height: 150 }}>{vertical}</div>
        </>
      );
    },
    { includeDarkMode: true, includeHighContrast: true, includeRtl: true },
  )
  .addStory('Inset', () => (
    <>
      <div style={{ border: '1px dashed gray', padding: 20 }}>
        <Divider inset>Horizontal</Divider>
      </div>
      <div style={{ border: '1px dashed gray', height: 150, padding: 20, display: 'flex' }}>
        <Divider vertical inset>
          Vertical
        </Divider>
      </div>
    </>
  ));
