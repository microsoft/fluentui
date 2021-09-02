import * as React from 'react';
import { Popover } from './Popover';
import * as renderer from 'react-test-renderer';
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
  it('renders a default state', () => {
    const component = renderer.create(<Popover>Default Popover</Popover>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should not render arrow if `coverTarget` is set to true', () => {
    // Act
    const { result } = renderHook(() => usePopover({ positioning: { coverTarget: true }, children: null }));

    // Assert
    expect(result.current.noArrow).toBe(true);
  });
});
