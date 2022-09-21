import type { ExtractSlotProps, Slot } from '@fluentui/react-utilities';
import * as React from 'react';

type UnionToIntersection<U> = (U extends unknown ? (x: U) => U : never) extends (x: infer I) => U ? I : never;

/**
 * Possible element types supported by `ARIAButton`
 * 1. `button` - Minimal interference from ARIAButton hooks, as semantic button already supports most of the states
 * 2. `a` or `div` - Proper keyboard/mouse handling plus other support to ensure behavior
 * 3. `ARIAButtonComponent` - No interface from ARIAButton hooks, as the given element already implements
 * uses `ARIAButton` hooks under the hood.
 */
export type ARIAButtonType = 'button' | 'a' | 'div' | ARIAButtonComponent;

/**
 * @internal
 *
 * An union of possible HTMLElement types found internally on `ARIAButton` hooks
 */
export type ARIAButtonElement<AlternateAs extends 'a' | 'div' = 'a' | 'div'> =
  | HTMLButtonElement
  | (AlternateAs extends 'a' ? HTMLAnchorElement : never)
  | (AlternateAs extends 'div' ? HTMLDivElement : never);

/**
 * @internal
 *
 * An intersection of possible HTMLElement types found internally on `ARIAButton` hooks
 */
export type ARIAButtonElementIntersection<AlternateAs extends 'a' | 'div' = 'a' | 'div'> = UnionToIntersection<
  ARIAButtonElement<AlternateAs>
>;

/**
 * Props expected by `useARIAButtonProps` hooks
 */
export type ARIAButtonProps<Type extends ARIAButtonType = ARIAButtonType> = React.PropsWithRef<
  JSX.IntrinsicElements[Extract<Type, string>]
> & {
  disabled?: boolean;
  /**
   * When set, allows the button to be focusable even when it has been disabled.
   * This is used in scenarios where it is important to keep a consistent tab order
   * for screen reader and keyboard users. The primary example of this
   * pattern is when the disabled button is in a menu or a commandbar and is seldom used for standalone buttons.
   *
   * @default false
   */
  disabledFocusable?: boolean;
};

/**
 * Props expected by `useARIAButtonShorthands` hooks
 */
export type ARIAButtonSlotProps<AlternateAs extends 'a' | 'div' = 'a' | 'div'> = ExtractSlotProps<
  Slot<'button', AlternateAs>
> &
  Pick<ARIAButtonProps<ARIAButtonType>, 'disabled' | 'disabledFocusable'>;

/**
 * @internal
 * Props that will be modified internally by `useARIAButtonProps` by each case.
 * This typing is to ensure a well specified return value for `useARIAbButtonProps`
 */
export type ARIAButtonAlteredProps<Type extends ARIAButtonType> =
  | (Type extends 'button'
      ? Pick<
          JSX.IntrinsicElements['button'],
          'onClick' | 'onKeyDown' | 'onKeyUp' | 'disabled' | 'aria-disabled' | 'tabIndex'
        >
      : never)
  | (Type extends 'a'
      ? Pick<
          JSX.IntrinsicElements['a'],
          'onClick' | 'onKeyDown' | 'onKeyUp' | 'aria-disabled' | 'tabIndex' | 'role' | 'href'
        >
      : never)
  | (Type extends 'div'
      ? Pick<JSX.IntrinsicElements['div'], 'onClick' | 'onKeyDown' | 'onKeyUp' | 'aria-disabled' | 'tabIndex' | 'role'>
      : never);

/**
 * Merge of props provided by the user and props provided internally.
 */
export type ARIAButtonResultProps<Type extends ARIAButtonType, Props> = Props &
  UnionToIntersection<ARIAButtonAlteredProps<Type>>;

/**
 * Allows a component to be tagged as a FluentUI ARIAButton component.
 *
 * ARIAButton are special-case components: they implement ARIA specific button functionality.
 * Having a component declared as being an ARIAButton component will ensure that ARIAButtonProps will consider
 * that specific component as being a ARIA compliant button element
 *
 * A component can be tagged as a ARIAButton as follows:
 * ```ts
 * const MyComponent: React.FC<MyComponentProps> & ARIAButtonComponent = ...;
 *
 * MyComponent.isARIAButtonComponent = true; // MUST also set this to true
 * ```
 */
export type ARIAButtonComponent = {
  isARIAButtonComponent?: boolean;
};
