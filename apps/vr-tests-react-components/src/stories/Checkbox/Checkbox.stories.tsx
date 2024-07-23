import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import type { Meta } from '@storybook/react';
import { Checkbox } from '@fluentui/react-checkbox';
import { getStoryVariant, RTL, TestWrapperDecoratorFixedWidth } from '../../utilities';

export default {
  title: 'Checkbox Converged',
  component: Checkbox,
  decorators: [
    TestWrapperDecoratorFixedWidth,
    story => (
      <StoryWright steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</StoryWright>
    ),
  ],
} satisfies Meta<typeof Checkbox>;

export const DisabledChecked = () => <Checkbox disabled checked label="Disabled checked" />;
DisabledChecked.storyName = 'disabled+checked';

export const DisabledMixed = () => <Checkbox disabled checked="mixed" label="Disabled mixed" />;
DisabledMixed.storyName = 'disabled+mixed';

export const NoLabel = () => <Checkbox />;
NoLabel.storyName = 'no-label';

export const LabelBefore = () => <Checkbox labelPosition="before" label="Label before" />;
LabelBefore.storyName = 'label-before';

export const LabelBeforeRTL = getStoryVariant(LabelBefore, RTL);

export const LabelWrapping = () => (
  <Checkbox
    label={
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua
      </>
    }
  />
);
LabelWrapping.storyName = 'label-wrapping';

export const LabelWrappingRTL = getStoryVariant(LabelWrapping, RTL);

export const Required = () => <Checkbox required label="Required" />;
Required.storyName = 'required';

export const RequiredLabelBefore = () => (
  <Checkbox required labelPosition="before" label="Required with label before" />
);
RequiredLabelBefore.storyName = 'required+label-before';

export const Circular = () => <Checkbox shape="circular" label="Circular" />;
Circular.storyName = 'circular';

export const CircularChecked = () => <Checkbox shape="circular" checked label="Circular checked" />;
CircularChecked.storyName = 'circular+checked';

export const CircularMixed = () => <Checkbox shape="circular" checked="mixed" label="Circular mixed" />;
CircularMixed.storyName = 'circular+mixed';

//
// large variants
//
export const Large = () => <Checkbox size="large" label="Large" />;
Large.storyName = 'large';

export const LargeRTL = getStoryVariant(Large, RTL);

export const LargeChecked = () => <Checkbox size="large" checked label="Large checked" />;
LargeChecked.storyName = 'large+checked';

export const LargeMixed = () => <Checkbox size="large" checked="mixed" label="Large mixed" />;
LargeMixed.storyName = 'large+mixed';

export const LargeCircular = () => <Checkbox size="large" shape="circular" label="Large circular" />;
LargeCircular.storyName = 'large+circular';

export const LargeCircularChecked = () => (
  <Checkbox size="large" shape="circular" checked label="Large circular checked" />
);
LargeCircularChecked.storyName = 'large+circular+checked';

export const LargeCircularMixed = () => (
  <Checkbox size="large" shape="circular" checked="mixed" label="Large circular mixed" />
);
LargeCircularMixed.storyName = 'large+circular+mixed';

export const LargeLabelWrapping = () => (
  <Checkbox
    size="large"
    label={
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua
      </>
    }
  />
);
LargeLabelWrapping.storyName = 'large+label-wrapping';

export const LargeLabelWrappingRTL = getStoryVariant(LargeLabelWrapping, RTL);
