// eslint-disable-next-line import/no-extraneous-dependencies -- Shared story helper uses development dependencies.
import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies -- Shared story helper uses development dependencies.
import { ChevronLeftRegular, ChevronRightRegular } from '@fluentui/react-icons';
// eslint-disable-next-line import/no-extraneous-dependencies -- Shared story helper uses development dependencies.
import {
  Carousel,
  CarouselNext,
  CarouselNav,
  CarouselNavButton,
  CarouselAutoplayButton,
  CarouselPrevious,
  CarouselCard,
  CarouselViewport,
} from '@fluentui/react-headless-components-preview/carousel';
import type { CarouselProps } from '@fluentui/react-headless-components-preview/carousel';
import { carouselTransition } from './carouselTransition';
import styles from './carousel.module.css';

export type Workshop = { track: string; title: string; description: string; when: string };

export const workshops: Workshop[] = [
  {
    track: 'Accessibility',
    title: 'Designing for keyboard navigation',
    description: 'Plan focus order, visible focus and shortcuts before the first pixel ships.',
    when: 'Mon · 10:00',
  },
  {
    track: 'Foundations',
    title: 'Choosing semantic HTML',
    description: 'Pick native elements first and learn when ARIA genuinely adds meaning.',
    when: 'Tue · 14:00',
  },
  {
    track: 'Layout',
    title: 'Testing responsive layouts',
    description: 'Check reflow, zoom and container queries across real breakpoints.',
    when: 'Wed · 11:30',
  },
  {
    track: 'Motion',
    title: 'Respecting reduced motion',
    description: 'Keep transitions meaningful and give every animation a calm fallback.',
    when: 'Thu · 09:30',
  },
  {
    track: 'Content',
    title: 'Writing clear labels',
    description: 'Name controls by what they do so screen reader users never have to guess.',
    when: 'Fri · 13:00',
  },
];

/** Slide body shared by the stories. */
export const WorkshopSlide = ({ track, title, description, when }: Workshop): React.ReactElement => (
  <>
    <p className={styles.eyebrow}>{track}</p>
    <h3 className={styles.title}>{title}</h3>
    <p className={styles.description}>{description}</p>
    <p className={styles.meta}>{when}</p>
  </>
);

/**
 * Arrow glyphs live in an `aria-hidden` span, so the tooltip text alone names the button.
 * A factory rather than exported objects: Storybook's docgen tags exported values, which would then be spread onto the span.
 */
export const arrowIcon = (direction: 'previous' | 'next'): { children: React.ReactElement; 'aria-hidden': true } => ({
  children: direction === 'previous' ? <ChevronLeftRegular /> : <ChevronRightRegular />,
  'aria-hidden': true as const,
});

/** Shared story composition: autoplay button first, arrows around the viewport, nav below. */
export const CarouselExample = ({
  slides,
  autoplay = false,
  ...props
}: CarouselProps & { slides: React.ReactNode[]; autoplay?: boolean }): React.ReactElement => (
  <Carousel className={styles.carousel} transition={carouselTransition} {...props}>
    {autoplay && <CarouselAutoplayButton className={`${styles.button} ${styles.playback}`} />}
    <CarouselPrevious
      button={{ className: styles.button, icon: arrowIcon('previous') }}
      tooltip={{ className: styles.tooltip }}
    />
    <CarouselViewport className={styles.viewport}>
      {slides.map((slide, i) => (
        <CarouselCard key={i} className={styles.card}>
          {slide}
        </CarouselCard>
      ))}
    </CarouselViewport>
    <CarouselNext
      button={{ className: styles.button, icon: arrowIcon('next') }}
      tooltip={{ className: styles.tooltip }}
    />
    <CarouselNav className={styles.nav}>
      <CarouselNavButton className={styles.navButton} indicator={{ className: styles.indicator }} />
    </CarouselNav>
  </Carousel>
);
