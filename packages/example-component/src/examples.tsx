import * as React from 'react';
//import { examplesOf } from '@uifabric/example-app-base';
import { examplesOf } from './base';
import { createApp } from './bootstrap';

import { ExampleComponent } from './ExampleComponent';
import { ExampleComponentPage } from './documentation/ExampleComponentPage';

createApp([
  examplesOf('ExampleComponent examples')
    .add('Empty state', () => (
      <ExampleComponent />
    ))
    .add('With children', () => (
      <ExampleComponent>
        <div>Hello world!</div>
        <div>How are you?</div>
      </ExampleComponent>
    ))
    .add('With different children', () => (
      <ExampleComponent>
        <div>Hello world!</div>
        <div>How are you?</div>
      </ExampleComponent>
    ))
    .add('Say blah', () => (
      <ExampleComponent>blah</ExampleComponent>
    )),

  examplesOf('Documentation')
    .add('Component docs', () => <ExampleComponentPage />)
], false);
