import * as React from 'react';
import { Button } from '@fluentui/react-windmod-preview/button';
import {
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
} from '@fluentui/react-windmod-preview/drawer';
import { FluentProvider } from '@fluentui/react-windmod-preview/provider';
import {
  Button as GriffelButton,
  DrawerBody as GriffelDrawerBody,
  DrawerFooter as GriffelDrawerFooter,
  DrawerHeader as GriffelDrawerHeader,
  DrawerHeaderTitle as GriffelDrawerHeaderTitle,
  FluentProvider as GriffelFluentProvider,
  InlineDrawer as GriffelInlineDrawer,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

const positions = ['start', 'end', 'bottom'] as const;
const sizes = ['small', 'medium', 'large'] as const;

type LookProps = {
  position?: (typeof positions)[number];
  size?: (typeof sizes)[number];
  separator?: boolean;
};

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical. The inline drawer is used throughout: an overlay
 * drawer promotes to the top layer, so two of them cannot share a row.
 */
export const GriffelComparison = (): React.ReactNode => {
  const variants: { label: string; props: LookProps }[] = [
    ...positions.map(position => ({ label: position, props: { position } })),
    ...sizes.map(size => ({ label: size, props: { size } })),
    ...positions.map(position => ({ label: `${position} + separator`, props: { position, separator: true } })),
  ];

  return (
    <div className={styles.grid}>
      <div className={styles.header}>Variant</div>
      <div className={styles.header}>Windmod</div>
      <div className={styles.header}>Griffel</div>

      {variants.map(({ label, props }) => (
        <React.Fragment key={label}>
          <div className={styles.label}>{label}</div>

          <FluentProvider>
            <div style={{ display: 'flex', height: 180 }}>
              <InlineDrawer open {...props}>
                <DrawerHeader>
                  <DrawerHeaderTitle action={<Button appearance="subtle">Close</Button>}>Title</DrawerHeaderTitle>
                </DrawerHeader>
                <DrawerBody>
                  <p>Body</p>
                </DrawerBody>
                <DrawerFooter>
                  <Button appearance="primary">Save</Button>
                </DrawerFooter>
              </InlineDrawer>
            </div>
          </FluentProvider>

          <GriffelFluentProvider theme={webLightTheme}>
            <div style={{ display: 'flex', height: 180 }}>
              <GriffelInlineDrawer open {...props}>
                <GriffelDrawerHeader>
                  <GriffelDrawerHeaderTitle action={<GriffelButton appearance="subtle">Close</GriffelButton>}>
                    Title
                  </GriffelDrawerHeaderTitle>
                </GriffelDrawerHeader>
                <GriffelDrawerBody>
                  <p>Body</p>
                </GriffelDrawerBody>
                <GriffelDrawerFooter>
                  <GriffelButton appearance="primary">Save</GriffelButton>
                </GriffelDrawerFooter>
              </GriffelInlineDrawer>
            </div>
          </GriffelFluentProvider>
        </React.Fragment>
      ))}
    </div>
  );
};
