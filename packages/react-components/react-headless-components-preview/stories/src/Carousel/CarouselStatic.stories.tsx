import * as React from 'react';
import { Carousel, CarouselCard, CarouselViewport } from '@fluentui/react-headless-components-preview/carousel';
import styles from './carousel.module.css';

/** Without Previous/Next buttons or a `CarouselNav` every slide stays visible, so no content becomes unreachable. */
export const Static = (): React.ReactNode => (
  <div className={styles.example}>
    <Carousel aria-label="All workshops" groupSize={2} className={styles.carousel}>
      <CarouselViewport className={styles.viewport}>
        {['Keyboard navigation', 'Semantic HTML', 'Responsive layouts'].map(workshop => (
          <CarouselCard key={workshop} className={styles.card}>
            {workshop}
          </CarouselCard>
        ))}
      </CarouselViewport>
    </Carousel>
  </div>
);
