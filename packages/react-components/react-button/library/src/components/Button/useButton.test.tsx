import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import '@testing-library/jest-dom';
import { useButtonBase_unstable } from './useButton';
import { renderButton_unstable } from './renderButton';
import type { ButtonState, ButtonBaseProps } from './Button.types';
import { mergeClasses } from '@griffel/react';

describe('useButtonBase_unstable', () => {
  it('returns default state when no props are provided', () => {
    const { result } = renderHook(() => useButtonBase_unstable({}, React.createRef()));
    expect(result.current).toEqual(
      expect.objectContaining({
        disabled: false,
        disabledFocusable: false,
        iconPosition: 'before',
        iconOnly: false,
        components: { root: 'button', icon: 'span' },
      }),
    );
  });

  it('sets disabled and disabledFocusable correctly', () => {
    const { result } = renderHook(() =>
      useButtonBase_unstable({ disabled: true, disabledFocusable: true }, React.createRef()),
    );
    expect(result.current.disabled).toBe(true);
    expect(result.current.disabledFocusable).toBe(true);
  });

  it('sets iconPosition and iconOnly correctly', () => {
    const { result } = renderHook(() =>
      useButtonBase_unstable({ iconPosition: 'after', icon: 'icon' }, React.createRef()),
    );
    expect(result.current.iconPosition).toBe('after');
    expect(result.current.iconOnly).toBe(true);
  });

  it('handles absence of icon and children correctly', () => {
    const { result } = renderHook(() => useButtonBase_unstable({}, React.createRef()));
    expect(result.current.iconOnly).toBe(false);
  });

  describe('Recomposition', () => {
    type CustomButtonProps = ButtonBaseProps & { appearance?: '1' | '2' | '3' };

    const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
      ({ appearance = '1', ...props }, ref) => {
        const state = useButtonBase_unstable(props, ref);

        state.root.className = mergeClasses('custom-button', `appearance-${appearance}`, state.root.className);

        return renderButton_unstable(state as ButtonState);
      },
    );

    it('renders as a button element', () => {
      const { getByRole } = render(<CustomButton>Button</CustomButton>);
      expect(getByRole('button')).toMatchInlineSnapshot(`
        <button
          class="custom-button appearance-1"
          type="button"
        >
          Button
        </button>
      `);
    });

    it('renders as an anchor element', () => {
      const { getByRole } = render(
        <CustomButton as="a" href="#">
          Link
        </CustomButton>,
      );
      expect(getByRole('link')).toMatchInlineSnapshot(`
        <a
          class="custom-button appearance-1"
          href="#"
        >
          Link
        </a>
      `);
    });
  });
});
