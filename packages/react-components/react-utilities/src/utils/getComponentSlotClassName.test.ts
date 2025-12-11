import * as React from 'react';
import { slot } from '../compose';
import type { ComponentState, Slot } from '../compose/types';
import { getComponentSlotClassName } from './getComponentSlotClassName';

type ButtonSlots = {
  root: Slot<'button'>;
  icon: Slot<'span'>;
};

type ButtonState = {
  disabled?: boolean;
  appearance?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  iconOnly?: boolean;
  iconPosition?: 'before' | 'after';
};

describe('getComponentSlotClassName', () => {
  describe('without component state', () => {
    it('returns the base class name when slot has no className', () => {
      expect(getComponentSlotClassName('fui-Button', {})).toBe('fui-Button');
    });

    it('combines base class with user-provided className', () => {
      expect(getComponentSlotClassName('fui-Button', { className: 'custom-button' })).toBe('fui-Button custom-button');
    });

    it('ignores empty user-provided className', () => {
      expect(getComponentSlotClassName('fui-Button', { className: '' })).toBe('fui-Button');
    });
  });

  describe('with component state', () => {
    const createButtonState = (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state: ButtonState & Record<string, any> = {},
    ): ComponentState<ButtonSlots> & ButtonState => {
      const { className = '', ...stateOverrides } = state;
      return {
        appearance: 'primary',
        size: 'medium',
        disabled: false,
        iconOnly: false,
        iconPosition: 'before',
        components: {
          root: 'button',
          icon: 'span',
        },
        root: slot.always<React.ComponentProps<'button'>>({ className }, { elementType: 'button' }),
        icon: slot.optional<React.ComponentProps<'span'>>({}, { elementType: 'span' }),
        ...stateOverrides,
      };
    };

    it('generates modifier classes from state boolean properties', () => {
      const state = createButtonState({ disabled: true });
      expect(getComponentSlotClassName('fui-Button', state.root, state)).toContain('fui-Button--disabled');
    });

    it('generates modifier classes from state string properties', () => {
      const state = createButtonState({ appearance: 'secondary' });
      expect(getComponentSlotClassName('fui-Button', state.root, state)).toContain('fui-Button--appearance-secondary');
    });

    it('combines state modifiers with user-provided className', () => {
      const state = createButtonState({ disabled: true, className: 'custom-class' });
      const result = getComponentSlotClassName('fui-Button', state.root, state);

      expect(result).toContain('fui-Button--disabled');
      expect(result).toContain('custom-class');
      expect(result).toBe(
        'fui-Button fui-Button--appearance-primary fui-Button--size-medium fui-Button--disabled fui-Button--iconPosition-before custom-class',
      );
    });

    it('ignores falsy state values (false, undefined, null, empty string)', () => {
      const state = createButtonState({
        disabled: false,
        appearance: undefined,
        iconOnly: false,
      });
      const result = getComponentSlotClassName('fui-Button', state.root, state);

      // Should not contain disabled, appearance, or iconOnly modifiers
      expect(result).not.toContain('--disabled');
      expect(result).not.toContain('--appearance-undefined');
      expect(result).not.toContain('--iconOnly');
    });

    it('ignores non-primitive state values (objects, functions)', () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const state = createButtonState({ foo: 'bar', customFn: () => {} });

      const result = getComponentSlotClassName('fui-Button', state.root, state);

      // Should not generate classes for object/function properties
      expect(result).not.toContain('--customObj');
      expect(result).not.toContain('--customFn');
    });

    it('ignores the deprecated components property', () => {
      const state = createButtonState();
      const result = getComponentSlotClassName('fui-Button', state.root, state);

      expect(result).not.toContain('--components');
    });
  });

  describe('slot className property', () => {
    it('handles slot without className property', () => {
      expect(getComponentSlotClassName('fui-Button__icon', {})).toBe('fui-Button__icon');
    });

    it('preserves slot className even when empty', () => {
      // Empty string className should be filtered out
      expect(getComponentSlotClassName('fui-Button__icon', { className: '' })).toBe('fui-Button__icon');
    });

    it('combines multiple classes in correct order: baseClass, modifiers, userClass', () => {
      const state: ComponentState<ButtonSlots> & ButtonState = {
        appearance: 'primary',
        size: 'large',
        disabled: true,
        iconOnly: false,
        iconPosition: 'before',
        components: { root: 'button', icon: 'span' },
        root: slot.always({ className: 'user-custom-class' }, { elementType: 'button' }),
        icon: slot.optional<React.ComponentProps<'span'>>({}, { elementType: 'span' }),
      };

      const result = getComponentSlotClassName('fui-Button', state.root, state);
      const parts = result.split(' ');

      expect(parts[0]).toBe('fui-Button'); // base class first
      expect(parts.at(-1)).toBe('user-custom-class'); // user class last
      expect(parts.slice(1, -1).every(p => p.startsWith('fui-Button--'))).toBe(true); // modifiers in middle
    });
  });
});
