import type { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type SelectSlots = {
  /** Root of the component, renders as a `<span>`. */
  root: IntrinsicShorthandProps<'span'>;
  /** The actual `<select>` element */
  select: IntrinsicShorthandProps<'select'>;
  /** the icon, typically a down arrow */
  icon: IntrinsicShorthandProps<'span'>;
};

export interface SelectCommons {
  /**
   * Matches the Input sizes
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  inline?: boolean;

  /** @default 'outline' */
  appearance?: 'outline' | 'underline' | 'filledDarker' | 'filledLighter';

  disabled?: boolean;
}

export type SelectProps = ComponentProps<SelectSlots> & Partial<SelectCommons>;

export type SelectState = ComponentState<SelectSlots> & SelectCommons;
