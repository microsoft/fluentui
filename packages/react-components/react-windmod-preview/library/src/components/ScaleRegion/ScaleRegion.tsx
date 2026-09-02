'use client';

import * as React from 'react';
import { clsx } from 'clsx';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useIsomorphicLayoutEffect, useMergedRefs } from '@fluentui/react-utilities';

import { ThemeClassContext } from '../FluentProvider/themeClassContext';
import type { ScaleRegionProps } from './ScaleRegion.types';

import styles from './ScaleRegion.module.css';

/**
 * The theme package's scale-mechanism class — NOT a module class; the rules arrive with the
 * theme stylesheet (react-tailwind-theme-preview, generated into its base sheet). There the
 * class is grouped into the `:root, :host` invariant emission, re-declaring every
 * scale-riding token formula at this element, and matched by the rule deriving `--fui-scale`
 * from `data-fui-scale` via typed attr().
 */
const scaleRegionThemeClass = 'fui-scale-region';

/** Documents already warned about, so a page full of unthemed regions warns at most once. */
const warned = new WeakSet<Document>();

/**
 * Scales everything inside it by a unitless factor on the ambient base scale — larger
 * (`scale={1.5}` tutorial highlight) or smaller (`scale={0.75}` condensed density) — without
 * taking part in layout: the rendered div is `display: contents`. Must sit inside a themed
 * FluentProvider; the region re-stamps the provider's theme class so theme-owned token
 * formulas (the type ramp, shadow geometry) re-substitute at the region and follow the
 * factor. Nested regions replace the factor absolutely; they never compound.
 */
export const ScaleRegion: ForwardRefComponent<ScaleRegionProps> = React.forwardRef(
  ({ scale, className, children, ...rest }, ref) => {
    const themeClass = React.useContext(ThemeClassContext);

    // A ref to a display:contents element is still meaningful (attributes, observers) — only
    // box generation is suppressed. The internal ref feeds the dev warning's document lookup.
    const elementRef = React.useRef<HTMLDivElement>(null);
    const mergedRef = useMergedRefs(ref, elementRef);

    // Development-only, once per document: an unthemed region scales the invariant tokens but
    // not the theme-owned ones, which reads as a half-broken zoom rather than a missing
    // provider. Compiled out of production builds.
    useIsomorphicLayoutEffect(() => {
      if (process.env.NODE_ENV === 'production') {
        return;
      }

      const doc = elementRef.current?.ownerDocument;

      if (themeClass !== undefined || !doc || warned.has(doc)) {
        return;
      }

      warned.add(doc);
      // eslint-disable-next-line no-console
      console.warn(
        '@fluentui/react-windmod-preview: this ScaleRegion has no themed FluentProvider above ' +
          'it, so it cannot re-stamp the ambient theme class. Theme-owned tokens (the type ' +
          'ramp, shadow geometry) will not follow the scale inside the region — only the ' +
          'theme-invariant spacing, stroke and icon tokens will. Wrap the region in ' +
          '<FluentProvider theme={…}>, or pass a theme to the provider it is already inside.',
      );
    }, [themeClass]);

    return (
      <div
        ref={mergedRef}
        {...rest}
        data-fui-scale={scale}
        className={clsx(scaleRegionThemeClass, themeClass, styles.root, className)}
      >
        {children}
      </div>
    );
  },
) as ForwardRefComponent<ScaleRegionProps>;

ScaleRegion.displayName = 'ScaleRegion';

/** Re-exported for the test, which needs to clear the once-per-document latch between cases. */
export const clearScaleRegionWarnings = (doc: Document): void => {
  warned.delete(doc);
};
