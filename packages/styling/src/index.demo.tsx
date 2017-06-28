import * as React from 'react';
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
import { ColorPage } from './examples/ColorPage/ColorPage';
import { FontPage } from './examples/FontPage/FontPage';
import { IconPage } from './examples/IconPage/IconPage';
import { AnimationPage } from './examples/AnimationPage/AnimationPage';

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
]);
