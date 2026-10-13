import type { Label } from '@fluentui/react-label';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type {
  CheckboxOnChangeData,
  CheckboxProps as CheckboxCoreProps,
  CheckboxSlots as CheckboxCoreSlots,
} from '@fluentui/react-core-preview';

export type { CheckboxOnChangeData };

/**
 * Slots of the Checkbox. Same as the core slots, with `Label` as the label slot.
 */
export type CheckboxSlots = Omit<CheckboxCoreSlots, 'label'> & {
  /**
   * The Checkbox's label.
   */
  label?: Slot<typeof Label>;
};

/**
 * Checkbox Props
 */
export type CheckboxProps = Omit<
  ComponentProps<Partial<CheckboxSlots>, 'input'>,
  'checked' | 'defaultChecked' | 'onChange' | 'size'
> &
  Pick<CheckboxCoreProps, 'checked' | 'children' | 'defaultChecked' | 'labelPosition' | 'onChange'> & {
  /**
   * The shape of the checkbox indicator.
   *
   * The `circular` variant is only recommended to be used in a tasks-style UI (checklist),
   * since it otherwise could be confused for a `RadioItem`.
   *
   * @default square
   */
  shape?: 'square' | 'circular';

  /**
   * The size of the checkbox indicator.
   *
   * @default medium
   */
  size?: 'medium' | 'large';
};

/**
 * State used in rendering Checkbox
 */
export type CheckboxState = ComponentState<CheckboxSlots> &
  Required<Pick<CheckboxProps, 'checked' | 'disabled' | 'labelPosition' | 'shape' | 'size'>>;

export type CheckboxBaseProps = Omit<CheckboxProps, 'shape' | 'size'>;

export type CheckboxBaseState = Omit<CheckboxState, 'shape' | 'size'>;
