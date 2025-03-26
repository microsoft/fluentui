import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps, type StoryParameters } from 'storywright';
import { SpinButton } from '@fluentui/react-spinbutton';
import { FluentProvider } from '@fluentui/react-provider';
import { makeStyles } from '@griffel/react';

import { DARK_MODE, getStoryVariant, HIGH_CONTRAST, RTL, TestWrapperDecoratorFixedWidth } from '../../utilities';

export default {
  title: 'SpinButton Converged',
  decorators: [TestWrapperDecoratorFixedWidth],
  parameters: {
    storyWright: { steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end() },
  } satisfies StoryParameters,
} satisfies Meta<typeof SpinButton>;

export const SizeSmall = () => <SpinButton size="small" value={10} />;

SizeSmall.storyName = 'Size: small';

export const SizeSmallRTL = getStoryVariant(SizeSmall, RTL);

export const SizeSmallHighContrast = getStoryVariant(SizeSmall, HIGH_CONTRAST);

export const SizeSmallDarkMode = getStoryVariant(SizeSmall, DARK_MODE);

export const SizeMediumDefault = () => <SpinButton value={10} />;
SizeMediumDefault.storyName = 'Size: medium (default)';

export const SizeMediumDefaultRTL = getStoryVariant(SizeMediumDefault, RTL);

export const WithAppearanceOverride = () => (
  <FluentProvider overrides_unstable={{ inputDefaultAppearance: 'filled-darker' }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <SpinButton value={10} />
      <SpinButton value={10} appearance="outline" />
    </div>
  </FluentProvider>
);
WithAppearanceOverride.storyName = 'With appearance override';

export const CustomWidth = () => {
  const useStyles = makeStyles({
    customWidth: { width: '50px' },
  });
  const classes = useStyles();
  return <SpinButton value={10} className={classes.customWidth} />;
};

export const CustomWidthRTL = getStoryVariant(CustomWidth, RTL);

export const CustomWidthHighContrast = getStoryVariant(CustomWidth, HIGH_CONTRAST);

export const CustomWidthDarkMode = getStoryVariant(CustomWidth, DARK_MODE);
