import * as React from 'react';
import { Radio } from '@fluentui/react-radio';
import type { Meta } from '@storybook/react-webpack5';
import { Steps, type StoryParameters } from 'storywright';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST } from '../../utilities';

/**
 * Focus-visible coverage for Radio (perf-property-remedy.md VR gate) — see
 * CheckboxFocus.stories.tsx for the rationale and the focus-forcing pattern.
 */

const wrapId = 'radio-wrap';
const steps = new Steps()
  .executeScript(
    `(function () {
      var w = document.getElementById('${wrapId}');
      w.firstElementChild.setAttribute('data-fui-focus-visible', '');
      var f = w.querySelector('input');
      if (f) { f.focus(); }
    })()`,
  )
  .snapshot('focused')
  .executeScript(`document.getElementById('${wrapId}').firstElementChild.removeAttribute('data-fui-focus-visible')`)
  .end();
const storyWright: StoryParameters = { storyWright: { steps } };

export default {
  title: 'Radio Converged - Focus',
  component: Radio,
} satisfies Meta<typeof Radio>;

export const UncheckedFocused = () => (
  <div id={wrapId}>
    <Radio label="Focused radio" />
  </div>
);
UncheckedFocused.parameters = storyWright;

export const UncheckedFocusedDarkMode = getStoryVariant(UncheckedFocused, DARK_MODE);
export const UncheckedFocusedHighContrast = getStoryVariant(UncheckedFocused, HIGH_CONTRAST);

export const CheckedFocused = () => (
  <div id={wrapId}>
    <Radio label="Focused radio" defaultChecked />
  </div>
);
CheckedFocused.parameters = storyWright;
