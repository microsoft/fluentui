import * as React from 'react';
import type { Meta } from '@storybook/react';
import { Steps, type StoryParameters } from 'storywright';
import { Slider } from '@fluentui/react-slider';
import { getStoryVariant, RTL, TestWrapperDecorator } from '../../utilities';
import { useStyles } from './utils';

export default {
  title: 'Slider Converged',
  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: { steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end() },
  } satisfies StoryParameters,
} satisfies Meta<typeof Slider>;

export const Horizontal0 = () => <Slider defaultValue={0} />;
Horizontal0.storyName = 'Horizontal - 0%';

export const Horizontal0RTL = getStoryVariant(Horizontal0, RTL);

export const Horizontal100 = () => <Slider defaultValue={100} />;
Horizontal100.storyName = 'Horizontal - 100%';

export const Horizontal100RTL = getStoryVariant(Horizontal100, RTL);

export const Vertical0 = () => <Slider vertical defaultValue={0} />;
Vertical0.storyName = 'Vertical - 0%';

export const Vertical0RTL = getStoryVariant(Vertical0, RTL);

export const Vertical100 = () => <Slider vertical defaultValue={100} />;
Vertical100.storyName = 'Vertical - 100%';

export const Vertical100RTL = getStoryVariant(Vertical100, RTL);

export const CustomizedSlider = () => {
  const styles = useStyles();

  return <Slider className={styles.enabled} thumb={{ className: styles.thumb }} defaultValue={20} size="small" />;
};
