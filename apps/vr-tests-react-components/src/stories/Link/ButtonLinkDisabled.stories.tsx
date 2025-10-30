import * as React from 'react';

import type { Meta } from '@storybook/react';
import { Link, LinkProps } from '@fluentui/react-link';

import { disabledUnfocusableSteps } from './utils';
import type { StoryParameters } from 'storywright';

const ButtonLink = (props: LinkProps) => <Link {...props} />;

export default {
  title: 'Link Converged - Rendered as button',
  parameters: { storyWright: { steps: disabledUnfocusableSteps } } satisfies StoryParameters,
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
