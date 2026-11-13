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

export const Default = (): React.ReactNode => (
  <FluentProvider>
    <div className={styles.spacer}>
      <TeachingPopover>
        <TeachingPopoverTrigger>
          <Button>Click me</Button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>
          <TeachingPopoverHeader>Getting started</TeachingPopoverHeader>
          <TeachingPopoverTitle>Welcome</TeachingPopoverTitle>
          <TeachingPopoverBody>
            <span>The header glyph and both dismiss buttons come from the styled layer.</span>
          </TeachingPopoverBody>
          <TeachingPopoverFooter primary={{ children: 'Next' }} secondary={{ children: 'Back' }} />
        </TeachingPopoverSurface>
      </TeachingPopover>
      <TeachingPopover>
        <TeachingPopoverTrigger>
          <Button>Click me (vertical footer)</Button>
        </TeachingPopoverTrigger>
        <TeachingPopoverSurface>
          <TeachingPopoverTitle dismissButton={{}}>Stacked actions</TeachingPopoverTitle>
          <TeachingPopoverBody mediaLength="short" media={{ style: { backgroundColor: '#0f6cbd' } }}>
            <span>A media slot keeps a fixed aspect ratio.</span>
          </TeachingPopoverBody>
          <TeachingPopoverFooter
            footerLayout="vertical"
            primary={{ children: 'Got it' }}
            secondary={{ children: 'Remind me later' }}
          />
        </TeachingPopoverSurface>
      </TeachingPopover>
    </div>
  </FluentProvider>
);
