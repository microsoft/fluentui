'use client';

import * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderTagPickerList, useTagPickerList } from '@fluentui/react-headless-components-preview/tag-picker';

import { Listbox } from '../Listbox';
import type { TagPickerListProps } from './TagPickerList.types';
import { useTagPickerListStyles } from './useTagPickerListStyles';

/**
 * The popover surface of a TagPicker, holding its TagPickerOption and TagPickerOptionGroup
 * children. Windmod TagPickerList: the headless list decorated with the Fluent visual contract
 * (Tailwind v4 + CSS Modules).
 */
export const TagPickerList: ForwardRefComponent<TagPickerListProps> = React.forwardRef((props, ref) => {
  const base = useTagPickerList(props, ref);

  // The surface element type is re-stamped on the slot as well as in the components map: the map
  // alone is read only by the development-mode renderer, so a components-only swap is inert in a
  // production build. The slot is `root` here and takes no renderByDefault, unlike Combobox's.
  return renderTagPickerList(
    useTagPickerListStyles({
      ...base,
      // eslint-disable-next-line @typescript-eslint/no-deprecated -- reading base.components to keep every other slot's element type
      components: { ...base.components, root: Listbox },
      root: slot.always({ ...base.root }, { elementType: Listbox }),
    }),
  );
}) as ForwardRefComponent<TagPickerListProps>;

TagPickerList.displayName = 'TagPickerList';
