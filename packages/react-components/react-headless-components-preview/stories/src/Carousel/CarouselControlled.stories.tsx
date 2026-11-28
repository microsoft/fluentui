import * as React from 'react';
import styles from './carousel.module.css';
import { CarouselExample } from './carouselExample';

const notes = ['Agenda', 'Decisions', 'Follow-ups'];

export const Controlled = (): React.ReactNode => {
  const [index, setIndex] = React.useState(0);
  return (
    <div className={styles.example}>
      <button className={styles.control} onClick={() => setIndex(0)}>
        Return to the first group
      </button>
      <CarouselExample
        aria-label="Meeting notes"
        activeIndex={index}
        onActiveIndexChange={(_, data) => setIndex(data.index)}
        slides={notes.map(note => (
          <label key={note} className={styles.label}>
            {note}
            <input className={styles.input} placeholder={`Add ${note.toLowerCase()}…`} />
          </label>
        ))}
      />
    </div>
  );
};
