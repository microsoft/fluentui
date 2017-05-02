import * as React from 'react';
import * as Glamor from 'glamor';
import './utilities/glamorPlugins';

// Force glamor speedy mode.
// tslint:disable-next-line:no-string-literal
Glamor['speedy'](false);

import { loadTheme } from '@uifabric/styling';

// Example of setting theming overrides!
/*
loadTheme({
  colors: { themePrimary: 'red' },
  fonts: {
    mediumPlus: {
      fontFamily: '"Courier New"',
      fontSize: '14px'
    }
  }
});
*/
import { examplesOf, createApp } from '@uifabric/example-app-base';
import { ColorPage } from './examples/ColorPage';
import { FontPage } from './examples/FontPage';
import { IconPage } from './examples/IconPage';
import { AnimationPage } from './examples/AnimationPage';

createApp([
  examplesOf('Styling')
    .add('Colors', () => (
      <ColorPage />
    ))
    .add('Typography', () => (
      <FontPage />
    ))
    .add('Icons', () => (
      <IconPage />
    ))
    .add('Animations', () => (
      <AnimationPage />
    ))
], false);
