import * as React from 'react';
import { Checkbox } from '@fluentui/react-checkbox';
import type { Meta } from '@storybook/react-webpack5';
import { Steps, type StoryParameters } from 'storywright';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST } from '../../utilities';

/**
 * Focus-visible coverage for Checkbox (perf-property-remedy.md VR gate): the indicator
 * ring comes from the shared focus utilities whose knob isolation mechanism changed
 * from `@property` registrations to element-level resets. Focus is forced via keyborg's
 * attribute on the component root (established Tag/Link pattern).
 */

const wrapId = 'checkbox-wrap';
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
  title: 'Checkbox Converged - Focus',
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export const UncheckedFocused = () => (
  <div id={wrapId}>
    <Checkbox label="Focused checkbox" />
  </div>
);
UncheckedFocused.parameters = storyWright;

export const UncheckedFocusedDarkMode = getStoryVariant(UncheckedFocused, DARK_MODE);
export const UncheckedFocusedHighContrast = getStoryVariant(UncheckedFocused, HIGH_CONTRAST);

export const CheckedFocused = () => (
  <div id={wrapId}>
    <Checkbox label="Focused checkbox" defaultChecked />
  </div>
);
CheckedFocused.parameters = storyWright;
