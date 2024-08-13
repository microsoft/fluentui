import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Link, LinkProps } from '@fluentui/react-link';

import { InvertedBackground, steps } from './utils';
import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, RTL, withStoryWrightSteps } from '../../utilities';

const AnchorLink = (props: LinkProps & { as?: 'a' }) => <Link as="a" {...props} href="https://www.bing.com" />;

export default {
  title: 'Link Converged - Rendered as anchor',
  decorators: [story => withStoryWrightSteps({ story, steps })],
} satisfies Meta<typeof Link>;

export const StandAlone = () => <AnchorLink>Stand-alone link</AnchorLink>;
StandAlone.storyName = 'Stand-alone';

export const StandAloneRTL = getStoryVariant(StandAlone, RTL);

export const StandAloneHighContrast = getStoryVariant(StandAlone, HIGH_CONTRAST);

export const StandAloneDarkMode = getStoryVariant(StandAlone, DARK_MODE);

export const StandAloneDisabledFocusable = () => (
  <AnchorLink disabled disabledFocusable>
    Stand-alone disabled focusable link
  </AnchorLink>
);
StandAloneDisabledFocusable.storyName = 'Stand-alone Disabled Focusable';

export const StandAloneDisabledFocusableHighContrast = getStoryVariant(StandAloneDisabledFocusable, HIGH_CONTRAST);

export const StandAloneDisabledFocusableDarkMode = getStoryVariant(StandAloneDisabledFocusable, DARK_MODE);

export const Inline = () => (
  <div>
    This is <AnchorLink inline>a link</AnchorLink> used alongside other text content.
  </div>
);

export const InlineRTL = getStoryVariant(Inline, RTL);

export const InlineDisabledFocusable = () => (
  <div>
    This is{' '}
    <AnchorLink inline disabled disabledFocusable>
      a disabled focusable link
    </AnchorLink>{' '}
    used alongside other text content.
  </div>
);

export const Inverted = () => (
  <InvertedBackground>
    <AnchorLink>Link on inverted background</AnchorLink>
  </InvertedBackground>
);

export const InvertedHighContrast = getStoryVariant(Inverted, HIGH_CONTRAST);

export const InvertedDarkMode = getStoryVariant(Inverted, DARK_MODE);

export const InvertedDisabled = () => (
  <InvertedBackground>
    <AnchorLink disabled disabledFocusable>
      Disabled link on inverted background
    </AnchorLink>
  </InvertedBackground>
);
InvertedDisabled.storyName = 'Inverted disabled';

export const InvertedDisabledHighContrast = getStoryVariant(InvertedDisabled, HIGH_CONTRAST);

export const InvertedDisabledDarkMode = getStoryVariant(InvertedDisabled, DARK_MODE);
