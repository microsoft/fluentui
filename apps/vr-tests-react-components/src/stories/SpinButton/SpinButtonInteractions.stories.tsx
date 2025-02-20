import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps, StoryParameters } from 'storywright';
import { SpinButton, spinButtonClassNames } from '@fluentui/react-spinbutton';

import { getStoryVariant, TestWrapperDecoratorFixedWidth, DARK_MODE, RTL, HIGH_CONTRAST } from '../../utilities';

const cropTo = '.testWrapper';

export default {
  title: 'SpinButton Converged',
  decorators: [TestWrapperDecoratorFixedWidth],
  parameters: {
    storyWright: {
      steps: new Steps()
        .snapshot('rest', { cropTo })
        .hover('input')
        .snapshot('hoverInput', { cropTo })

        .hover(`.${spinButtonClassNames.incrementButton}`)
        .snapshot('hoverIncrement', { cropTo })

        .hover(`.${spinButtonClassNames.decrementButton}`)
        .snapshot('hoverDecrement', { cropTo })

        .mouseDown(`.${spinButtonClassNames.incrementButton}`)
        .wait(250)
        .snapshot('mouseDownIncrement', { cropTo })
        .mouseUp(`.${spinButtonClassNames.incrementButton}`)

        .mouseDown(`.${spinButtonClassNames.decrementButton}`)
        .wait(250)
        .snapshot('mouseDownDecrement', { cropTo })
        .mouseUp(`.${spinButtonClassNames.decrementButton}`)

        .click('input')
        .wait(250) // let focus border animation finish
        .snapshot('focused', { cropTo })
        .end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof SpinButton>;

export const AppearanceOutlineDefault = () => <SpinButton value={10} />;
AppearanceOutlineDefault.storyName = 'Appearance: outline (default)';

export const AppearanceOutlineDefaultRTL = getStoryVariant(AppearanceOutlineDefault, RTL);

export const AppearanceOutlineDefaultHighContrast = getStoryVariant(AppearanceOutlineDefault, HIGH_CONTRAST);

export const AppearanceOutlineDefaultDarkMode = getStoryVariant(AppearanceOutlineDefault, DARK_MODE);

export const AppearanceUnderline = () => <SpinButton appearance="underline" value={10} />;
AppearanceUnderline.storyName = 'Appearance: underline';

export const AppearanceUnderlineRTL = getStoryVariant(AppearanceUnderline, RTL);

export const AppearanceUnderlineHighContrast = getStoryVariant(AppearanceUnderline, HIGH_CONTRAST);

export const AppearanceUnderlineDarkMode = getStoryVariant(AppearanceUnderline, DARK_MODE);

export const AppearanceFilledDarker = () => <SpinButton appearance="filled-darker" value={10} />;
AppearanceFilledDarker.storyName = 'Appearance: filled-darker';

export const AppearanceFilledDarkerRTL = getStoryVariant(AppearanceFilledDarker, RTL);

export const AppearanceFilledDarkerHighContrast = getStoryVariant(AppearanceFilledDarker, HIGH_CONTRAST);

export const AppearanceFilledDarkerDarkMode = getStoryVariant(AppearanceFilledDarker, DARK_MODE);

export const AppearanceFilledLighter = () => (
  // filledLighter requires a background to show up (this is colorNeutralBackground3 in web light theme)
  <div style={{ background: '#f5f5f5', padding: '10px' }}>
    <SpinButton appearance="filled-lighter" value={10} />
  </div>
);
AppearanceFilledLighter.storyName = 'Appearance: filled-lighter';

export const AppearanceFilledLighterRTL = getStoryVariant(AppearanceFilledLighter, RTL);

export const AppearanceFilledLighterHighContrast = getStoryVariant(AppearanceFilledLighter, HIGH_CONTRAST);

export const AppearanceFilledLighterDarkMode = getStoryVariant(AppearanceFilledLighter, DARK_MODE);

export const InvalidOutline = () => <SpinButton aria-invalid value={10} />;
InvalidOutline.storyName = 'Invalid: outline';

export const InvalidUnderline = () => <SpinButton aria-invalid appearance="underline" value={10} />;
InvalidUnderline.storyName = 'Invalid: underline';

export const InvalidFilledDarker = () => <SpinButton aria-invalid appearance="filled-darker" value={10} />;
InvalidFilledDarker.storyName = 'Invalid: filled-darker';

export const InvalidFilledLighter = () => (
  // filledLighter requires a background to show up (this is colorNeutralBackground3 in web light theme)
  <div style={{ background: '#f5f5f5', padding: '10px' }}>
    <SpinButton aria-invalid appearance="filled-lighter" value={10} />
  </div>
);
InvalidFilledLighter.storyName = 'Invalid: filled-lighter';

export const DisplayValue = () => <SpinButton value={10} displayValue="$10.00" />;

export const DisplayValueRTL = getStoryVariant(DisplayValue, RTL);

export const DisplayValueHighContrast = getStoryVariant(DisplayValue, HIGH_CONTRAST);

export const DisplayValueDarkMode = getStoryVariant(DisplayValue, DARK_MODE);

export const Disabled = () => <SpinButton disabled value={10} />;

export const DisabledRTL = getStoryVariant(Disabled, RTL);

export const DisabledHighContrast = getStoryVariant(Disabled, HIGH_CONTRAST);

export const DisabledDarkMode = getStoryVariant(Disabled, DARK_MODE);

export const AtMaxBound = () => <SpinButton value={10} max={10} />;

export const AtMaxBoundRTL = getStoryVariant(AtMaxBound, RTL);

export const AtMaxBoundHighContrast = getStoryVariant(AtMaxBound, HIGH_CONTRAST);

export const AtMaxBoundDarkMode = getStoryVariant(AtMaxBound, DARK_MODE);

export const AtMinBound = () => <SpinButton value={10} min={10} />;

export const AtMinBoundRTL = getStoryVariant(AtMinBound, RTL);

export const AtMinBoundHighContrast = getStoryVariant(AtMinBound, HIGH_CONTRAST);

export const AtMinBoundDarkMode = getStoryVariant(AtMinBound, DARK_MODE);
