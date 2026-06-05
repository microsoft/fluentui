import * as React from 'react';
import { DismissRegular } from '@fluentui/react-icons';
import {
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverCarousel,
  TeachingPopoverCarouselCard,
  TeachingPopoverCarouselFooter,
  TeachingPopoverCarouselNav,
  TeachingPopoverCarouselNavButton,
  TeachingPopoverCarouselPageCount,
  TeachingPopoverHeader,
  TeachingPopoverSurface,
  TeachingPopoverTitle,
  TeachingPopoverTrigger,
} from '@fluentui/react-headless-components-preview/teaching-popover';

import styles from './teaching-popover.module.css';
import popoverStyles from '../Popover/popover.module.css';

const PAGES = ['intro', 'features', 'wrap-up'] as const;

const dismissButtonSlot = {
  className: styles.dismissButton,
  children: <DismissRegular />,
};

export const WithCarousel = (): React.ReactNode => (
  <TeachingPopover positioning={{ offset: 10 }}>
    <TeachingPopoverTrigger>
      <button className={popoverStyles.trigger}>Start tour</button>
    </TeachingPopoverTrigger>
    <TeachingPopoverSurface className={`${popoverStyles.surfaceWithArrow} ${styles.surface}`}>
      <TeachingPopoverCarousel defaultValue={PAGES[0]} announcement={i => `Slide ${i + 1} of ${PAGES.length}`}>
        <div className={styles.carousel}>
          <TeachingPopoverCarouselCard value="intro">
            <TeachingPopoverHeader
              className={styles.header}
              icon={{ className: styles.headerIcon, children: <span aria-hidden>👋</span> }}
              dismissButton={dismissButtonSlot}
            />
            <TeachingPopoverBody className={styles.body}>
              <TeachingPopoverTitle className={styles.title}>Welcome</TeachingPopoverTitle>
              <p className={styles.bodyText}>Let&apos;s take a quick tour of the new features.</p>
            </TeachingPopoverBody>
          </TeachingPopoverCarouselCard>

          <TeachingPopoverCarouselCard value="features">
            <TeachingPopoverHeader
              className={styles.header}
              icon={{ className: styles.headerIcon, children: <span aria-hidden>✨</span> }}
              dismissButton={dismissButtonSlot}
            />
            <TeachingPopoverBody className={styles.body}>
              <TeachingPopoverTitle className={styles.title}>Better workflows</TeachingPopoverTitle>
              <p className={styles.bodyText}>Save time with shortcuts you can configure to taste.</p>
            </TeachingPopoverBody>
          </TeachingPopoverCarouselCard>

          <TeachingPopoverCarouselCard value="wrap-up">
            <TeachingPopoverHeader
              className={styles.header}
              icon={{ className: styles.headerIcon, children: <span aria-hidden>🎉</span> }}
              dismissButton={dismissButtonSlot}
            />
            <TeachingPopoverBody className={styles.body}>
              <TeachingPopoverTitle className={styles.title}>You&apos;re ready</TeachingPopoverTitle>
              <p className={styles.bodyText}>That&apos;s the highlights — explore at your own pace.</p>
            </TeachingPopoverBody>
          </TeachingPopoverCarouselCard>

          <TeachingPopoverCarouselFooter
            className={styles.carouselFooter}
            previous={{ navType: 'prev', altText: 'Back', className: styles.actionButton, children: 'Back' }}
            next={{
              navType: 'next',
              altText: 'Done',
              className: `${styles.actionButton} ${styles.actionButtonPrimary}`,
              children: 'Next',
            }}
          >
            <TeachingPopoverCarouselNav className={styles.carouselNav}>
              {(value: string) => (
                <TeachingPopoverCarouselNavButton aria-label={`Go to ${value}`} className={styles.carouselNavButton} />
              )}
            </TeachingPopoverCarouselNav>
            <TeachingPopoverCarouselPageCount className={styles.pageCount}>
              {(current, total) => `${current} / ${total}`}
            </TeachingPopoverCarouselPageCount>
          </TeachingPopoverCarouselFooter>
        </div>
      </TeachingPopoverCarousel>
    </TeachingPopoverSurface>
  </TeachingPopover>
);
