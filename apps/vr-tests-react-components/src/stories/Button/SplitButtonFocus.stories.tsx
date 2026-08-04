import * as React from 'react';
import { SplitButton } from '@fluentui/react-button';
import type { Meta } from '@storybook/react-webpack5';
import { Steps, type StoryParameters } from 'storywright';
import { getStoryVariant, DARK_MODE, HIGH_CONTRAST } from '../../utilities';

/**
 * Focus-visible coverage for SplitButton — THE nested-composition case the
 * `--fui-focus-ring-*` knob isolation exists for (perf-property-remedy.md VR gate,
 * utilities.css "Isolation" note): a knob reaching one part must never restyle the
 * other, and a knob set on an ANCESTOR must never leak into either part.
 *
 * `AncestorKnobOverride` wraps the SplitButton in a div that sets ALL 8 focus knobs to
 * garish values. With isolation intact (registered `inherits:false` before, element
 * resets now) the rendered rings are IDENTICAL to the un-wrapped stories — any pixel
 * diff here is a knob leak.
 */

const wrapId = 'splitbutton-wrap';
const focusPart = (index: number) =>
  new Steps()
    .executeScript(
      `(function () {
        var el = document.getElementById('${wrapId}').querySelectorAll('button')[${index}];
        el.setAttribute('data-fui-focus-visible', '');
        el.focus();
      })()`,
    )
    .snapshot('focused')
    .executeScript(
      `(function () {
        var el = document.getElementById('${wrapId}').querySelectorAll('button')[${index}];
        el.removeAttribute('data-fui-focus-visible');
      })()`,
    )
    .end();

const primarySteps: StoryParameters = { storyWright: { steps: focusPart(0) } };
const menuSteps: StoryParameters = { storyWright: { steps: focusPart(1) } };

const ANCESTOR_KNOBS = {
  '--fui-focus-ring-color': 'rgb(255, 0, 0)',
  '--fui-focus-ring-width': '7px',
  '--fui-focus-ring-inset-width': '5px',
  '--fui-focus-ring-radius': '11px',
  '--fui-focus-outline-color': 'rgb(255, 0, 0)',
  '--fui-focus-outline-width': '9px',
  '--fui-focus-outline-offset': '4px',
  '--fui-focus-outline-radius': '13px',
} as React.CSSProperties;

export default {
  title: 'SplitButton Converged - Focus',
  component: SplitButton,
} satisfies Meta<typeof SplitButton>;

export const PrimaryFocused = () => (
  <div id={wrapId}>
    <SplitButton menuButton={{}} primaryActionButton={{}}>
      Focused split button
    </SplitButton>
  </div>
);
PrimaryFocused.parameters = primarySteps;

export const PrimaryFocusedDarkMode = getStoryVariant(PrimaryFocused, DARK_MODE);
export const PrimaryFocusedHighContrast = getStoryVariant(PrimaryFocused, HIGH_CONTRAST);

export const MenuFocused = () => (
  <div id={wrapId}>
    <SplitButton menuButton={{}} primaryActionButton={{}}>
      Focused split button
    </SplitButton>
  </div>
);
MenuFocused.parameters = menuSteps;

export const AncestorKnobOverridePrimaryFocused = () => (
  <div id={wrapId} style={ANCESTOR_KNOBS}>
    <SplitButton menuButton={{}} primaryActionButton={{}}>
      Focused split button
    </SplitButton>
  </div>
);
AncestorKnobOverridePrimaryFocused.parameters = primarySteps;

export const AncestorKnobOverrideMenuFocused = () => (
  <div id={wrapId} style={ANCESTOR_KNOBS}>
    <SplitButton menuButton={{}} primaryActionButton={{}}>
      Focused split button
    </SplitButton>
  </div>
);
AncestorKnobOverrideMenuFocused.parameters = menuSteps;
