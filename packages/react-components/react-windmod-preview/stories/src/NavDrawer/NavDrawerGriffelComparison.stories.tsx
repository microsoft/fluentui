import * as React from 'react';
import {
  Button,
  FluentProvider,
  NavDrawer,
  NavDrawerBody,
  NavDrawerFooter,
  NavDrawerHeader,
  NavItem,
} from '@fluentui/react-windmod-preview';
import {
  Button as GriffelButton,
  FluentProvider as GriffelFluentProvider,
  NavDrawer as GriffelNavDrawer,
  NavDrawerBody as GriffelNavDrawerBody,
  NavDrawerFooter as GriffelNavDrawerFooter,
  NavDrawerHeader as GriffelNavDrawerHeader,
  NavItem as GriffelNavItem,
  webLightTheme,
} from '@fluentui/react-components';

import styles from '../compare.module.css';

type Variant = {
  label: string;
  header?: boolean;
  footer?: boolean;
  footerRows?: number;
  size?: 'small' | 'medium' | 'large' | 'full';
  density?: 'small' | 'medium';
};

/* `body only` is the cell that adjudicates the edge padding: a body that is both first and last
   child keeps DrawerBody's own 25px, which no other arrangement shows. */
const variants: Variant[] = [
  { label: 'header + body + footer', header: true, footer: true },
  { label: 'body only' },
  { label: 'header + body', header: true },
  { label: 'body + footer', footer: true },
  { label: 'size medium', header: true, footer: true, size: 'medium' },
  { label: 'density small', header: true, footer: true, density: 'small' },
  { label: 'footer, two rows', header: true, footer: true, footerRows: 2 },
];

const frame: React.CSSProperties = { height: 320, display: 'flex' };

const destinations = ['Home', 'Documents', 'Settings'];

/**
 * Every windmod variant next to its Griffel-suite twin (inside a Griffel FluentProvider).
 * The pair in each row must be pixel-identical.
 */
export const GriffelComparison = (): React.ReactNode => (
  <div className={styles.grid}>
    <div className={styles.header}>Variant</div>
    <div className={styles.header}>Windmod</div>
    <div className={styles.header}>Griffel</div>

    {variants.map(variant => (
      <React.Fragment key={variant.label}>
        <div className={styles.label}>{variant.label}</div>

        <FluentProvider>
          <div style={frame}>
            <NavDrawer type="inline" open size={variant.size} density={variant.density}>
              {variant.header && (
                <NavDrawerHeader>
                  <Button appearance="subtle">Menu</Button>
                </NavDrawerHeader>
              )}
              <NavDrawerBody>
                {destinations.map((destination, index) => (
                  <NavItem key={destination} value={String(index + 1)}>
                    {destination}
                  </NavItem>
                ))}
              </NavDrawerBody>
              {variant.footer && (
                <NavDrawerFooter>
                  {Array.from({ length: variant.footerRows ?? 1 }, (_, index) => (
                    <Button key={index}>Action {index + 1}</Button>
                  ))}
                </NavDrawerFooter>
              )}
            </NavDrawer>
          </div>
        </FluentProvider>

        <GriffelFluentProvider theme={webLightTheme}>
          <div style={frame}>
            <GriffelNavDrawer type="inline" open size={variant.size} density={variant.density}>
              {variant.header && (
                <GriffelNavDrawerHeader>
                  <GriffelButton appearance="subtle">Menu</GriffelButton>
                </GriffelNavDrawerHeader>
              )}
              <GriffelNavDrawerBody>
                {destinations.map((destination, index) => (
                  <GriffelNavItem key={destination} value={String(index + 1)}>
                    {destination}
                  </GriffelNavItem>
                ))}
              </GriffelNavDrawerBody>
              {variant.footer && (
                <GriffelNavDrawerFooter>
                  {Array.from({ length: variant.footerRows ?? 1 }, (_, index) => (
                    <GriffelButton key={index}>Action {index + 1}</GriffelButton>
                  ))}
                </GriffelNavDrawerFooter>
              )}
            </GriffelNavDrawer>
          </div>
        </GriffelFluentProvider>
      </React.Fragment>
    ))}
  </div>
);
