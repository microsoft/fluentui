import { slot, useId } from '@fluentui/react-utilities';
import type { ExtractSlotProps, Slot, SlotComponentType } from '@fluentui/react-utilities';

type UseComboboxExpandIconSlotOptions = {
  /** Whether the combobox trigger is disabled. */
  disabled?: boolean;
  /** Whether the listbox is currently open. */
  open: boolean;
  /** `aria-label` passed to the combobox. */
  'aria-label'?: string;
  /** `aria-labelledby` passed to the combobox. */
  'aria-labelledby'?: string;
  /** `aria-labelledby` of the resolved input trigger, used to build the labelling chain. */
  triggerLabelledBy?: string;
};

/**
 * Creates the `expandIcon` slot of a combobox: button semantics plus the default accessible name.
 *
 * @internal
 */
export function useComboboxExpandIconSlot(
  expandIconFromProps: Slot<'span'> | undefined | null,
  options: UseComboboxExpandIconSlotOptions,
): SlotComponentType<ExtractSlotProps<Slot<'span'>>> | undefined {
  const defaultExpandIconId = useId('combobox-chevron-');
  const { disabled, open, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, triggerLabelledBy } = options;
  const expandIcon = slot.optional(expandIconFromProps, {
    renderByDefault: true,
    defaultProps: {
      'aria-disabled': disabled ? 'true' : undefined,
      'aria-expanded': open,
      role: 'button',
      tabIndex: disabled ? -1 : 0,
    },
    elementType: 'span',
  });

  if (!expandIcon) {
    return undefined;
  }

  const hasExpandLabel = expandIcon['aria-label'] || expandIcon['aria-labelledby'];

  if (!hasExpandLabel) {
    if (triggerLabelledBy || ariaLabelledBy) {
      const expandIconId = expandIcon.id ?? defaultExpandIconId;
      expandIcon.id = expandIconId;
      expandIcon['aria-labelledby'] = `${expandIcon.id} ${triggerLabelledBy ?? ariaLabelledBy}`.trim();
      expandIcon['aria-label'] = 'Open';
    } else if (ariaLabel) {
      expandIcon['aria-label'] = `Open ${ariaLabel}`;
    } else {
      expandIcon['aria-label'] = 'Open';
    }
  }

  return expandIcon;
}
