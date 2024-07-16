import * as React from 'react';

import type { Meta } from '@storybook/react';
import { Link, LinkProps } from '@fluentui/react-link';

import { disabledUnfocusableSteps } from './utils';
import { withStoryWrightSteps } from '../../utilities';

const ButtonLink = (props: LinkProps) => <Link {...props} />;

export default {
  title: 'Link Converged - Rendered as button',
  decorators: [story => withStoryWrightSteps({ story, steps: disabledUnfocusableSteps })],
} satisfies Meta<typeof Link>;

export const StandAloneDisabled = () => <ButtonLink disabled>Stand-alone disabled link</ButtonLink>;
StandAloneDisabled.storyName = 'Stand-alone Disabled';

export const InlineDisabled = () => (
  <div>
    This is{' '}
    <ButtonLink inline disabled>
      a disabled link
    </ButtonLink>{' '}
    used alongside other text content.
  </div>
);
