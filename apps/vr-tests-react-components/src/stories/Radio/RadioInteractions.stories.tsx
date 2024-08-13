import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { AirplaneFilled } from '@fluentui/react-icons';
import { Radio } from '@fluentui/react-radio';

import {
  DARK_MODE,
  getStoryVariant,
  HIGH_CONTRAST,
  TestWrapperDecoratorFixedWidth,
  withStoryWrightSteps,
} from '../../utilities';

export default {
  title: 'Radio Converged',

  decorators: [
    TestWrapperDecoratorFixedWidth,
    story =>
      withStoryWrightSteps({
        story,
        steps: new Steps()
          .snapshot('rest', { cropTo: '.testWrapper' })
          .hover('input')
          .snapshot('hover', { cropTo: '.testWrapper' })
          .mouseDown('input')
          .snapshot('active', { cropTo: '.testWrapper' })
          .end(),
      }),
  ],
} satisfies Meta<typeof Radio>;

export const Unchecked = () => <Radio label="Unchecked" />;
Unchecked.storyName = 'unchecked';

export const UncheckedHighContrast = getStoryVariant(Unchecked, HIGH_CONTRAST);

export const UncheckedDarkMode = getStoryVariant(Unchecked, DARK_MODE);

export const Checked = () => <Radio checked label="Checked" />;
Checked.storyName = 'checked';

export const CheckedHighContrast = getStoryVariant(Checked, HIGH_CONTRAST);

export const CheckedDarkMode = getStoryVariant(Checked, DARK_MODE);

export const Disabled = () => <Radio disabled label="Disabled" />;
Disabled.storyName = 'disabled';

export const DisabledHighContrast = getStoryVariant(Disabled, HIGH_CONTRAST);

export const DisabledDarkMode = getStoryVariant(Disabled, DARK_MODE);

export const IndicatorChecked = () => <Radio checked indicator={<AirplaneFilled />} label="Custom indicator" />;
IndicatorChecked.storyName = 'indicator+checked';
