import * as React from 'react';
import styles from './carousel.module.css';
import { CarouselExample } from './carouselExample';

export const Autoplay = (): React.ReactNode => (
  <div className={styles.example}>
    <CarouselExample
      aria-label="Featured workshops"
      circular
      autoplay
      slides={[
        <article key="1">Designing for keyboard navigation</article>,
        <article key="2">Choosing semantic HTML</article>,
        <article key="3">Testing responsive layouts</article>,
      ]}
    />
  </div>
);
