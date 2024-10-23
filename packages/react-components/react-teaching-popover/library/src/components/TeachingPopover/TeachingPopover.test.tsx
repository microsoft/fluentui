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
      // Popover does not have own styles
      'make-styles-overrides-win',
      // Our callbacks are intended to be simplified
      'consistent-callback-args',
    ],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests
});
