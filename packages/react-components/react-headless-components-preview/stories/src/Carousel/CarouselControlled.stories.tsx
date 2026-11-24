import * as React from 'react';
import styles from './carousel.module.css';
import { CarouselExample } from './carouselExample.stories';

export const Controlled = (): React.ReactNode => {
  const [index, setIndex] = React.useState(0);
  return (
    <div className={styles.example}>
      <button onClick={() => setIndex(0)}>Return to the first group</button>
      <CarouselExample
        aria-label="Controlled collection"
        activeIndex={index}
        onActiveIndexChange={(_, data) => setIndex(data.index)}
        slides={[
          <input key="1" aria-label="First note" />,
          <input key="2" aria-label="Second note" />,
          <input key="3" aria-label="Third note" />,
        ]}
      />
    </div>
  );
};
