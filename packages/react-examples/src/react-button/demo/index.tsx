import * as React from 'react';
import * as path from 'path';
import { createApp, Markdown, examplesOf } from '@fluentui/react-docsite-components';
import { ThemeProvider } from '@fluentui/react-theme-provider/lib/compat/index';
import '@fluentui/ie11-polyfills';

const req = require.context('../', true, /\.stories\.tsx$/, 'sync');

const exampleWithTheme = (example: () => JSX.Element) => () => <ThemeProvider>{example()}</ThemeProvider>;

createApp(
  // List of examples
  req.keys().map(key => {
    const storiesModule = req(key);
    const exampleGroup = examplesOf(path.basename(key, '.stories.tsx'));
    for (const exampleName of Object.keys(storiesModule)) {
      exampleGroup.add(exampleName, exampleWithTheme(storiesModule[exampleName]));
    }
    return exampleGroup;
  }),
  // Intro page
  () => (
    <div style={{ marginTop: -20, padding: 40 }}>
      <Markdown>{require<string>('!raw-loader?esModule=false!@fluentui/react-button/README.md')}</Markdown>
    </div>
  ),
  'React Button Examples',
);
