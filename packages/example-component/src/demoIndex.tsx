import * as React from 'react';
import { examplesOf, createApp } from '@uifabric/example-app-base';
import { ExampleComponent } from './ExampleComponent';
import { ExampleComponentPage } from './ExampleComponentPage';

createApp([
  examplesOf('Documentation')
    .add('Component docs', () => <ExampleComponentPage />),

  examplesOf('ExampleComponent examples')
    .add('Empty state', () => (
      <ExampleComponent />
    ))
    .add('With text', () => (
      <ExampleComponent text='I am text' />
    ))
    .add('With text and children', () => (
      <ExampleComponent>
        <div>I am a div</div>
        <div>I am another div</div>
      </ExampleComponent>
    ))
    .add('With a red background', () => (
      <ExampleComponent style={ { background: 'red' } } />
    ))

]);
