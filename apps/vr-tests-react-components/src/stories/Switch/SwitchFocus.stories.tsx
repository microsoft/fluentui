import * as React from 'react';
import { Switch } from '@fluentui/react-switch';
import type { Meta } from '@storybook/react-webpack5';
import { Steps, type StoryParameters } from 'storywright';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST } from '../../utilities';

/**
 * Focus-visible coverage for Switch (perf-property-remedy.md VR gate) — see
 * CheckboxFocus.stories.tsx for the rationale and the focus-forcing pattern.
 */

const wrapId = 'switch-wrap';
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
  title: 'Switch Converged - Focus',
  component: Switch,
} satisfies Meta<typeof Switch>;

export const UncheckedFocused = () => (
  <div id={wrapId}>
    <Switch label="Focused switch" />
  </div>
);
UncheckedFocused.parameters = storyWright;

export const UncheckedFocusedDarkMode = getStoryVariant(UncheckedFocused, DARK_MODE);
export const UncheckedFocusedHighContrast = getStoryVariant(UncheckedFocused, HIGH_CONTRAST);

export const CheckedFocused = () => (
  <div id={wrapId}>
    <Switch label="Focused switch" defaultChecked />
  </div>
);
CheckedFocused.parameters = storyWright;
