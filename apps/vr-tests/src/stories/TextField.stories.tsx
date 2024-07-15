import * as React from 'react';
import { Steps } from 'storywright';
import {
  getStoryVariant,
  RTL,
  StoryWrightDecorator,
  TestWrapperDecoratorFixedWidth,
} from '../utilities';
import { TextField } from '@fluentui/react';

export default {
  title: 'TextField',

  decorators: [
    TestWrapperDecoratorFixedWidth,
    StoryWrightDecorator(
      new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-TextField-field')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .click('.ms-TextField-field')
        .hover('.ms-TextField-field')
        .snapshot('click', { cropTo: '.testWrapper' })
        .end(),
    ),
  ],
};

export const Root = () => <TextField label="Standard" />;
export const Placeholder = () => <TextField label="Standard" placeholder="Placeholder" />;

export const PlaceholderRTL = getStoryVariant(Placeholder, RTL);

export const Disabled = () => <TextField label="Disabled" disabled />;
export const Required = () => <TextField label="Required" required />;
export const Error = () => <TextField label="Error" errorMessage="Error message" />;
Error.storyName = 'Error';

export const ErrorRTL = getStoryVariant(Error, RTL);

export const Multiline = () => <TextField label="Multiline" multiline rows={4} />;

export const MultilineRTL = getStoryVariant(Multiline, RTL);

export const MultilineNonresizable = () => (
  <TextField label="Multiline" multiline rows={4} resizable={false} />
);

MultilineNonresizable.storyName = 'Multiline nonresizable';

export const Underlined = () => <TextField label="Underlined" underlined />;

export const Borderless = () => (
  <TextField label="Borderless" borderless placeholder="Placeholder text" />
);

export const Icon = () => (
  <TextField
    styles={{ icon: { color: 'green' } }}
    label="Green styled icon"
    iconProps={{ iconName: 'Calendar' }}
  />
);

export const IconRTL = getStoryVariant(Icon, RTL);

export const PrefixWithValueDisabledAndPrefixStyleOverride = () => (
  <TextField
    label="Green styled prefix"
    prefix="https://"
    defaultValue="example.com"
    styles={{ prefix: { color: 'green' } }}
    disabled
  />
);
PrefixWithValueDisabledAndPrefixStyleOverride.storyName =
  'Prefix with Value, Disabled, and Prefix Style-Override';

export const PrefixWithValueDisabledAndPrefixStyleOverrideRTL = getStoryVariant(
  PrefixWithValueDisabledAndPrefixStyleOverride,
  RTL,
);

export const PrefixWithValueDisabled = () => (
  <TextField label="Prefix" prefix="https://" defaultValue="example.com" disabled />
);
PrefixWithValueDisabled.storyName = 'Prefix with Value, Disabled';

export const PrefixWithValueDisabledRTL = getStoryVariant(PrefixWithValueDisabled, RTL);

export const Suffix = () => <TextField label="Suffix" suffix=".com" />;

export const SuffixRTL = getStoryVariant(Suffix, RTL);
