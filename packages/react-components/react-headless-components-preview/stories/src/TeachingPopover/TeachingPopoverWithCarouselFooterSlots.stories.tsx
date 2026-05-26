import * as React from 'react';
import {
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverCarousel,
  TeachingPopoverCarouselCard,
  TeachingPopoverCarouselFooter,
  TeachingPopoverSurface,
  TeachingPopoverTitle,
  TeachingPopoverTrigger,
} from '@fluentui/react-headless-components-preview/teaching-popover';

import styles from './teaching-popover.module.css';
import popoverStyles from '../Popover/popover.module.css';

const PAGES = ['intro', 'features', 'wrap-up'] as const;

export const WithCarouselFooterSlots = (): React.ReactNode => (
  <TeachingPopover positioning={{ offset: 10 }}>
    <TeachingPopoverTrigger>
      <button className={popoverStyles.trigger}>Start tour</button>
    </TeachingPopoverTrigger>
    <TeachingPopoverSurface className={`${popoverStyles.surfaceWithArrow} ${styles.surface}`}>
      <TeachingPopoverCarousel defaultValue={PAGES[0]} announcement={i => `Slide ${i + 1} of ${PAGES.length}`}>
        <div className={styles.carousel}>
          <TeachingPopoverCarouselCard value="intro">
            <TeachingPopoverBody className={styles.body}>
              <TeachingPopoverTitle className={styles.title}>Welcome</TeachingPopoverTitle>
              <p className={styles.bodyText}>Buttons below come from `previous` / `next` slots.</p>
            </TeachingPopoverBody>
          </TeachingPopoverCarouselCard>

          <TeachingPopoverCarouselCard value="features">
            <TeachingPopoverBody className={styles.body}>
              <TeachingPopoverTitle className={styles.title}>Slot defaults</TeachingPopoverTitle>
              <p className={styles.bodyText}>
                The hook supplies `navType: &apos;prev&apos; / &apos;next&apos;`; consumers only pass `altText` and
                content.
              </p>
            </TeachingPopoverBody>
          </TeachingPopoverCarouselCard>

          <TeachingPopoverCarouselCard value="wrap-up">
            <TeachingPopoverBody className={styles.body}>
              <TeachingPopoverTitle className={styles.title}>That&apos;s it</TeachingPopoverTitle>
              <p className={styles.bodyText}>Slot API keeps the markup terse for simple carousels.</p>
            </TeachingPopoverBody>
          </TeachingPopoverCarouselCard>

          <TeachingPopoverCarouselFooter
            className={styles.carouselFooter}
            previous={{ altText: 'Back', className: styles.actionButton, children: 'Back' }}
            next={{
              altText: 'Done',
              className: `${styles.actionButton} ${styles.actionButtonPrimary}`,
              children: 'Next',
            }}
          />
        </div>
      </TeachingPopoverCarousel>
    </TeachingPopoverSurface>
  </TeachingPopover>
);
