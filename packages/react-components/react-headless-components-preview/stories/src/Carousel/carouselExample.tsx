// eslint-disable-next-line import/no-extraneous-dependencies -- Shared story helper uses development dependencies.
import * as React from 'react';
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

const chevron = (glyph: string) => ({ children: glyph, 'aria-hidden': true });

/** Shared story composition: autoplay button first, arrows around the viewport, nav below. */
export const CarouselExample = ({
  slides,
  autoplay = false,
  ...props
}: CarouselProps & { slides: React.ReactNode[]; autoplay?: boolean }): React.ReactElement => (
  <Carousel className={styles.carousel} transition={carouselTransition} {...props}>
    {autoplay && <CarouselAutoplayButton className={styles.button} />}
    <CarouselPrevious
      button={{ className: styles.button, icon: chevron('‹') }}
      tooltip={{ className: styles.tooltip }}
    />
    <CarouselViewport className={styles.viewport}>
      {slides.map((slide, i) => (
        <CarouselCard key={i} className={styles.card}>
          {slide}
        </CarouselCard>
      ))}
    </CarouselViewport>
    <CarouselNext button={{ className: styles.button, icon: chevron('›') }} tooltip={{ className: styles.tooltip }} />
    <CarouselNav className={styles.nav}>
      <CarouselNavButton className={styles.navButton} indicator={{ className: styles.indicator }} />
    </CarouselNav>
  </Carousel>
);
