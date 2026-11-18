import { makeStyles } from '@griffel/react';

/**
 * App overrides of positioned surfaces: a fixed width, a capped and scrolling height and a stacking order, which
 * change the surface size (and so where Floating UI places it) as well as its styles.
 */
export const useSurfaceOverrideStyles = makeStyles({
  surface: {
    width: '240px',
    maxHeight: '96px',
    overflow: 'auto',
    zIndex: 10,
  },
  /** Overflow boundary small enough that the default placement doesn't fit and fallback positions are used. */
  boundary: {
    position: 'relative',
    overflow: 'hidden',
    width: '360px',
    height: '160px',
  },
  /** Places the trigger at the boundary's bottom start. */
  bottomTrigger: {
    position: 'absolute',
    bottom: '0px',
    left: '0px',
  },
  /** A stacking context the app mounts surfaces into. */
  layer: {
    position: 'relative',
    zIndex: 2,
  },
});
