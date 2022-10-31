import * as React from 'react';
import { useEventCallback, useControllableState } from '@fluentui/react-utilities';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { ToggableHandler, ToolbarProps, ToolbarState, UninitializedToolbarState } from './Toolbar.types';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';

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
  const { size = 'medium', vertical = false } = props;

  const arrowNavigationProps = useArrowNavigationGroup({
    circular: true,
    axis: 'horizontal',
  });

  const initialState: UninitializedToolbarState = {
    size,
    vertical,
    // TODO add appropriate props/defaults
    components: {
      // TODO add each slot's element type or component
      root: 'div',
    },
    // TODO add appropriate slots, for example:
    // mySlot: resolveShorthand(props.mySlot),
    root: getNativeElementProps('div', {
      role: 'toolbar',
      ref,
      ...arrowNavigationProps,
      ...props,
    }),
  };

  const [checkedValues, setCheckedValues] = useControllableState({
    state: initialState.checkedValues,
    defaultState: initialState.defaultCheckedValues,
    initialState: {},
  });

  const { onCheckedValueChange } = initialState;

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
        setCheckedValues(s => ({ ...s, [name]: newCheckedItems }));
      }
    },
  );

  const handleRadio: ToggableHandler = useEventCallback(
    (e: React.MouseEvent | React.KeyboardEvent, name: string, value: string, checked?: boolean) => {
      if (name && value) {
        onCheckedValueChange?.(e, {
          name,
          checkedItems: checkedValues?.[name],
        });
        setCheckedValues(s => ({ ...s, [name]: [value] }));
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
