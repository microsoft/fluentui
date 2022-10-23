import * as React from 'react';
import { Steps } from 'screener-storybook/src/screener';
import { Checkbox } from '@fluentui/react-checkbox';
import { TestWrapperDecoratorFixedWidth } from '../../utilities/TestWrapperDecorator';
import { ComponentMeta } from '@storybook/react';
import { getStoryVariant, withScreenerSteps, RTL } from '../../utilities';

const steps = new Steps()
  .snapshot('rest', { cropTo: '.testWrapper' })
  .hover('input')
  .snapshot('hover', { cropTo: '.testWrapper' })
  .mouseDown('input')
  .snapshot('active', { cropTo: '.testWrapper' })
  .end();

export default {
  title: 'Checkbox Converged',

  decorators: [TestWrapperDecoratorFixedWidth, story => withScreenerSteps({ steps, story })],
} as ComponentMeta<typeof Checkbox>;

export const Unchecked = () => <Checkbox label="Unchecked" />;

Unchecked.storyName = 'unchecked';

export const UncheckedRTL = getStoryVariant(Unchecked, RTL);

export const Checked = () => <Checkbox checked label="Checked" />;

Checked.storyName = 'checked';

export const Mixed = () => <Checkbox checked="mixed" label="Mixed" />;

Mixed.storyName = 'mixed';

export const Disabled = () => <Checkbox disabled label="Disabled" />;

Disabled.storyName = 'disabled';
