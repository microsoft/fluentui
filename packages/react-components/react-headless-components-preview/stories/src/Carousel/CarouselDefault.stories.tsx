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
import { arrowIcon, arrowTooltip, WorkshopSlide, workshops } from './carouselExample';
import styles from './carousel.module.css';

export const Default = (): React.ReactNode => (
  <div className={styles.example}>
    <Carousel aria-label="Upcoming workshops" className={styles.carousel}>
      <CarouselPrevious button={{ className: styles.button, icon: arrowIcon('previous'), children: arrowTooltip }} />
      <CarouselViewport className={styles.viewport}>
        {workshops.slice(0, 3).map(workshop => (
          <CarouselCard key={workshop.title} className={styles.card}>
            <WorkshopSlide {...workshop} />
          </CarouselCard>
        ))}
      </CarouselViewport>
      <CarouselNext button={{ className: styles.button, icon: arrowIcon('next'), children: arrowTooltip }} />
      <CarouselNav className={styles.nav}>
        {() => <CarouselNavButton className={styles.navButton} indicator={{ className: styles.indicator }} />}
      </CarouselNav>
    </Carousel>
  </div>
);
