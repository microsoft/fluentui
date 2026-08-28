import * as React from 'react';
import {
  Button as GriffelButton,
  FluentProvider as GriffelFluentProvider,
  TeachingPopover as GriffelTeachingPopover,
  TeachingPopoverBody as GriffelTeachingPopoverBody,
  TeachingPopoverCarousel as GriffelTeachingPopoverCarousel,
  TeachingPopoverCarouselCard as GriffelTeachingPopoverCarouselCard,
  TeachingPopoverCarouselFooter as GriffelTeachingPopoverCarouselFooter,
  TeachingPopoverCarouselNav as GriffelTeachingPopoverCarouselNav,
  TeachingPopoverCarouselNavButton as GriffelTeachingPopoverCarouselNavButton,
  TeachingPopoverCarouselPageCount as GriffelTeachingPopoverCarouselPageCount,
  TeachingPopoverHeader as GriffelTeachingPopoverHeader,
  TeachingPopoverSurface as GriffelTeachingPopoverSurface,
  TeachingPopoverTitle as GriffelTeachingPopoverTitle,
  TeachingPopoverTrigger as GriffelTeachingPopoverTrigger,
  webLightTheme,
} from '@fluentui/react-components';
import {
  Button,
  FluentProvider,
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
} from '@fluentui/react-windmod-preview';

import styles from '../compare.module.css';

const pages = ['1', '2', '3'];

/**
 * Pinned-open windmod carousel next to its Griffel-suite twin. trapFocus is pinned off on both
 * sides, and the windmod surface takes the manual hint mode because both are open at once. The
 * reference takes the two trailing-step strings on the footer; windmod takes each on its own slot.
 */
export const GriffelComparison = (): React.ReactNode => (
  <div className={styles.spacer}>
    <FluentProvider>
      <TeachingPopover open trapFocus={false}>
        <TeachingPopoverTrigger>
          <Button>Windmod</Button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface popover="manual">
          <TeachingPopoverHeader>Getting started</TeachingPopoverHeader>
          <TeachingPopoverCarousel defaultValue="1">
            {pages.map(page => (
              <TeachingPopoverCarouselCard key={page} value={page}>
                <TeachingPopoverBody>
                  <TeachingPopoverTitle>Tip {page}</TeachingPopoverTitle>
                  <span>Body copy for page {page}.</span>
                </TeachingPopoverBody>
              </TeachingPopoverCarouselCard>
            ))}
            <TeachingPopoverCarouselFooter
              previous={{ navType: 'prev', children: 'Previous', altText: 'Close' }}
              next={{ navType: 'next', children: 'Next', altText: 'Finish' }}
            >
              <TeachingPopoverCarouselNav>
                {page => <TeachingPopoverCarouselNavButton aria-label={`Tip ${page}`} />}
              </TeachingPopoverCarouselNav>
              <TeachingPopoverCarouselPageCount>
                {(current, total) => `${current} of ${total}`}
              </TeachingPopoverCarouselPageCount>
            </TeachingPopoverCarouselFooter>
          </TeachingPopoverCarousel>
        </TeachingPopoverSurface>
      </TeachingPopover>
    </FluentProvider>
    <GriffelFluentProvider theme={webLightTheme}>
      <GriffelTeachingPopover open trapFocus={false}>
        <GriffelTeachingPopoverTrigger>
          <GriffelButton>Griffel</GriffelButton>
        </GriffelTeachingPopoverTrigger>
        <GriffelTeachingPopoverSurface>
          <GriffelTeachingPopoverHeader>Getting started</GriffelTeachingPopoverHeader>
          <GriffelTeachingPopoverCarousel defaultValue="1">
            {pages.map(page => (
              <GriffelTeachingPopoverCarouselCard key={page} value={page}>
                <GriffelTeachingPopoverBody>
                  <GriffelTeachingPopoverTitle>Tip {page}</GriffelTeachingPopoverTitle>
                  <span>Body copy for page {page}.</span>
                </GriffelTeachingPopoverBody>
              </GriffelTeachingPopoverCarouselCard>
            ))}
            <GriffelTeachingPopoverCarouselFooter
              initialStepText="Close"
              finalStepText="Finish"
              previous="Previous"
              next="Next"
            >
              <GriffelTeachingPopoverCarouselNav>
                {page => <GriffelTeachingPopoverCarouselNavButton aria-label={`Tip ${page}`} />}
              </GriffelTeachingPopoverCarouselNav>
              <GriffelTeachingPopoverCarouselPageCount>
                {(current, total) => `${current} of ${total}`}
              </GriffelTeachingPopoverCarouselPageCount>
            </GriffelTeachingPopoverCarouselFooter>
          </GriffelTeachingPopoverCarousel>
        </GriffelTeachingPopoverSurface>
      </GriffelTeachingPopover>
    </GriffelFluentProvider>
  </div>
);
