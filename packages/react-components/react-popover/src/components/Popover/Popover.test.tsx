import * as React from 'react';
import { Popover } from './Popover';
import { renderHook } from '@testing-library/react-hooks';
import { usePopover_unstable } from './usePopover';
import { isConformant } from '../../testing/isConformant';

describe('Popover', () => {
  isConformant({
    Component: Popover,
    displayName: 'Popover',
    requiredProps: { children: <div>hello</div> },
    disabledTests: [
      // Popover does not render DOM elements
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      'component-has-static-classnames-object',
      // Popover does not have own styles
      'make-styles-overrides-win',
    ],
    testOptions: {
      'consistent-callback-args': {
        legacyCallbacks: ['onOpenChange'],
      },
    },
  });

  /**
   * Note: see more visual regression tests for Popover in /apps/vr-tests.
   */
  it('Should not render arrow if `coverTarget` is set to true', () => {
    // Act
    const { result } = renderHook(() =>
      usePopover_unstable({ withArrow: true, positioning: { coverTarget: true }, children: <div /> }),
    );

    // Assert
    expect(result.current.withArrow).toBe(false);
  });
});
