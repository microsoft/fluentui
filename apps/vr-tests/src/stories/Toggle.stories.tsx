import * as React from 'react';
import { Steps } from 'storywright';
import { getStoryVariant, RTL, StoryWrightDecorator, TestWrapperDecorator } from '../utilities';
import { IToggleProps, Toggle } from '@fluentui/react';

const baseProps: IToggleProps = {
  label: 'Toggle label',
  onText: 'On',
  offText: 'Off',
};

export default {
  title: 'Toggle',

  decorators: [
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
};

export const Checked = () => <Toggle {...baseProps} defaultChecked={true} />;

export const CheckedRTL = getStoryVariant(Checked, RTL);

export const Unchecked = () => <Toggle {...baseProps} defaultChecked={false} />;

export const UncheckedRTL = getStoryVariant(Unchecked, RTL);

export const DisabledChecked = () => (
  <Toggle {...baseProps} defaultChecked={true} disabled={true} />
);

DisabledChecked.storyName = 'Disabled checked';

export const DisabledUnchecked = () => (
  <Toggle {...baseProps} defaultChecked={false} disabled={true} />
);

DisabledUnchecked.storyName = 'Disabled unchecked';

export const WithInlineLabel = () => (
  <Toggle {...baseProps} defaultChecked={true} disabled={false} inlineLabel={true} />
);

WithInlineLabel.storyName = 'With inline label';

export const WithInlineLabelJsxElement = () => (
  <Toggle
    label={<p>Toggle label</p>}
    onText="On"
    offText="Off"
    defaultChecked={true}
    disabled={false}
    inlineLabel={true}
  />
);

WithInlineLabelJsxElement.storyName = 'With inline label (JSX Element)';

export const WithInlineLabelDisabled = () => (
  <Toggle {...baseProps} defaultChecked={true} disabled={true} inlineLabel={true} />
);

WithInlineLabelDisabled.storyName = 'With inline label disabled';

export const WithInlineLabelAndWithoutOnTextAndOffText = () => (
  <Toggle label={'Toggle label'} defaultChecked={true} disabled={false} inlineLabel={true} />
);

WithInlineLabelAndWithoutOnTextAndOffText.storyName =
  'With inline label and without onText and offText';

export const WithInlineLabelJsxElementAndWithoutOnTextAndOffText = () => (
  <Toggle label={<p>Toggle label</p>} defaultChecked={true} disabled={false} inlineLabel={true} />
);

WithInlineLabelJsxElementAndWithoutOnTextAndOffText.storyName =
  'With inline label (JSX Element) and without onText and offText';

export const WithInlineLabelDisabledAndWithoutOnTextAndOffText = () => (
  <Toggle label={'Toggle label'} defaultChecked={true} disabled={true} inlineLabel={true} />
);

WithInlineLabelDisabledAndWithoutOnTextAndOffText.storyName =
  'With inline label disabled and without onText and offText';
