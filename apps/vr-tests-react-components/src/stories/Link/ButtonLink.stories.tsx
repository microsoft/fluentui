import * as React from 'react';

import type { Meta } from '@storybook/react';
import { Link, LinkProps } from '@fluentui/react-link';

import { InvertedBackground, steps } from './utils';
import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, RTL, withStoryWrightSteps } from '../../utilities';

const ButtonLink = (props: LinkProps) => <Link {...props} />;

export default {
  title: 'Link Converged - Rendered as button',
  decorators: [story => withStoryWrightSteps({ story, steps })],
} satisfies Meta<typeof Link>;

export const StandAlone = () => <ButtonLink>Stand-alone link</ButtonLink>;
StandAlone.storyName = 'Stand-alone';

export const StandAloneRTL = getStoryVariant(StandAlone, RTL);

export const StandAloneDisabledFocusable = () => (
  <ButtonLink disabled disabledFocusable>
    Stand-alone disabled focusable link
  </ButtonLink>
);
StandAloneDisabledFocusable.storyName = 'Stand-alone Disabled Focusable';

export const Inline = () => (
  <div>
    This is <ButtonLink inline>a link</ButtonLink> used alongside other text content.
  </div>
);

export const InlineRTL = getStoryVariant(Inline, RTL);

export const InlineDisabledFocusable = () => (
  <div>
    This is{' '}
    <ButtonLink inline disabled disabledFocusable>
      a disabled focusable link
    </ButtonLink>{' '}
    used alongside other text content.
  </div>
);

export const Inverted = () => (
  <InvertedBackground>
    <ButtonLink>Link on inverted background</ButtonLink>
  </InvertedBackground>
);

export const InvertedHighContrast = getStoryVariant(Inverted, HIGH_CONTRAST);

export const InvertedDarkMode = getStoryVariant(Inverted, DARK_MODE);

export const InvertedDisabled = () => (
  <InvertedBackground>
    <ButtonLink disabled disabledFocusable>
      Disabled link on inverted background
    </ButtonLink>
  </InvertedBackground>
);
InvertedDisabled.storyName = 'Inverted disabled';

export const InvertedDisabledHighContrast = getStoryVariant(InvertedDisabled, HIGH_CONTRAST);

export const InvertedDisabledDarkMode = getStoryVariant(InvertedDisabled, DARK_MODE);
