import * as React from 'react';
import { Button } from '@fluentui/react-windmod-preview/button';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import {
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverCarousel,
  TeachingPopoverCarouselCard,
  TeachingPopoverCarouselFooter,
  TeachingPopoverCarouselPageCount,
  TeachingPopoverHeader,
  TeachingPopoverSurface,
  TeachingPopoverTitle,
  TeachingPopoverTrigger,
} from '@fluentui/react-windmod-preview/teaching-popover';

import styles from '../compare.module.css';

const pages = ['1', '2'];

/** The offset layout right-aligns both buttons and puts the previous one after the row's children. */
export const OffsetLayout = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.spacer}>
      <TeachingPopover appearance="brand">
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
              layout="offset"
              previous={{ navType: 'prev', children: 'Previous', altText: 'Close' }}
              next={{ navType: 'next', children: 'Next', altText: 'Finish' }}
            >
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
