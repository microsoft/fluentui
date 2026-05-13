import * as React from 'react';
import {
  TeachingPopover,
  TeachingPopoverTrigger,
  TeachingPopoverSurface,
  TeachingPopoverHeader,
  TeachingPopoverTitle,
  TeachingPopoverBody,
  TeachingPopoverCarousel,
  TeachingPopoverCarouselCard,
  TeachingPopoverCarouselFooter,
  TeachingPopoverCarouselFooterButton,
  TeachingPopoverCarouselNav,
  TeachingPopoverCarouselNavButton,
  TeachingPopoverCarouselPageCount,
} from '@fluentui/react-headless-components-preview/teaching-popover';

import styles from './teaching-popover.module.css';

const PAGES = ['intro', 'features', 'wrap-up'] as const;

export const WithCarousel = (): React.ReactNode => (
  <TeachingPopover>
    <TeachingPopoverTrigger>
      <button className={styles.trigger}>Start tour</button>
    </TeachingPopoverTrigger>
    <TeachingPopoverSurface className={styles.surface}>
      <TeachingPopoverCarousel defaultValue={PAGES[0]} announcement={i => `Slide ${i + 1} of ${PAGES.length}`}>
        <div className={styles.carousel}>
          <TeachingPopoverCarouselCard value="intro">
            <TeachingPopoverHeader className={styles.header}>
              <span aria-hidden>👋</span>
              <span className={styles.headerSpacer} />
              <button className={styles.iconButton}>×</button>
            </TeachingPopoverHeader>
            <TeachingPopoverTitle className={styles.title}>Welcome</TeachingPopoverTitle>
            <TeachingPopoverBody className={styles.body}>
              Let&apos;s take a quick tour of the new features.
            </TeachingPopoverBody>
          </TeachingPopoverCarouselCard>

          <TeachingPopoverCarouselCard value="features">
            <TeachingPopoverHeader className={styles.header}>
              <span aria-hidden>✨</span>
              <span className={styles.headerSpacer} />
              <button className={styles.iconButton}>×</button>
            </TeachingPopoverHeader>
            <TeachingPopoverTitle className={styles.title}>Better workflows</TeachingPopoverTitle>
            <TeachingPopoverBody className={styles.body}>
              Save time with shortcuts you can configure to taste.
            </TeachingPopoverBody>
          </TeachingPopoverCarouselCard>

          <TeachingPopoverCarouselCard value="wrap-up">
            <TeachingPopoverHeader className={styles.header}>
              <span aria-hidden>🎉</span>
              <span className={styles.headerSpacer} />
              <button className={styles.iconButton}>×</button>
            </TeachingPopoverHeader>
            <TeachingPopoverTitle className={styles.title}>You&apos;re ready</TeachingPopoverTitle>
            <TeachingPopoverBody className={styles.body}>
              That&apos;s the highlights — explore at your own pace.
            </TeachingPopoverBody>
          </TeachingPopoverCarouselCard>

          <TeachingPopoverCarouselFooter className={styles.carouselFooter}>
            <TeachingPopoverCarouselFooterButton navType="prev" altText="Back" className={styles.actionButton}>
              Previous
            </TeachingPopoverCarouselFooterButton>
            <TeachingPopoverCarouselNav className={styles.carouselNav}>
              {(value: string) => (
                <TeachingPopoverCarouselNavButton aria-label={`Go to ${value}`} className={styles.carouselNavButton} />
              )}
            </TeachingPopoverCarouselNav>
            <TeachingPopoverCarouselPageCount className={styles.pageCount}>
              {(current, total) => `${current} / ${total}`}
            </TeachingPopoverCarouselPageCount>
            <TeachingPopoverCarouselFooterButton
              navType="next"
              altText="Done"
              className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
            >
              Next
            </TeachingPopoverCarouselFooterButton>
          </TeachingPopoverCarouselFooter>
        </div>
      </TeachingPopoverCarousel>
    </TeachingPopoverSurface>
  </TeachingPopover>
);
