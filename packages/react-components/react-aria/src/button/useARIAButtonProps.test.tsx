/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { useARIAButtonProps } from './useARIAButtonProps';
import { renderHook } from '@testing-library/react-hooks';
import { fireEvent, render } from '@testing-library/react';
import { Slot, ComponentProps, assertSlots, ComponentState, slot } from '@fluentui/react-utilities';
import { ARIAButtonProps, ARIAButtonSlotProps } from './types';

type TestButtonSlots = { root: Slot<ARIAButtonSlotProps> };

const TestButton = (props: ComponentProps<TestButtonSlots>) => {
  const state: ComponentState<TestButtonSlots> = {
    components: { root: 'button' },
    root: slot.always(useARIAButtonProps(props.as, props), { elementType: 'button' }),
  };
  assertSlots<TestButtonSlots>(state);
  return <state.root />;
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
      } = renderHook(() => useARIAButtonProps('div', { disabled: true }));
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
      } = renderHook(() => useARIAButtonProps('div', { disabledFocusable: true }));
      expect(current).not.toHaveProperty('as');
      expect(current).not.toHaveProperty('disabledFocusable');
      expect(current).toEqual(
        expect.objectContaining<ARIAButtonProps>({
          'aria-disabled': true,
          tabIndex: 0,
        }),
      );
    });
    it('should keep user defined tabIndex', () => {
      const {
        result: { current },
      } = renderHook(() => useARIAButtonProps('div', { tabIndex: undefined }));
      expect(current).toEqual(
        expect.objectContaining<ARIAButtonProps>({
          tabIndex: undefined,
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
