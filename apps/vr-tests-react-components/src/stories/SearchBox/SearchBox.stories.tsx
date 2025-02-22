import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { SearchBox } from '@fluentui/react-search';
import { ArrowEnterLeftRegular, MicRegular } from '@fluentui/react-icons';

import { getStoryVariant, withStoryWrightSteps, TestWrapperDecorator, RTL } from '../../utilities';

export default {
  title: 'SearchBox Converged',
  decorators: [
    TestWrapperDecorator,
    story =>
      withStoryWrightSteps({
        story,
        steps: new Steps()
          .snapshot('default', { cropTo: '.testWrapper' })
          .click('input')
          .snapshot('hover', { cropTo: '.testWrapper' })
          .click('input')
          .wait(250) // let focus border animation finish
          .snapshot('focused', { cropTo: '.testWrapper' })
          .end(),
      }),
  ],
} satisfies Meta<typeof SearchBox>;

export const WithValue = () => <SearchBox defaultValue="Value!" />;
WithValue.storyName = 'With value';

export const AppearanceOutlineDefault = () => <SearchBox placeholder="Placeholder" />;
AppearanceOutlineDefault.storyName = 'Appearance: outline (default)';

export const AppearanceUnderline = () => <SearchBox appearance="underline" placeholder="Placeholder" />;
AppearanceUnderline.storyName = 'Appearance: underline';

export const AppearanceFilledDarker = () => <SearchBox appearance="filled-darker" placeholder="Placeholder" />;
AppearanceFilledDarker.storyName = 'Appearance: filled-darker';

export const AppearanceFilledLighter = () => (
  // filledLighter requires a background to show up (this is colorNeutralBackground3 in web light theme)
  <div style={{ background: '#f5f5f5', padding: '10px' }}>
    <SearchBox appearance="filled-lighter" placeholder="Placeholder" />
  </div>
);
AppearanceFilledLighter.storyName = 'Appearance: filled-lighter';

export const SizeSmall = () => <SearchBox size="small" placeholder="Placeholder" />;
SizeSmall.storyName = 'Size: small';

export const SizeLarge = () => <SearchBox size="large" placeholder="Placeholder" />;
SizeLarge.storyName = 'Size: large';

export const DisabledAppearanceOutline = () => <SearchBox disabled value="Disabled" />;
DisabledAppearanceOutline.storyName = 'Disabled, appearance: outline';

export const DisabledAppearanceUnderline = () => <SearchBox disabled appearance="underline" value="Disabled" />;
DisabledAppearanceUnderline.storyName = 'Disabled, appearance: underline';

export const DisabledAppearanceFilledDarker = () => <SearchBox disabled appearance="filled-darker" value="Disabled" />;
DisabledAppearanceFilledDarker.storyName = 'Disabled, appearance: filled-darker';

export const DisabledAppearanceFilledLighter = () => (
  // filledLighter requires a background to show up (this is colorNeutralBackground3 in web light theme)
  <div style={{ background: '#f5f5f5', padding: '10px' }}>
    <SearchBox disabled appearance="filled-lighter" value="Disabled" />
  </div>
);
DisabledAppearanceFilledLighter.storyName = 'Disabled, appearance: filled-lighter';

export const WIthContentAfter = () => <SearchBox contentAfter={<MicRegular />} placeholder="Placeholder" />;
WIthContentAfter.storyName = 'WIth contentAfter';

export const WIthContentAfterRTL = getStoryVariant(WIthContentAfter, RTL);

export const WithCustomDismiss = () => <SearchBox dismiss={<ArrowEnterLeftRegular />} placeholder="Placeholder" />;
WithCustomDismiss.storyName = 'With custom dismiss';

export const WithCustomDismissRTL = getStoryVariant(WithCustomDismiss, RTL);
