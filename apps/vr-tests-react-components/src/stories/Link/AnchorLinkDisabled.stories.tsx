import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Link, LinkProps } from '@fluentui/react-link';

import { withStoryWrightSteps } from '../../utilities';
import { disabledUnfocusableSteps } from './utils';

const AnchorLink = (props: LinkProps & { as?: 'a' }) => <Link as="a" {...props} href="https://www.bing.com" />;

export default {
  title: 'Link Converged - Rendered as anchor',
  decorators: [story => withStoryWrightSteps({ story, steps: disabledUnfocusableSteps })],
} satisfies Meta<typeof Link>;

export const StandAloneDisabled = () => <AnchorLink disabled>Stand-alone disabled link</AnchorLink>;
StandAloneDisabled.storyName = 'Stand-alone Disabled';

export const InlineDisabled = () => (
  <div>
    This is{' '}
    <AnchorLink inline disabled>
      a disabled link
    </AnchorLink>{' '}
    used alongside other text content.
  </div>
);
