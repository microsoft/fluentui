import * as React from 'react';
import { Button, CompoundButton, MenuButton, ToggleButton } from '@fluentui/react-button';
import type { Meta } from '@storybook/react-webpack5';
import { Steps, type StoryParameters } from 'storywright';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST, RTL } from '../../utilities';

/**
 * Focus-visible coverage for the Button family (perf-property-remedy.md VR gate).
 *
 * The focus ring is drawn by the shared `fui-focus-ring` utility, parameterised by the
 * `--fui-focus-ring-*` knobs (react-tailwind-theme/css/utilities.css). These states had
 * no VR coverage; they gate any change to the knob isolation mechanism (formerly
 * `@property … inherits:false` registrations, now element-level `initial` resets).
 *
 * Focus is forced the same way the established Tag/Link stories do: set keyborg's
 * `data-fui-focus-visible` attribute, then focus the element.
 */

const buttonId = 'button-id';
const steps = new Steps()
  .executeScript(`document.getElementById('${buttonId}').setAttribute('data-fui-focus-visible', '')`)
  .focus(`#${buttonId}`)
  .snapshot('focused')
  .executeScript(`document.getElementById('${buttonId}').removeAttribute('data-fui-focus-visible')`)
  .end();
const storyWright: StoryParameters = { storyWright: { steps } };

export default {
  title: 'Button Converged - Focus',
  component: Button,
} satisfies Meta<typeof Button>;

export const Default = () => <Button id={buttonId}>Focused button</Button>;
Default.parameters = storyWright;

export const DefaultDarkMode = getStoryVariant(Default, DARK_MODE);
export const DefaultHighContrast = getStoryVariant(Default, HIGH_CONTRAST);
export const DefaultRTL = getStoryVariant(Default, RTL);

export const Primary = () => (
  <Button id={buttonId} appearance="primary">
    Focused button
  </Button>
);
Primary.parameters = storyWright;

export const Outline = () => (
  <Button id={buttonId} appearance="outline">
    Focused button
  </Button>
);
Outline.parameters = storyWright;

export const Subtle = () => (
  <Button id={buttonId} appearance="subtle">
    Focused button
  </Button>
);
Subtle.parameters = storyWright;

export const Compound = () => (
  <CompoundButton id={buttonId} secondaryContent="Secondary content">
    Focused button
  </CompoundButton>
);
Compound.parameters = storyWright;

export const Menu = () => <MenuButton id={buttonId}>Focused button</MenuButton>;
Menu.parameters = storyWright;

export const Toggle = () => (
  <ToggleButton id={buttonId} checked>
    Focused button
  </ToggleButton>
);
Toggle.parameters = storyWright;
