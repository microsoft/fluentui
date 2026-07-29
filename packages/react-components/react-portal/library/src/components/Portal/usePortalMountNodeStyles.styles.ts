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
