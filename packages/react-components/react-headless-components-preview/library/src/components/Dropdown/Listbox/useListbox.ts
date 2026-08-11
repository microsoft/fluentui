'use client';

import type * as React from 'react';
import { useListbox_unstable } from '@fluentui/react-combobox';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

import type { ListboxProps, ListboxState } from './Listbox.types';
import { useOverlayRuntime } from '../../../overlayRuntime';

/**
 * Returns the state for a Listbox component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderListbox`.
 */
export const useListbox = (props: ListboxProps, ref: React.Ref<HTMLElement>): ListboxState => {
  const state = useListbox_unstable(props, ref);
  const { targetDocument } = useFluent();
  const overlayRuntime = useOverlayRuntime(targetDocument);
  const useNativeRuntime = overlayRuntime.mode === 'ssr' || overlayRuntime.mode === 'native';

  // eslint-disable-next-line react-hooks/immutability
  state.root.popover = useNativeRuntime ? 'auto' : undefined;
  (
    state.root as ListboxState['root'] & {
      'data-overlay-runtime'?: 'native' | 'fallback';
    }
  )['data-overlay-runtime'] = useNativeRuntime ? 'native' : 'fallback';

  return state;
};
