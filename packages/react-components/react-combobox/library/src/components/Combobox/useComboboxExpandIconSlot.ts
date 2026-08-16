import { slot, useId } from '@fluentui/react-utilities';
import type { ExtractSlotProps, Slot, SlotComponentType } from '@fluentui/react-utilities';

export type UseComboboxExpandIconSlotOptions = {
  /** Whether the combobox trigger is disabled. */
  disabled?: boolean;
  /** Whether the listbox is currently open. */
  open: boolean;
  /** `aria-label` passed to the combobox. */
  'aria-label'?: string;
  /** `aria-labelledby` passed to the combobox. */
  'aria-labelledby'?: string;
  /** `aria-labelledby` of the resolved trigger slot, used to build the labelling chain. */
  triggerLabelledBy?: string;
};

/**
 * Creates the `expandIcon` slot of a combobox: button semantics plus the default accessible name.
 * Event handlers are layered on by the caller, since the toggle mechanics differ between the
 * positioning-based and popover-based implementations.
 */
export function useComboboxExpandIconSlot(
  expandIconFromProps: Slot<'span'> | undefined | null,
  options: UseComboboxExpandIconSlotOptions,
): SlotComponentType<ExtractSlotProps<Slot<'span'>>> | undefined {
  const { disabled, open, triggerLabelledBy } = options;
  const fallbackId = useId('combobox-chevron-');

  const expandIcon = slot.optional(expandIconFromProps, {
    renderByDefault: true,
    defaultProps: {
      'aria-disabled': disabled ? 'true' : undefined,
      'aria-expanded': open,
      role: 'button',
    },
    elementType: 'span',
  });

  if (!expandIcon) {
    return expandIcon;
  }

  // If there is no explicit aria-label, calculate default accName attribute for expandIcon button,
  // using the following steps:
  // 1. If there is an aria-label, it is "Open [aria-label]"
  // 2. If there is an aria-labelledby, it is "Open [aria-labelledby target]" (using aria-labelledby + ids)
  // 3. If there is no aria-label/ledby attr, it falls back to "Open"
  // We can't fall back to a label/htmlFor name because of https://github.com/w3c/accname/issues/179
  const hasExpandLabel = expandIcon['aria-label'] || expandIcon['aria-labelledby'];
  const defaultOpenString = 'Open'; // this is english-only since it is the fallback

  if (!hasExpandLabel) {
    if (options['aria-labelledby']) {
      const chevronId = expandIcon.id ?? fallbackId;

      expandIcon['aria-label'] = defaultOpenString;
      expandIcon.id = chevronId;
      expandIcon['aria-labelledby'] = `${chevronId} ${triggerLabelledBy}`;
    } else if (options['aria-label']) {
      expandIcon['aria-label'] = `${defaultOpenString} ${options['aria-label']}`;
    } else {
      expandIcon['aria-label'] = defaultOpenString;
    }
  }

  return expandIcon;
}
