import type { ExtractSlotProps, Slot, UnionToIntersection } from '@fluentui/react-utilities';
import * as React from 'react';

export type ARIAButtonType = 'button' | 'a' | 'div';

export type ARIAButtonElement<AlternateAs extends 'a' | 'div' = 'a' | 'div'> =
  | HTMLButtonElement
  | (AlternateAs extends 'a' ? HTMLAnchorElement : never)
  | (AlternateAs extends 'div' ? HTMLDivElement : never);

/**
 * @internal
 */
export type ARIAButtonElementIntersection<AlternateAs extends 'a' | 'div' = 'a' | 'div'> = UnionToIntersection<
  ARIAButtonElement<AlternateAs>
>;

/**
 * Props expected by `useARIAButtonProps` hooks
 */
export type ARIAButtonProps<Type extends ARIAButtonType = ARIAButtonType> = React.PropsWithRef<
  JSX.IntrinsicElements[Type]
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

export type ARIAButtonSlotProps<AlternateAs extends 'a' | 'div' = 'a' | 'div'> = ExtractSlotProps<
  Slot<'button', AlternateAs>
> &
  Pick<ARIAButtonProps<ARIAButtonType>, 'disabled' | 'disabledFocusable'>;

/**
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
