import * as React from 'react';
import { createApp } from './utilities/createApp';
import { examplesOf } from './utilities/examplesOf';
import { Markdown } from './index2';
import { initializeIcons } from '@fluentui/react';

initializeIcons();

createApp(
  [
    examplesOf('Example Group')
      .add('Example 1', () => (
        // eslint-disable-next-line import/no-webpack-loader-syntax
        <Markdown>{require('!raw-loader?esModule=false!@fluentui/react-docsite-components/src/demo/demo.md')}</Markdown>
      ))
      .add('Example 2', () => <div>Some content for Example 2</div>)
      .add('Example 3', () => <div>Some content for Example 3</div>)
      .add('Example 4', () => <div>Some content for Example 4</div>),
  ],
  () => <h1 style={{ padding: '40px' }}>Example App Home</h1>,
  'Example App',
);
