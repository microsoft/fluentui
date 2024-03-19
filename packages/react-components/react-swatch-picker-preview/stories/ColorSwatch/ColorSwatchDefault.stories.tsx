import * as React from 'react';
import { ColorSwatch } from '@fluentui/react-swatch-picker-preview';

export const Default = () => (
  <>
    <ColorSwatch color="purple" value="purple-color" aria-label="Purple" />
    <ColorSwatch color="#E3008C" value="hot-pink-color" aria-label="Hot pink" />
    <ColorSwatch color="linear-gradient(0deg, #E3008C, #fff232)" value="gradient" aria-label="Gradient yellow pink" />
  </>
);
