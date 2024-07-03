import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import type { Meta, StoryFn } from '@storybook/react';
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

type Story = StoryFn<typeof Checkbox>;

export const DisabledChecked: Story = () => <Checkbox disabled checked label="Disabled checked" />;
DisabledChecked.storyName = 'disabled+checked';

export const DisabledMixed: Story = () => <Checkbox disabled checked="mixed" label="Disabled mixed" />;
DisabledMixed.storyName = 'disabled+mixed';

export const NoLabel: Story = () => <Checkbox />;
NoLabel.storyName = 'no-label';

export const LabelBefore: Story = () => <Checkbox labelPosition="before" label="Label before" />;
LabelBefore.storyName = 'label-before';

export const LabelBeforeRTL = getStoryVariant(LabelBefore, RTL);

export const LabelWrapping: Story = () => (
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

export const Required: Story = () => <Checkbox required label="Required" />;
Required.storyName = 'required';

export const RequiredLabelBefore: Story = () => (
  <Checkbox required labelPosition="before" label="Required with label before" />
);
RequiredLabelBefore.storyName = 'required+label-before';

export const Circular: Story = () => <Checkbox shape="circular" label="Circular" />;
Circular.storyName = 'circular';

export const CircularChecked: Story = () => <Checkbox shape="circular" checked label="Circular checked" />;
CircularChecked.storyName = 'circular+checked';

export const CircularMixed: Story = () => <Checkbox shape="circular" checked="mixed" label="Circular mixed" />;
CircularMixed.storyName = 'circular+mixed';

//
// large variants
//
export const Large: Story = () => <Checkbox size="large" label="Large" />;
Large.storyName = 'large';

export const LargeRTL = getStoryVariant(Large, RTL);

export const LargeChecked: Story = () => <Checkbox size="large" checked label="Large checked" />;
LargeChecked.storyName = 'large+checked';

export const LargeMixed: Story = () => <Checkbox size="large" checked="mixed" label="Large mixed" />;
LargeMixed.storyName = 'large+mixed';

export const LargeCircular: Story = () => <Checkbox size="large" shape="circular" label="Large circular" />;
LargeCircular.storyName = 'large+circular';

export const LargeCircularChecked: Story = () => (
  <Checkbox size="large" shape="circular" checked label="Large circular checked" />
);
LargeCircularChecked.storyName = 'large+circular+checked';

export const LargeCircularMixed: Story = () => (
  <Checkbox size="large" shape="circular" checked="mixed" label="Large circular mixed" />
);
LargeCircularMixed.storyName = 'large+circular+mixed';

export const LargeLabelWrapping: Story = () => (
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
