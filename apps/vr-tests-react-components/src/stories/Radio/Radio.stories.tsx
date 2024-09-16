import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { AirplaneFilled } from '@fluentui/react-icons';
import { Radio, RadioGroup } from '@fluentui/react-radio';

import {
  DARK_MODE,
  getStoryVariant,
  HIGH_CONTRAST,
  RTL,
  TestWrapperDecoratorFixedWidth,
  withStoryWrightSteps,
} from '../../utilities';

export default {
  title: 'Radio Converged',

  decorators: [
    TestWrapperDecoratorFixedWidth,
    story => withStoryWrightSteps({ story, steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end() }),
  ],
} satisfies Meta<typeof Radio>;

export const DisabledChecked = () => <Radio disabled checked label="Disabled checked" />;
DisabledChecked.storyName = 'disabled+checked';

export const DisabledCheckedHighContrast = getStoryVariant(DisabledChecked, HIGH_CONTRAST);

export const DisabledCheckedDarkMode = getStoryVariant(DisabledChecked, DARK_MODE);

export const IndicatorUnchecked = () => <Radio indicator={<AirplaneFilled />} label="Custom indicator" />;
IndicatorUnchecked.storyName = 'indicator+unchecked';

export const NoLabel = () => <Radio />;
NoLabel.storyName = 'no-label';

export const NoLabelRTL = getStoryVariant(NoLabel, RTL);

export const LabelAfter = () => <Radio labelPosition="after" label="Label after" />;
LabelAfter.storyName = 'label-after';

export const LabelAfterRTL = getStoryVariant(LabelAfter, RTL);

export const LabelBelow = () => <Radio labelPosition="below" label="Label below" />;
LabelBelow.storyName = 'label-below';

export const LabelBelowRTL = getStoryVariant(LabelBelow, RTL);

export const LabelWrapping = () => (
  <Radio
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

export const Required = () => <Radio required label="Required" />;
Required.storyName = 'required';

export const RequiredRTL = getStoryVariant(Required, RTL);

export const GroupVertical = () => (
  <RadioGroup defaultValue="A">
    <Radio value="A" label="Option A" />
    <Radio value="B" label="Option B" />
    <Radio value="C" label="Option C" />
  </RadioGroup>
);
GroupVertical.storyName = 'group-vertical';

export const GroupVerticalRTL = getStoryVariant(GroupVertical, RTL);

export const GroupHorizontal = () => (
  <RadioGroup value="A" layout="horizontal">
    <Radio value="A" label="Option A" />
    <Radio value="B" label="Option B" />
    <Radio value="C" label="Option C" />
  </RadioGroup>
);
GroupHorizontal.storyName = 'group-horizontal';

export const GroupHorizontalRTL = getStoryVariant(GroupHorizontal, RTL);

export const GroupHorizontalStacked = () => (
  <RadioGroup layout="horizontal-stacked">
    <Radio value="A" label="Option A" defaultChecked />
    <Radio value="B" label="Option B" />
    <Radio value="C" label="Option C" />
  </RadioGroup>
);
GroupHorizontalStacked.storyName = 'group-horizontal-stacked';

export const GroupHorizontalStackedRTL = getStoryVariant(GroupHorizontalStacked, RTL);

export const GroupDisabled = () => (
  <RadioGroup disabled value="A">
    <Radio value="A" label="Option A" />
    <Radio value="B" label="Option B" />
    <Radio value="C" label="Option C" />
  </RadioGroup>
);
GroupDisabled.storyName = 'group-disabled';

export const GroupDisabledRTL = getStoryVariant(GroupDisabled, RTL);
