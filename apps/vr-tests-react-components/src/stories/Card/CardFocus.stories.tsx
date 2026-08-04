import * as React from 'react';
import { Card } from '@fluentui/react-card';
import { Button } from '@fluentui/react-button';
import type { Meta } from '@storybook/react-webpack5';
import { Steps, type StoryParameters } from 'storywright';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST } from '../../utilities';

/**
 * Focus-visible coverage for Card (perf-property-remedy.md VR gate). Card is the main
 * in-repo consumer of the `--fui-focus-outline-*` knob OVERRIDE path: its focus ring is
 * `fui-focus-outline` with width/radius/offset overridden on `::after`
 * (Card.module.css). `NestedButtonFocused` additionally proves a focused Button INSIDE
 * a focus-styled Card renders its own untouched ring (knob isolation across nesting).
 */

const wrapId = 'card-wrap';
const cardFocusSteps = new Steps()
  .executeScript(
    `(function () {
      var w = document.getElementById('${wrapId}');
      var root = w.querySelector(':scope > :not(i)');
      root.setAttribute('data-fui-focus-visible', '');
      root.focus();
    })()`,
  )
  .snapshot('focused')
  .executeScript(
    `document.getElementById('${wrapId}').querySelector(':scope > :not(i)').removeAttribute('data-fui-focus-visible')`,
  )
  .end();
const cardStoryWright: StoryParameters = { storyWright: { steps: cardFocusSteps } };

const nestedButtonSteps = new Steps()
  .executeScript(
    `(function () {
      var el = document.getElementById('${wrapId}').querySelector('button');
      el.setAttribute('data-fui-focus-visible', '');
      el.focus();
    })()`,
  )
  .snapshot('focused')
  .executeScript(
    `document.getElementById('${wrapId}').querySelector('button').removeAttribute('data-fui-focus-visible')`,
  )
  .end();
const nestedStoryWright: StoryParameters = { storyWright: { steps: nestedButtonSteps } };

export default {
  title: 'Card Converged - Focus',
  component: Card,
} satisfies Meta<typeof Card>;

export const Focused = () => (
  <div id={wrapId}>
    <Card>Focused card</Card>
  </div>
);
Focused.parameters = cardStoryWright;

export const FocusedDarkMode = getStoryVariant(Focused, DARK_MODE);
export const FocusedHighContrast = getStoryVariant(Focused, HIGH_CONTRAST);

export const NestedButtonFocused = () => (
  <div id={wrapId}>
    <Card>
      <Button>Focused nested button</Button>
    </Card>
  </div>
);
NestedButtonFocused.parameters = nestedStoryWright;
