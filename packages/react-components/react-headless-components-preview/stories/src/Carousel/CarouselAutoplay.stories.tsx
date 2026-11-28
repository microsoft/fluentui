import * as React from 'react';
import styles from './carousel.module.css';
import { CarouselExample, WorkshopSlide, workshops } from './carouselExample';

export const Autoplay = (): React.ReactNode => (
  <div className={styles.example}>
    <CarouselExample
      aria-label="Featured workshops"
      circular
      autoplay
      slides={workshops.map(workshop => (
        <WorkshopSlide key={workshop.title} {...workshop} />
      ))}
    />
  </div>
);
