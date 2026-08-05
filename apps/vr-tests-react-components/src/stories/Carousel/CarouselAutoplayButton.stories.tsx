import * as React from 'react';
import {
  Carousel,
  CarouselAutoplayButton,
  CarouselCard,
  CarouselSlider,
  CarouselViewport,
} from '@fluentui/react-carousel';
import type { CarouselAutoplayButtonProps } from '@fluentui/react-carousel';
import type { Meta } from '@storybook/react-webpack5';
import { Steps, type StoryParameters } from 'storywright';
import { TestWrapperDecorator } from '../../utilities';

/**
 * Coverage added with the PR-36513 review fixes (item 12): the autoplay button's colour slice
 * is JS-gated per property against react-button's appearance slices, and `appearance="outline"`
 * is the one appearance that overrides only `background-color` — the carousel foreground and
 * border colours must survive it (Griffel-era per-property merge, verified against
 * useButtonStyles.styles.ts pre-conversion source at 60d59a5f72~1).
 *
 * The non-outline stories pin the surfaces the item-12 fix must NOT change: `secondary` keeps
 * the full carousel colour slice, `primary`/`subtle`/`transparent` replace all three colour
 * properties, and `checked`/`disabled` drop the slice entirely regardless of appearance.
 */
export default {
  title: 'CarouselAutoplayButton Converged',
  component: CarouselAutoplayButton,
  decorators: [TestWrapperDecorator],
  parameters: {
    storyWright: {
      steps: new Steps().snapshot('default', { cropTo: '.testWrapper' }).end(),
    },
  } satisfies StoryParameters,
} satisfies Meta<typeof CarouselAutoplayButton>;

/*
 * Three cards, not one: the `defaultChecked` stories enable autoplay at mount, and embla's
 * autoplay plugin throws (`Cannot read properties of undefined (reading '0')` in
 * `startAutoplay`) when it starts against a single-card carousel, which storybook renders as
 * its error page instead of the component. The autoplay interval (default 4s) is far beyond
 * StoryWright's 500ms screenshot wait, so no slide movement is captured.
 */
const AutoplayButtonExample = (props: CarouselAutoplayButtonProps) => (
  <Carousel groupSize={1}>
    <CarouselAutoplayButton aria-label="Toggle autoplay" {...props} />
    <CarouselViewport>
      <CarouselSlider>
        <CarouselCard aria-label="1 of 3">Card 1</CarouselCard>
        <CarouselCard aria-label="2 of 3">Card 2</CarouselCard>
        <CarouselCard aria-label="3 of 3">Card 3</CarouselCard>
      </CarouselSlider>
    </CarouselViewport>
  </Carousel>
);

export const Secondary = () => <AutoplayButtonExample />;
export const Outline = () => <AutoplayButtonExample appearance="outline" />;
export const Primary = () => <AutoplayButtonExample appearance="primary" />;
export const Subtle = () => <AutoplayButtonExample appearance="subtle" />;
export const Transparent = () => <AutoplayButtonExample appearance="transparent" />;
export const Checked = () => <AutoplayButtonExample defaultChecked />;
export const OutlineChecked = () => <AutoplayButtonExample appearance="outline" defaultChecked />;
export const Disabled = () => <AutoplayButtonExample disabled />;
export const OutlineDisabled = () => <AutoplayButtonExample appearance="outline" disabled />;
