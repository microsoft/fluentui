import * as React from 'react';
import {
  Carousel,
  CarouselNext,
  CarouselNav,
  CarouselNavButton,
  CarouselPrevious,
  CarouselCard,
  CarouselViewport,
} from '@fluentui/react-headless-components-preview/carousel';
import { carouselTransition } from './carouselTransition';
import styles from './carousel.module.css';

const workshops = ['Designing for keyboard navigation', 'Choosing semantic HTML', 'Testing responsive layouts'];

export const Default = (): React.ReactNode => (
  <div className={styles.example}>
    <Carousel aria-label="Upcoming workshops" className={styles.carousel} transition={carouselTransition}>
      <CarouselPrevious
        button={{ className: styles.button, icon: { children: '‹', 'aria-hidden': true } }}
        tooltip={{ className: styles.tooltip }}
      />
      <CarouselViewport className={styles.viewport}>
        {workshops.map(workshop => (
          <CarouselCard key={workshop} className={styles.card}>
            <article>{workshop}</article>
          </CarouselCard>
        ))}
      </CarouselViewport>
      <CarouselNext
        button={{ className: styles.button, icon: { children: '›', 'aria-hidden': true } }}
        tooltip={{ className: styles.tooltip }}
      />
      <CarouselNav className={styles.nav}>
        {() => <CarouselNavButton className={styles.navButton} indicator={{ className: styles.indicator }} />}
      </CarouselNav>
    </Carousel>
  </div>
);
