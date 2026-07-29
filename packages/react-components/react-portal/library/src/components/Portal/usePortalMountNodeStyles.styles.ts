'use client'; // eslint-disable-line @fluentui/react-components/enforce-use-client -- see NOTE below

/*
 * NOTE on the directive above (Griffel → Tailwind + CSS Modules migration):
 * a converted styles file calls no React hook and no RSC-unsafe function (`makeStyles` is
 * gone), so `enforce-use-client` is right that `'use client'` is now unnecessary. It is
 * kept because migration/griffel-to-tailwind/CONVERSION_GUIDE.md §3 makes a conversion a
 * pure styling change; dropping directives is a Phase 3 sweep across all 180 style hooks.
 *
 * The suppression is a trailing `eslint-disable-line` rather than a leading
 * `eslint-disable` block because a leading block comment pushes `'use client'` off the
 * first line of the emitted lib/lib-commonjs output — every other v9 source file in the
 * repo has the directive at line 1.
 */

import styles from './Portal.module.css';

/**
 * Module classes for the portal MOUNT NODE — the `<div data-portal-node="true">` that
 * `usePortalMountNode()` creates on `document.body` (or on the `PortalMountNodeProvider`
 * target) and into which `renderPortal_unstable` portals its children.
 *
 * Hoisted to module scope rather than rebuilt per call: the map is frozen at build time by
 * the CSS-Modules class map, so there is nothing to recompute.
 */
const portalMountNodeStyles: { root: string } = {
  root: styles['mount-node'],
};

/**
 * Applies style classnames to the portal mount node.
 *
 * Unlike every other converted styles hook this one does NOT compose the final class string:
 * react-portal has no slot object to mutate — the mount node is a raw DOM element and its
 * `className` is assembled in `usePortalMountNode.ts`, where the two other contributors live
 * (the FluentProvider theme class read from context, and the consumer's
 * `mountNode={{ className }}`). The named group marker is stamped there, next to them, for
 * the same reason. The function shape and the export name are kept from the Griffel version
 * so the call site is unchanged (CONVERSION_GUIDE.md §3).
 */
export const usePortalMountNodeStylesStyles = (): { root: string } => portalMountNodeStyles;
