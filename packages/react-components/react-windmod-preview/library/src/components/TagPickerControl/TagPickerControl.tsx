'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderTagPickerControl,
  useTagPickerContext_unstable,
  useTagPickerControl as useTagPickerControlHeadless,
} from '@fluentui/react-headless-components-preview/tag-picker';
import { ChevronDownRegular } from '@fluentui/react-icons/headless/svg/chevron-down';

import type { TagPickerControlProps } from './TagPickerControl.types';
import { useTagPickerControlStyles } from './useTagPickerControlStyles';

/**
 * The interactive area of a TagPicker: the tag rail, the trigger, and an aside holding the expand
 * icon and an optional secondary action. Windmod TagPickerControl: the headless control decorated
 * with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const TagPickerControl: ForwardRefComponent<TagPickerControlProps> = React.forwardRef((props, ref) => {
  const appearance = useTagPickerContext_unstable(ctx => ctx.appearance);
  const size = useTagPickerContext_unstable(ctx => ctx.size);
  const noPopover = useTagPickerContext_unstable(ctx => ctx.noPopover);

  // The expandIcon slot carries no renderByDefault, so an unsupplied slot does not exist after the
  // hook and the glyph rule would skip it: it is materialised pre-hook. The materialisation is gated
  // on noPopover because a noPopover picker draws no chevron, and the aside's own renderByDefault is
  // Boolean(secondaryAction || expandIcon) — materialising unconditionally would grow an empty aside
  // on a picker that should have none.
  const base = useTagPickerControlHeadless(
    { ...props, expandIcon: !noPopover && props.expandIcon === undefined ? {} : props.expandIcon },
    ref,
  );

  // The glyph rule, post-hook and immutable. Consumer children always win; `expandIcon={null}` still
  // removes the slot.
  const withGlyph = base.expandIcon
    ? { ...base, expandIcon: { ...base.expandIcon, children: base.expandIcon.children ?? <ChevronDownRegular /> } }
    : base;

  const styled = useTagPickerControlStyles({ ...withGlyph, appearance, size });

  return renderTagPickerControl(styled);
});

TagPickerControl.displayName = 'TagPickerControl';
