import * as React from 'react';
import { Button } from '@fluentui/react-windmod-preview/button';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
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
} from '@fluentui/react-windmod-preview/teaching-popover';

import styles from '../compare.module.css';

const pages = ['1', '2', '3'];

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.spacer}>
      <TeachingPopover>
        <TeachingPopoverTrigger>
          <Button>Click me</Button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>
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
    </div>
  </FluentProvider>
);
