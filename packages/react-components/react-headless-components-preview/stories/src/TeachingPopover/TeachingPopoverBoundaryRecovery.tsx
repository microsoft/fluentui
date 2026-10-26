// eslint-disable-next-line import/no-extraneous-dependencies -- provided by the stories workspace
import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies -- provided by the stories workspace
import {
  TeachingPopoverCarousel,
  TeachingPopoverCarouselCard,
  TeachingPopoverCarouselFooter,
} from '@fluentui/react-headless-components-preview/teaching-popover';
import styles from './teaching-popover.module.css';

export const BoundaryRecovery = ({ withControl }: { withControl: boolean }): React.ReactNode => (
  <>
    <p>
      This tour starts on step two with Next disabled. Focus Previous and press Enter. On step one, Previous disappears
      and focus moves to {withControl ? 'the available input' : 'the step container'}. No consumer focus handler is
      needed.
    </p>
    <TeachingPopoverCarousel defaultValue="middle">
      <TeachingPopoverCarouselCard value="first" role="group" aria-label="First step" className={styles.recoveryCard}>
        <p>Step one</p>
        <button type="button" disabled>
          Unavailable action
        </button>
        {withControl && (
          <label>
            Available action <input />
          </label>
        )}
      </TeachingPopoverCarouselCard>
      <TeachingPopoverCarouselCard value="middle">Step two</TeachingPopoverCarouselCard>
      <TeachingPopoverCarouselFooter
        className={styles.carouselFooter}
        previous={{
          navType: 'prev',
          children: 'Previous',
          altText: null,
          className: `${styles.actionButton} ${styles.recoveryPrevious}`,
        }}
        next={{ navType: 'next', children: 'Next', altText: 'Done', disabled: true, className: styles.actionButton }}
      />
    </TeachingPopoverCarousel>
    <button type="button">Outside the tour</button>
  </>
);
