import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { SwatchPickerProps, SwatchPickerState, SwatchPickerModel } from './SwatchPicker.types';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { ColorPickerContext } from '../../contexts/picker';

/**
 * Create the state required to render SwatchPicker.
 *
 * The returned state can be modified with hooks such as useSwatchPickerStyles_unstable,
 * before being passed to renderSwatchPicker_unstable.
 *
 * @param props - props from this instance of SwatchPicker
 * @param ref - reference to root HTMLElement of SwatchPicker
 */
export const useSwatchPicker_unstable = <T>(
  props: SwatchPickerProps<T>,
  ref: React.Ref<HTMLDivElement>,
): SwatchPickerState<T> => {
  const [model, setModel] = React.useState<SwatchPickerModel<T>>({});

  const { layout = 'grid' } = props;
  const focusAttributes = useArrowNavigationGroup({
    circular: true,
    axis: layout === 'row' ? 'both' : 'grid-linear',
    memorizeCurrent: true,
  });

  const role = layout === 'row' ? 'row' : 'grid';

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps('div', {
        ref,
        ...focusAttributes,
        ...props,
        role,
      }),
      { elementType: 'div' },
    ),
    ...makePickerContext(props, model, setModel),
  };
};

function makePickerContext<T>(
  props: SwatchPickerProps<T>,
  model: SwatchPickerModel<T>,
  setModel: React.Dispatch<React.SetStateAction<SwatchPickerModel<T>>>,
): ColorPickerContext<T> {
  function notifyPreview(color: T, state: boolean) {
    const upd = { ...model, preview: state ? color : undefined };

    if (model !== upd) {
      setModel(upd);
      props.onColorPreview && props.onColorPreview(upd);
    }
  }

  function notifySelected(color: T) {
    const upd = { ...model, selected: color };

    if (model !== upd) {
      setModel(upd);
      props.onColorSelect && props.onColorSelect(upd);
    }
  }

  return { notifyPreview, notifySelected };
}
