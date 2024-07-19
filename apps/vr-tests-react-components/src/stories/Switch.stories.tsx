import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { Switch } from '@fluentui/react-switch';

import {
  DARK_MODE,
  getStoryVariant,
  HIGH_CONTRAST,
  RTL,
  TestWrapperDecorator,
  withStoryWrightSteps,
} from '../utilities';

export default {
  title: 'Switch Converged',

  decorators: [
    TestWrapperDecorator,
    story =>
      withStoryWrightSteps({
        story,
        steps: new Steps()
          .snapshot('default', { cropTo: '.testWrapper' })
          .hover('.test-class')
          .snapshot('hover', { cropTo: '.testWrapper' })
          .mouseDown('.test-class')
          .snapshot('pressed', { cropTo: '.testWrapper' })
          .mouseUp('.test-class')
          .end(),
      }),
  ],
} satisfies Meta<typeof Switch>;

export const EnabledAndUnchecked = () => <Switch className="test-class" defaultChecked={false} label="Toggle switch" />;
EnabledAndUnchecked.storyName = 'Enabled and unchecked';

export const EnabledAndUncheckedRTL = getStoryVariant(EnabledAndUnchecked, RTL);

export const EnabledAndUncheckedHighContrast = getStoryVariant(EnabledAndUnchecked, HIGH_CONTRAST);

export const EnabledAndUncheckedDarkMode = getStoryVariant(EnabledAndUnchecked, DARK_MODE);

export const EnabledAndChecked = () => <Switch className="test-class" defaultChecked={true} label="Toggle switch" />;
EnabledAndChecked.storyName = 'Enabled and checked';

export const EnabledAndCheckedRTL = getStoryVariant(EnabledAndChecked, RTL);

export const EnabledAndCheckedHighContrast = getStoryVariant(EnabledAndChecked, HIGH_CONTRAST);

export const EnabledAndCheckedDarkMode = getStoryVariant(EnabledAndChecked, DARK_MODE);

export const DisabledAndUnchecked = () => (
  <Switch className="test-class" disabled defaultChecked={false} label="Toggle switch" />
);
DisabledAndUnchecked.storyName = 'Disabled and unchecked';

export const DisabledAndUncheckedHighContrast = getStoryVariant(DisabledAndUnchecked, HIGH_CONTRAST);

export const DisabledAndUncheckedDarkMode = getStoryVariant(DisabledAndUnchecked, DARK_MODE);

export const DisabledAndChecked = () => (
  <Switch className="test-class" disabled defaultChecked={true} label="Toggle switch" />
);
DisabledAndChecked.storyName = 'Disabled and checked';

export const DisabledAndCheckedHighContrast = getStoryVariant(DisabledAndChecked, HIGH_CONTRAST);

export const DisabledAndCheckedDarkMode = getStoryVariant(DisabledAndChecked, DARK_MODE);

export const WithLabelAbove = () => <Switch className="test-class" label="Toggle switch" labelPosition="above" />;
WithLabelAbove.storyName = 'With label above';

export const WithLabelAboveRTL = getStoryVariant(WithLabelAbove, RTL);

export const WithLabelAfter = () => <Switch className="test-class" label="Toggle switch" labelPosition="after" />;
WithLabelAfter.storyName = 'With label after';

export const WithLabelAfterRTL = getStoryVariant(WithLabelAfter, RTL);

export const WithLabelBefore = () => <Switch className="test-class" label="Toggle switch" labelPosition="before" />;
WithLabelBefore.storyName = 'With label before';

export const WithLabelBeforeRTL = getStoryVariant(WithLabelBefore, RTL);

export const WithLabelWrapping = () => (
  <Switch
    className="test-class"
    label={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
         dolore magna aliqua`}
  />
);
WithLabelWrapping.storyName = 'With label wrapping';

export const Required = () => <Switch className="test-class" label="Toggle switch" required />;
