import * as React from 'react';
import { Carousel, CarouselCard, CarouselViewport } from '@fluentui/react-headless-components-preview/carousel';
import { WorkshopSlide, workshops } from './carouselExample';
import styles from './carousel.module.css';

/** Without Previous/Next buttons or a `CarouselNav` every slide stays visible, so no content becomes unreachable. */
export const Static = (): React.ReactNode => (
  <div className={styles.example}>
    <Carousel aria-label="All workshops" groupSize={2} className={styles.carousel}>
      <CarouselViewport className={styles.viewport}>
        {workshops.slice(0, 4).map(workshop => (
          <CarouselCard key={workshop.title} className={styles.card}>
            <WorkshopSlide {...workshop} />
          </CarouselCard>
        ))}
      </CarouselViewport>
    </Carousel>
  </div>
);
