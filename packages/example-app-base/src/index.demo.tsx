import * as React from 'react';
import { createApp } from './utilities/createApp';
import { examplesOf } from './utilities/examplesOf';

createApp([
  examplesOf('Example Group')
    .add('Example 1', () => (
      <div>Some content for Example 1</div>
    ))
    .add('Example 2', () => (
      <div>Some content for Example 2</div>
    ))
    .add('Example 3', () => (
      <div>Some content for Example 3</div>
    ))
    .add('Example 4', () => (
      <div>Some content for Example 4</div>
    ))
],
  () => <div>Example App Home</div>,
  'Example App');
