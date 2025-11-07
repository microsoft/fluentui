import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import type { StoryParameters } from 'storywright';
import { TestWrapperDecoratorFixedWidth, getStoryVariant, RTL } from '../../utilities';
import { Fabric, SpinButton, ISpinButtonProps } from '@fluentui/react';

const props: ISpinButtonProps = {
  defaultValue: '0',
  label: 'Basic SpinButton:',
  min: 0,
  max: 0,
  step: 1,
};

const iconProps = { iconName: 'IncreaseIndentLegacy' };

export default {
  title: 'SpinButton',

  decorators: [TestWrapperDecoratorFixedWidth],
  parameters: {
    storyWright: {
      steps: new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-spinButton-input')
        .snapshot('hover input', { cropTo: '.testWrapper' })
        .click('.ms-spinButton-input')
        .hover('.ms-spinButton-input')
        .snapshot('click input', { cropTo: '.testWrapper' })
        .hover('.ms-Button-flexContainer')
        .snapshot('hover arrow', { cropTo: '.testWrapper' })
        .mouseDown('.ms-Button-flexContainer')
        .snapshot('mouseDown arrow', { cropTo: '.testWrapper' })
        .end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof SpinButton>;

export const Root = () => (
  <Fabric>
    <SpinButton {...props} />
  </Fabric>
);

export const Disabled = () => (
  <Fabric>
    <SpinButton {...props} disabled />
  </Fabric>
);

export const WithIcon = () => (
  <Fabric>
    <SpinButton {...props} iconProps={iconProps} />
  </Fabric>
);

WithIcon.storyName = 'With icon';

export const WithIconRTL = getStoryVariant(WithIcon, RTL);
