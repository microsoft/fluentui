import * as React from 'react';
import * as path from 'path';
import { createApp, Markdown, examplesOf } from '@uifabric/example-app-base';
import '@fluentui/ie11-custom-properties';

const req = require.context('../components', true, /\.stories\.tsx$/, 'sync');
createApp(
  // List of examples
  req.keys().map(key => {
    const storiesModule = req(key);
    const exampleGroup = examplesOf(path.basename(key, '.stories.tsx'));
    for (const exampleName of Object.keys(storiesModule)) {
      exampleGroup.add(exampleName, storiesModule[exampleName]);
    }
    return exampleGroup;
  }),
  // Intro page
  () => (
    <div style={{ marginTop: -20, padding: 40 }}>
      <Markdown>{require<string>('!raw-loader!../../README.md')}</Markdown>
    </div>
  ),
  'React Button Examples',
);
