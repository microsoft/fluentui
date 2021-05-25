import * as React from 'react';
import { Popover } from './Popover';
import * as renderer from 'react-test-renderer';
import { renderHook } from '@testing-library/react-hooks';
import { ReactWrapper } from 'enzyme';
import { usePopover } from './usePopover';

describe('Popover', () => {
  let wrapper: ReactWrapper | undefined;

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
      wrapper = undefined;
    }
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
    const { result } = renderHook(() => usePopover({ coverTarget: true, children: null }));

    // Assert
    expect(result.current.noArrow).toBe(true);
  });
});
