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
      <StoryWright
        steps={new Steps()
          .snapshot('rest', { cropTo: '.testWrapper' })
          .hover('input')
          .snapshot('hover', { cropTo: '.testWrapper' })
          .mouseDown('input')
          .snapshot('active', { cropTo: '.testWrapper' })
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} satisfies Meta<typeof Checkbox>;

export const Unchecked = () => <Checkbox label="Unchecked" />;
Unchecked.storyName = 'unchecked';

export const UncheckedRTL = getStoryVariant(Unchecked, RTL);

export const Checked = () => <Checkbox checked label="Checked" />;
Checked.storyName = 'checked';

export const Mixed = () => <Checkbox checked="mixed" label="Mixed" />;
Mixed.storyName = 'mixed';

export const Disabled = () => <Checkbox disabled label="Disabled" />;
Disabled.storyName = 'disabled';
