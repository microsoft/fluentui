import * as React from 'react';
import { getNativeElementProps } from '@uifabric/utilities';
import { GenericDictionary } from './types';
import { nullRender } from './nullRender';

export const getSlots = (state: GenericDictionary, slotNames: string[] | undefined) => {
  const slots: GenericDictionary = {
    root: state.as || nullRender,
  };
  const slotProps: GenericDictionary = {
    root: getNativeElementProps(state.as, state),
  };

  for (const name of slotNames!) {
    const slotDefinition = state[name];

    const slot = (slots[name] = slotDefinition.as && slotDefinition.children ? slotDefinition.as : nullRender);

    if (slots[name] !== nullRender) {
      const nativeElementProps = (slotProps[name] = getNativeElementProps(slot, slotDefinition));

      if (typeof nativeElementProps.children === 'function') {
        slots[name] = React.Fragment;
        nativeElementProps.children = nativeElementProps.children(slots[name], nativeElementProps);
      }
    }
  }

  return { slots, slotProps };
};
