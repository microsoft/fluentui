import * as React from 'react';
import { useARIAButtonShorthand, useARIAButtonProps, ARIAButtonProps, ARIAButtonSlotProps } from './useARIAButton';
import { renderHook } from '@testing-library/react-hooks';
import { fireEvent, render } from '@testing-library/react';
import { getSlots, Slot, ComponentProps } from '@fluentui/react-utilities';

const TestButton = (props: ComponentProps<{ root: Slot<ARIAButtonSlotProps> }>) => {
  const { slots, slotProps } = getSlots<{ root: Slot<ARIAButtonSlotProps> }>({
    components: { root: 'button' },
    root: useARIAButtonShorthand(props, { required: true }),
  });
  return <slots.root {...slotProps.root} />;
};

describe('useARIAButton', () => {
  describe('<button>', () => {
    it('should return props for a button', () => {
      const handle = () => {
        /* noop */
      };
      const {
        result: { current },
      } = renderHook(() =>
        useARIAButtonProps('button', {
          onClick: handle,
          onKeyDown: handle,
          onKeyUp: handle,
        }),
      );
      expect(current).not.toHaveProperty('as');
      expect(current).not.toHaveProperty('disabledFocusable');
      expect(current).toEqual(
        expect.objectContaining<ARIAButtonProps>({
          'aria-disabled': undefined,
          onClick: expect.any(Function),
          onKeyDown: handle,
          onKeyUp: handle,
        }),
      );
    });
    it('should omit event handlers when disabledFocusable', () => {
      const handle = () => {
        /* noop */
      };
      const {
        result: { current },
      } = renderHook(() =>
        useARIAButtonProps('button', {
          onClick: handle,
          onKeyDown: handle,
          onKeyUp: handle,
          disabledFocusable: true,
        }),
      );
      expect(current).not.toHaveProperty('as');
      expect(current).not.toHaveProperty('disabledFocusable');
      expect(current).toEqual(
        expect.objectContaining<ARIAButtonProps>({
          'aria-disabled': true,
          onClick: undefined,
          onKeyDown: undefined,
          onKeyUp: undefined,
        }),
      );
    });
    it('should not be disabled if disabledFocusable', () => {
      const {
        result: { current },
      } = renderHook(() =>
        useARIAButtonProps('button', {
          disabled: true,
          disabledFocusable: true,
        }),
      );
      expect(current).not.toHaveProperty('as');
      expect(current).not.toHaveProperty('disabledFocusable');
      expect(current).toEqual(
        expect.objectContaining<ARIAButtonProps>({
          disabled: false,
          'aria-disabled': true,
        }),
      );
    });
  });

  describe('<div>', () => {
    it('should return props for an element as a button', () => {
      const {
        result: { current },
      } = renderHook(() => useARIAButtonProps('div'));
      expect(current).not.toHaveProperty('as');
      expect(current).not.toHaveProperty('disabledFocusable');
      expect(current).toEqual(
        expect.objectContaining<ARIAButtonProps>({
          'aria-disabled': undefined,
          role: 'button',
          tabIndex: 0,
          onClick: expect.any(Function),
          onKeyDown: expect.any(Function),
          onKeyUp: expect.any(Function),
        }),
      );
    });
    it('should be aria-disabled when disabled', () => {
      const {
        result: { current },
      } = renderHook(() => useARIAButtonProps('a', { disabled: true }));
      expect(current).not.toHaveProperty('as');
      expect(current).not.toHaveProperty('disabledFocusable');
      expect(current).toEqual(
        expect.objectContaining<ARIAButtonProps>({
          'aria-disabled': true,
          role: 'button',
          tabIndex: undefined,
          onClick: expect.any(Function),
          onKeyDown: expect.any(Function),
          onKeyUp: expect.any(Function),
        }),
      );
    });
    it('should be aria-disabled when disabledFocusable but still focusabled', () => {
      const {
        result: { current },
      } = renderHook(() => useARIAButtonProps('a', { disabledFocusable: true }));
      expect(current).not.toHaveProperty('as');
      expect(current).not.toHaveProperty('disabledFocusable');
      expect(current).toEqual(
        expect.objectContaining<ARIAButtonProps>({
          'aria-disabled': true,
          tabIndex: 0,
        }),
      );
    });
  });
  describe('<a>', () => {
    it('should omit href if disabled', () => {
      const href = '/';
      const {
        result: { current },
      } = renderHook(() => useARIAButtonProps('a', { href, disabled: true }));
      expect(current).not.toHaveProperty('disabledFocusable');
      expect(current).toEqual(
        expect.not.objectContaining({
          disabled: expect.anything(),
        }),
      );
      expect(current).toEqual(
        expect.objectContaining<ARIAButtonProps>({
          href: undefined,
        }),
      );
    });
  });
  it.each(['button', 'div', 'a'] as const)('should not be possible to click %p when aria-disabled is true', type => {
    const handleClick = jest.fn();
    const { getByRole } = render(<TestButton as={type} onClick={handleClick} aria-disabled />);
    fireEvent.click(getByRole('button'));
    expect(handleClick).toBeCalledTimes(0);
  });
});

describe('useARIAButtonShorthands', () => {
  it('should return shorthands', () => {
    const {
      result: { current: buttonShorthand },
    } = renderHook(() => useARIAButtonShorthand({ as: 'button' }));
    expect(buttonShorthand.as).toBe('button');
    const {
      result: { current: buttonShorthand2 },
    } = renderHook(() => useARIAButtonShorthand({ as: undefined }));
    expect(buttonShorthand2.as).toBe(undefined);
    const {
      result: { current: acnhorShorthand },
    } = renderHook(() => useARIAButtonShorthand({ as: 'a' }));
    expect(acnhorShorthand.as).toBe('a');
    const {
      result: { current: divShorthand },
    } = renderHook(() => useARIAButtonShorthand({ as: 'div' }));
    expect(divShorthand.as).toBe('div');
  });
});
