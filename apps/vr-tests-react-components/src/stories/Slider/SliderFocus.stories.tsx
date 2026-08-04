import * as React from 'react';
import { Slider } from '@fluentui/react-slider';
import type { Meta } from '@storybook/react-webpack5';
import { Steps, type StoryParameters } from 'storywright';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST } from '../../utilities';

/**
 * Focus coverage for Slider (perf-property-remedy.md VR gate). Slider's indicator uses
 * the `focus-within-fui` variant (`[data-fui-focus-within]:focus-within`), so the step
 * sets keyborg's focus-within attribute on the root AND really focuses the inner input.
 * The thumb ring is `fui-focus-outline` with Slider's `--fui-focus-outline-offset`
 * override on `::after`.
 */

const wrapId = 'slider-wrap';
const steps = new Steps()
  .executeScript(
    `(function () {
      var w = document.getElementById('${wrapId}');
      w.firstElementChild.setAttribute('data-fui-focus-within', '');
      var f = w.querySelector('input');
      if (f) { f.focus(); }
    })()`,
  )
  .snapshot('focused')
  .executeScript(`document.getElementById('${wrapId}').firstElementChild.removeAttribute('data-fui-focus-within')`)
  .end();
const storyWright: StoryParameters = { storyWright: { steps } };

export default {
  title: 'Slider Converged - Focus',
  component: Slider,
} satisfies Meta<typeof Slider>;

export const HorizontalFocused = () => (
  <div id={wrapId}>
    <Slider defaultValue={50} />
  </div>
);
HorizontalFocused.parameters = storyWright;

export const HorizontalFocusedDarkMode = getStoryVariant(HorizontalFocused, DARK_MODE);
export const HorizontalFocusedHighContrast = getStoryVariant(HorizontalFocused, HIGH_CONTRAST);

export const VerticalFocused = () => (
  <div id={wrapId}>
    <Slider defaultValue={50} vertical />
  </div>
);
VerticalFocused.parameters = storyWright;
