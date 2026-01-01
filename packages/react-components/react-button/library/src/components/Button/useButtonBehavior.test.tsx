import * as React from 'react';
import { render, renderHook } from '@testing-library/react';
import { useButtonBase_unstable } from './useButtonBase';

describe('useButtonBase', () => {
  it('returns the correct initial state', () => {
    const { result } = renderHook(() => useButtonBase_unstable({}, React.createRef()));
    expect(result.current).toMatchObject({
      components: { root: 'button', icon: 'span' },
      disabled: false,
      disabledFocusable: false,
      iconPosition: 'before',
      iconOnly: false,
      root: { type: 'button' },
      icon: undefined,
    });
  });

  it('returns the correct state with passed props', () => {
    const { result } = renderHook(() => useButtonBase_unstable({ disabled: true, icon: 'icon' }, React.createRef()));
    expect(result.current).toMatchObject({
      components: { root: 'button', icon: 'span' },
      disabled: true,
      disabledFocusable: false,
      iconPosition: 'before',
      iconOnly: true,
      root: { type: 'button' },
      icon: {
        children: 'icon',
      },
    });
  });

  describe('used as a headless hook to build a custom component', () => {
    type ButtonBaseProps = Parameters<typeof useButtonBase_unstable>[0];

    type CustomButtonProps = ButtonBaseProps & {
      appearance?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'link';
      size?: 'tiny' | 'small' | 'medium' | 'large' | 'huge';
    };

    const CustomButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, CustomButtonProps>(
      ({ appearance = 'primary', size = 'medium', className, ...props }, ref) => {
        // Used as a headless hook to build a custom component
        const state = useButtonBase_unstable(props, ref);

        state.root.className = ['btn', `btn-${appearance}`, `btn-${size}`, className].filter(Boolean).join(' ');

        // Render the root slot as an anchor or button based on the as prop
        if (state.root.as === 'a') {
          return <a {...state.root} />;
        }

        // Render the root slot as a button
        return <button {...state.root} />;
      },
    );

    it('renders a button when as is not provided', () => {
      const { getByRole } = render(
        <CustomButton appearance="tertiary" size="medium">
          Button
        </CustomButton>,
      );
      const button = getByRole('button', { name: 'Button' });
      expect(button).toBeDefined();
      expect(button.getAttribute('type')).toBe('button');
      expect(button.getAttribute('disabled')).toBeFalsy();
    });

    it('renders an anchor when as is provided', () => {
      const { getByRole } = render(
        <CustomButton as="a" href="#">
          Link
        </CustomButton>,
      );
      const anchor = getByRole('link', { name: 'Link' });
      expect(anchor).toBeDefined();
      expect(anchor.getAttribute('href')).toBe('#');
    });

    it('disables the button when "disabled" is passed as a prop', () => {
      const { getByRole } = render(<CustomButton disabled>Button</CustomButton>);
      const button = getByRole('button', { name: 'Button' });
      expect(button.hasAttribute('disabled')).toBe(true);
    });

    it('disables the anchor when "disabled" is passed as a prop', () => {
      const { getByRole } = render(
        <CustomButton as="a" href="#" disabled>
          Link
        </CustomButton>,
      );
      const anchor = getByRole('link');
      expect(anchor.hasAttribute('aria-disabled')).toBe(true);
    });
  });
});
