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
import {
  Button as GriffelButton,
  FluentProvider as GriffelFluentProvider,
  TeachingPopover as GriffelTeachingPopover,
  TeachingPopoverBody as GriffelTeachingPopoverBody,
  TeachingPopoverFooter as GriffelTeachingPopoverFooter,
  TeachingPopoverHeader as GriffelTeachingPopoverHeader,
  TeachingPopoverSurface as GriffelTeachingPopoverSurface,
  TeachingPopoverTitle as GriffelTeachingPopoverTitle,
  TeachingPopoverTrigger as GriffelTeachingPopoverTrigger,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

/**
 * Pinned-open windmod teaching popover next to its Griffel-suite twin. trapFocus is pinned off on
 * both sides: Griffel defaults it on, and two focus traps in one page fight each other.
 */
export const GriffelComparison = (): React.ReactNode => (
  <div className={styles.spacer}>
    <FluentProvider>
      <TeachingPopover open trapFocus={false}>
        <TeachingPopoverTrigger>
          <Button>Windmod</Button>
        </TeachingPopoverTrigger>
        {/* popover='manual' ONLY because both sides are pinned open at once: popover='auto'
            surfaces are mutually exclusive by spec. */}
        <TeachingPopoverSurface popover="manual">
          <TeachingPopoverHeader>Getting started</TeachingPopoverHeader>
          <TeachingPopoverTitle>Windmod</TeachingPopoverTitle>
          <TeachingPopoverBody>
            <span>Windmod teaching popover</span>
          </TeachingPopoverBody>
          <TeachingPopoverFooter primary={{ children: 'Next' }} secondary={{ children: 'Back' }} />
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
          <GriffelTeachingPopoverTitle>Griffel</GriffelTeachingPopoverTitle>
          <GriffelTeachingPopoverBody>
            <span>Griffel teaching popover</span>
          </GriffelTeachingPopoverBody>
          <GriffelTeachingPopoverFooter primary={{ children: 'Next' }} secondary={{ children: 'Back' }} />
        </GriffelTeachingPopoverSurface>
      </GriffelTeachingPopover>
    </GriffelFluentProvider>
  </div>
);
