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
import { arrowIcon, WorkshopSlide, workshops } from './carouselExample';
import styles from './carousel.module.css';

export const Default = (): React.ReactNode => (
  <div className={styles.example}>
    <Carousel aria-label="Upcoming workshops" className={styles.carousel} transition={carouselTransition}>
      <CarouselPrevious
        button={{ className: styles.button, icon: arrowIcon('previous') }}
        tooltip={{ className: styles.tooltip }}
      />
      <CarouselViewport className={styles.viewport}>
        {workshops.slice(0, 3).map(workshop => (
          <CarouselCard key={workshop.title} className={styles.card}>
            <WorkshopSlide {...workshop} />
          </CarouselCard>
        ))}
      </CarouselViewport>
      <CarouselNext
        button={{ className: styles.button, icon: arrowIcon('next') }}
        tooltip={{ className: styles.tooltip }}
      />
      <CarouselNav className={styles.nav}>
        {() => <CarouselNavButton className={styles.navButton} indicator={{ className: styles.indicator }} />}
      </CarouselNav>
    </Carousel>
  </div>
);
