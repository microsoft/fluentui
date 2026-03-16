'use client';

import * as React from 'react';
import { useEventCallback, useControllableState, getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type {
  ToggableHandler,
  ToolbarBaseProps,
  ToolbarBaseState,
  ToolbarProps,
  ToolbarState,
  UninitializedToolbarState,
} from './Toolbar.types';
import { TabsterDOMAttribute, useArrowNavigationGroup } from '@fluentui/react-tabster';

/**
 * Create the state required to render Toolbar.
 *
 * The returned state can be modified with hooks such as useToolbarStyles_unstable,
 * before being passed to renderToolbar_unstable.
 *
 * @param props - props from this instance of Toolbar
 * @param ref - reference to root HTMLElement of Toolbar
 */
export const useToolbar_unstable = (props: ToolbarProps, ref: React.Ref<HTMLElement>): ToolbarState => {
  const { size = 'medium' } = props;
  const state = useToolbarBase_unstable(props, ref);
  const arrowNavigationProps = useToolbarArrowNavigationProps_unstable();

  return {
    size,
    ...state,
    root: {
      ...state.root,
      ...arrowNavigationProps,
    },
  };
};

/**
 * Base hook that builds Toolbar state for behavior and structure only.
 * It does not add arrow key navigation, which is handled by `useToolbar_unstable`.
 *
 * @internal
 * @param props - Props for this Toolbar instance.
 * @param ref - Ref to the root HTMLElement.
 */
export const useToolbarBase_unstable = (props: ToolbarBaseProps, ref: React.Ref<HTMLElement>): ToolbarBaseState => {
  const { vertical = false } = props;

  const initialState: UninitializedToolbarState = {
    vertical,
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: slot.always(
      getIntrinsicElementProps('div', {
        role: 'toolbar',
        ref: ref as React.Ref<HTMLDivElement>,
        ...(vertical && ({ 'aria-orientation': 'vertical' } as const)),
        ...props,
      }),
      { elementType: 'div' },
    ),
  };

  const [checkedValues, onCheckedValueChange] = useToolbarSelectableState({
    checkedValues: props.checkedValues,
    defaultCheckedValues: props.defaultCheckedValues,
    onCheckedValueChange: props.onCheckedValueChange,
  });

  const handleToggleButton: ToggableHandler = useEventCallback(
    (e: React.MouseEvent | React.KeyboardEvent, name: string, value: string, checked?: boolean) => {
      if (name && value) {
        const checkedItems = checkedValues?.[name] || [];
        const newCheckedItems = [...checkedItems];
        if (checked) {
          newCheckedItems.splice(newCheckedItems.indexOf(value), 1);
        } else {
          newCheckedItems.push(value);
        }
        onCheckedValueChange?.(e, { name, checkedItems: newCheckedItems });
      }
    },
  );

  const handleRadio: ToggableHandler = useEventCallback(
    (e: React.MouseEvent | React.KeyboardEvent, name: string, value: string, checked?: boolean) => {
      if (name && value) {
        onCheckedValueChange?.(e, {
          name,
          checkedItems: [value],
        });
      }
    },
  );

  return {
    ...initialState,
    handleToggleButton,
    handleRadio,
    checkedValues: checkedValues ?? {},
  };
};

/**
 * Adds appropriate state values and handlers for selectable items
 * i.e checkboxes and radios
 */
const useToolbarSelectableState = (
  state: Pick<ToolbarBaseProps, 'checkedValues' | 'defaultCheckedValues' | 'onCheckedValueChange'>,
) => {
  const [checkedValues, setCheckedValues] = useControllableState({
    state: state.checkedValues,
    defaultState: state.defaultCheckedValues,
    initialState: {},
  });
  const { onCheckedValueChange: onCheckedValueChangeOriginal } = state;
  const onCheckedValueChange: ToolbarBaseState['onCheckedValueChange'] = useEventCallback(
    (e, { name, checkedItems }) => {
      if (onCheckedValueChangeOriginal) {
        onCheckedValueChangeOriginal(e, { name, checkedItems });
      }

      setCheckedValues(s => {
        return s ? { ...s, [name]: checkedItems } : { [name]: checkedItems };
      });
    },
  );

  return [checkedValues, onCheckedValueChange] as const;
};

/**
 * Hook to add arrow navigation props to the Toolbar.
 *
 * @internal
 * @returns - Tabster DOM attributes for arrow navigation
 */
export const useToolbarArrowNavigationProps_unstable = (): TabsterDOMAttribute => {
  return useArrowNavigationGroup({
    circular: true,
    axis: 'both',
  });
};
