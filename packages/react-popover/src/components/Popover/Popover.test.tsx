import * as React from 'react';
import { Popover } from './Popover';
import { renderHook } from '@testing-library/react-hooks';
import { usePopover } from './usePopover';
import { isConformant } from '../../common/isConformant';

describe('Popover', () => {
  isConformant({
    Component: Popover,
    displayName: 'Popover',
    skipAsPropTests: true,
    disabledTests: [
      // Popover does not render DOM elements
      'component-handles-ref',
      'component-has-root-ref',
      'component-handles-classname',
      // Popover does not have own styles
      'make-styles-overrides-win',
    ],
  });

  /**
   * Note: see more visual regression tests for Popover in /apps/vr-tests.
   */
  it('Should not render arrow if `coverTarget` is set to true', () => {
    // Act
    const { result } = renderHook(() => usePopover({ positioning: { coverTarget: true }, children: <div /> }));

    // Assert
    expect(result.current.noArrow).toBe(true);
  });
});
