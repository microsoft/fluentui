import * as React from 'react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopover } from './TeachingPopover';

describe('TeachingPopover', () => {
  isConformant({
    Component: TeachingPopover,
    displayName: 'TeachingPopover',
    requiredProps: { children: <div>hello</div> },
    disabledTests: [
      // Popover does not render DOM elements
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      // ...and therefore has no element to carry the Tailwind named-group marker either.
      // `component-has-group-marker` became a default test with the statics-removal sweep
      // (DECISIONS.md D16.6); TeachingPopover renders only context providers around its
      // trigger and surface, so `getTargetElement` would resolve to the consumer's own child.
      // TeachingPopoverSurface — the outermost element this component actually renders —
      // carries the marker (migration/griffel-to-tailwind).
      'component-has-group-marker',
      // Popover does not have own styles
      // Our callbacks are intended to be simplified
      'consistent-callback-args',
    ],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests
});
