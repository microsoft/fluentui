import * as React from 'react';
//import { examplesOf } from '@uifabric/example-app-base';
import { examplesOf } from './base';
import { createApp } from './bootstrap';

import { ExampleComponent, PrimaryButton, ThemeZone } from './ExampleComponent';
import { ExampleComponentPage } from './documentation/ExampleComponentPage';

createApp([
  examplesOf('ExampleComponent examples')
    .add('Empty state', () => (
      <ExampleComponent text='I am text' />
    ))
    .add('With children', () => (
      <PrimaryButton iconName="Close" text='hi'>
      </PrimaryButton>
    ))
    .add('With a red background', () => (
      <ThemeZone
        theme={ {
          componentStyles: {
            primaryButton: {
              button: {
                background: 'red'
              },
              buttonHover: {
                background: 'green'
              }
            }
          }
        } }
      >
        <PrimaryButton iconName='Close' text='red hi' />
      </ThemeZone>
    ))
    .add('Say blah', () => (
      <ExampleComponent>blah</ExampleComponent>
    )),

  examplesOf('Documentation')
    .add('Component docs', () => <ExampleComponentPage />)
], false);
