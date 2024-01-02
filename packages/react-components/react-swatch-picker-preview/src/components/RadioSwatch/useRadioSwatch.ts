import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { RadioSwatchProps, RadioSwatchState } from './RadioSwatch.types';
import { Radio } from '@fluentui/react-radio';

/**
 * Create the state required to render RadioSwatch.
 *
 * The returned state can be modified with hooks such as useRadioSwatchStyles_unstable,
 * before being passed to renderRadioSwatch_unstable.
 *
 * @param props - props from this instance of RadioSwatch
 * @param ref - reference to root HTMLElement of RadioSwatch
 */
export const useRadioSwatch_unstable = (
  props: RadioSwatchProps,
  ref: React.Ref<HTMLInputElement>,
): RadioSwatchState => {
  return {
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: Radio,
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getIntrinsicElementProps('input', {
        ref: ref as React.Ref<HTMLInputElement>,
        ...props,
      }),
      { elementType: Radio },
    ),
  };
};
