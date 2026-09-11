'use client';

import type { JSXElement } from '@fluentui/react-utilities';
import {
  renderTagPicker,
  useTagPicker,
  useTagPickerContextValues,
} from '@fluentui/react-headless-components-preview/tag-picker';
import { resolvePositioningShorthand } from '@fluentui/react-headless-components-preview/positioning';

import type { TagPickerProps, TagPickerState } from './TagPicker.types';

/**
 * A TagPicker lets people select several options from a list and shows each selection as a
 * dismissible Tag. Windmod TagPicker: the headless tag picker (native top layer + CSS anchor
 * positioning) decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const TagPicker = ({ appearance = 'outline', size = 'medium', ...rest }: TagPickerProps): JSXElement => {
  // FIVE positioning values, not six. react-combobox's useComboboxPositioning adds `autoSize: true`
  // and react-tag-picker's useTagPicker_unstable does not, so Combobox and Dropdown restore six
  // where this restores five. Consumer spread last.
  const base = useTagPicker({
    ...rest,
    positioning: {
      position: 'below',
      align: 'start',
      offset: { crossAxis: 0, mainAxis: 2 },
      fallbackPositions: ['above', 'after', 'after-top', 'before', 'before-top'],
      matchTargetSize: 'width',
      ...resolvePositioningShorthand(rest.positioning),
    },
  });

  // The look props are published on the picker context, which is where every other member of the
  // family reads them from — no member takes either from its own props.
  const state: TagPickerState = { ...base, appearance, size };

  const contextValues = useTagPickerContextValues(state);

  return renderTagPicker(state, contextValues);
};

TagPicker.displayName = 'TagPicker';
