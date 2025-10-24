import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps, type StoryParameters } from 'storywright';
import { Label } from '@fluentui/react-label';
import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, RTL } from '../utilities';

export default {
  title: 'Label Converged',

  parameters: { storyWright: { steps: new Steps().snapshot('default').end() } } satisfies StoryParameters,
} satisfies Meta<typeof Label>;

export const Root = () => <Label>I'm a label</Label>;

export const RootRTL = getStoryVariant(Root, RTL);

export const RootHighContrast = getStoryVariant(Root, HIGH_CONTRAST);

export const RootDarkMode = getStoryVariant(Root, DARK_MODE);

export const Disabled = () => <Label disabled>I'm a disabled label</Label>;

export const DisabledHighContrast = getStoryVariant(Disabled, HIGH_CONTRAST);

export const DisabledDarkMode = getStoryVariant(Disabled, DARK_MODE);

export const Required = () => <Label required>I'm a required label</Label>;

export const RequiredHighContrast = getStoryVariant(Required, HIGH_CONTRAST);

export const RequiredDarkMode = getStoryVariant(Required, DARK_MODE);

export const Semibold = () => <Label weight="semibold">I'm a semibold label</Label>;

export const Small = () => <Label size="small">I'm a small label</Label>;

export const Large = () => <Label size="large">I'm a large label</Label>;

export const CustomRequired = () => <Label required="**">I'm a label with custom required text</Label>;
CustomRequired.storyName = 'CustomRequired';

export const CustomRequiredRTL = getStoryVariant(CustomRequired, RTL);

export const Multiline = () => (
  <div style={{ width: '200px' }}>
    <Label required>Super long label to show overflow into multiple lines</Label>
  </div>
);

export const MultilineRTL = getStoryVariant(Multiline, RTL);
