import * as React from 'react';
import styles from './carousel.module.css';
import { CarouselExample } from './carouselExample';

export const Grouped = (): React.ReactNode => (
  <div className={styles.example}>
    <CarouselExample
      aria-label="Field notes"
      dir="rtl"
      groupSize={2}
      slides={['Woodland', 'Wetland', 'Meadow', 'Estuary', 'Coast'].map(habitat => (
        <details key={habitat}>
          <summary>{habitat}</summary>
          Observations from the {habitat.toLowerCase()} survey.
        </details>
      ))}
    />
  </div>
);
