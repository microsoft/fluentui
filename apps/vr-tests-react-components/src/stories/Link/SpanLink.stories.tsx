import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Link, LinkProps } from '@fluentui/react-link';

import { InvertedBackground, BrandBackground, steps } from './utils';
import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, RTL } from '../../utilities';
import type { StoryParameters } from 'storywright';

const SpanLink = (props: LinkProps & { as?: 'span' }) => <Link as="span" {...props} />;

export default {
  title: 'Link Converged - Rendered as span',
  parameters: { storyWright: { steps } } satisfies StoryParameters,
} satisfies Meta<typeof Link>;

export const StandAlone = () => <SpanLink>Stand-alone link</SpanLink>;
StandAlone.storyName = 'Stand-alone';

export const StandAloneRTL = getStoryVariant(StandAlone, RTL);

export const StandAloneDisabledFocusable = () => (
  <SpanLink disabled disabledFocusable>
    Stand-alone disabled focusable link
  </SpanLink>
);
StandAloneDisabledFocusable.storyName = 'Stand-alone Disabled Focusable';

export const Inline = () => (
  <div>
    This is <SpanLink inline>a link</SpanLink> used alongside other text content.
  </div>
);

export const InlineRTL = getStoryVariant(Inline, RTL);

export const InlineDisabledFocusable = () => (
  <div>
    This is{' '}
    <SpanLink inline disabled disabledFocusable>
      a disabled focusable link
    </SpanLink>{' '}
    used alongside other text content.
  </div>
);
export const Inverted = () => (
  <InvertedBackground>
    <SpanLink>Link on inverted background</SpanLink>
  </InvertedBackground>
);

export const InvertedHighContrast = getStoryVariant(Inverted, HIGH_CONTRAST);

export const InvertedDarkMode = getStoryVariant(Inverted, DARK_MODE);

export const InvertedDisabled = () => (
  <InvertedBackground>
    <SpanLink disabled disabledFocusable>
      Disabled link on inverted background
    </SpanLink>
  </InvertedBackground>
);
InvertedDisabled.storyName = 'Inverted disabled';

export const InvertedDisabledHighContrast = getStoryVariant(InvertedDisabled, HIGH_CONTRAST);

export const InvertedDisabledDarkMode = getStoryVariant(InvertedDisabled, DARK_MODE);

export const WrapsCorrectlyAsAnInlineElement = () => (
  <div style={{ width: '100px' }}>
    This <SpanLink inline>link wraps correctly between different lines, behaving as an inline element</SpanLink> as
    expected.
  </div>
);

export const Brand = () => (
  <BrandBackground>
    <SpanLink>Link on brand background</SpanLink>
  </BrandBackground>
);

export const BrandDarkMode = getStoryVariant(Brand, DARK_MODE);
export const BrandHighContrast = getStoryVariant(Brand, HIGH_CONTRAST);

WrapsCorrectlyAsAnInlineElement.storyName = 'Wraps correctly as an inline element';
