import * as React from 'react';
import { Button } from '@fluentui/react-windmod-preview/button';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import {
  TeachingPopover,
  TeachingPopoverBody,
  TeachingPopoverFooter,
  TeachingPopoverHeader,
  TeachingPopoverSurface,
  TeachingPopoverTitle,
  TeachingPopoverTrigger,
} from '@fluentui/react-windmod-preview/teaching-popover';

import styles from '../compare.module.css';

/** On a brand surface the emphasis moves to the SECONDARY action, matching Griffel. */
export const AppearanceBrand = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.spacer}>
      <TeachingPopover appearance="brand">
        <TeachingPopoverTrigger>
          <Button>Click me (brand)</Button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>
          <TeachingPopoverHeader>Getting started</TeachingPopoverHeader>
          <TeachingPopoverTitle>Brand appearance</TeachingPopoverTitle>
          <TeachingPopoverBody>
            <span>Header, title, both dismiss glyphs and both buttons repaint.</span>
          </TeachingPopoverBody>
          <TeachingPopoverFooter primary={{ children: 'Next' }} secondary={{ children: 'Back' }} />
        </TeachingPopoverSurface>
      </TeachingPopover>
    </div>
  </FluentProvider>
);
