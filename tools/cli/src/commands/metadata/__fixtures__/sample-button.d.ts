import * as React from 'react';
import type { Slot } from '@sample/utilities';
import type { SlotClassNames } from '@sample/utilities';

/**
 * Props for the SampleButton component.
 */
export declare interface SampleButtonProps {
  /**
   * The visual style of the button.
   *
   * @default 'secondary'
   */
  appearance?: 'primary' | 'secondary' | 'outline';
  /**
   * Whether the button is disabled.
   *
   * @default false
   */
  disabled?: boolean;
  /** The size of the button. */
  size?: 'small' | 'medium' | 'large';
}

/**
 * State for the SampleButton component.
 */
export declare interface SampleButtonState {
  appearance: 'primary' | 'secondary' | 'outline';
  disabled: boolean;
}

/**
 * Slots for the SampleButton component.
 */
export declare type SampleButtonSlots = {
  /** Root element of the button. */
  root: Slot<HTMLButtonElement>;
  /** Optional icon slot. */
  icon?: Slot<HTMLSpanElement>;
};

/**
 * SampleButton gives people a way to trigger an action.
 */
export declare const SampleButton: React.ForwardRefExoticComponent<
  SampleButtonProps & React.RefAttributes<HTMLButtonElement>
>;

export declare const sampleButtonClassNames: SlotClassNames<SampleButtonSlots>;

/**
 * Hook to create SampleButton state.
 * @param props - User provided props to the SampleButton component.
 * @param ref - User provided ref.
 */
export declare const useSampleButton_unstable: (
  props: SampleButtonProps,
  ref: React.Ref<HTMLButtonElement>,
) => SampleButtonState;

export declare const useSampleButtonStyles_unstable: (state: SampleButtonState) => SampleButtonState;

/**
 * Renders SampleButton from state.
 */
export declare const renderSampleButton_unstable: (state: SampleButtonState) => JSX.Element;

/**
 * @internal
 * Internal context value.
 */
export declare interface SampleButtonContextValue {
  size?: 'small' | 'medium' | 'large';
}

/**
 * Size options for the button.
 */
export declare type SampleButtonSize = 'small' | 'medium' | 'large';

/**
 * @deprecated Use SampleButtonSize instead.
 */
export declare enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
}

export declare function useToggleState(props: SampleButtonProps): SampleButtonState;

export {};
