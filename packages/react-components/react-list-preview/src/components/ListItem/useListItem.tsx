import * as React from 'react';
import { useFocusableGroup } from '@fluentui/react-tabster';
import { getIntrinsicElementProps, slot, useEventCallback, useId } from '@fluentui/react-utilities';
import type { ListItemProps, ListItemState } from './ListItem.types';
import { useListContext_unstable } from '../List/listContext';
import { Checkmark16Filled } from '@fluentui/react-icons';

const EMPTY_OBJECT = {};
const DEFAULT_ROOT_EL_TYPE = 'li';

const listPropsForSelected = {
  tabIndex: 0,
  role: 'option',
  'aria-selected': true,
  checkmark: {
    children: <Checkmark16Filled />,
  },
};

const listPropsForNotSelected = {
  tabIndex: 0,
  role: 'option',
  'aria-selected': false,
  checkmark: {
    children: null,
  },
};

function validateProperElementTypes(parentRenderedAs?: 'div' | 'ul' | 'ol', renderedAs?: 'div' | 'li') {
  if (renderedAs === 'div' && parentRenderedAs !== 'div') {
    throw new Error('ListItem cannot be rendered as a div when its parent is not a div.');
  }
  if (renderedAs === 'li' && parentRenderedAs === 'div') {
    throw new Error('ListItem cannot be rendered as a li when its parent is a div.');
  }
}

/**
 * Create the state required to render ListItem.
 *
 * The returned state can be modified with hooks such as useListItemStyles_unstable,
 * before being passed to renderListItem_unstable.
 *
 * @param props - props from this instance of ListItem
 * @param ref - reference to root HTMLLIElement | HTMLDivElementof ListItem
 */
export const useListItem_unstable = (
  props: ListItemProps,
  ref: React.Ref<HTMLLIElement | HTMLDivElement>,
): ListItemState => {
  const id = useId('listItem');
  const { value = id, onKeyDown, onClick } = props;

  const focusableItems = useListContext_unstable(ctx => ctx.focusableItems);
  const toggleItem = useListContext_unstable(ctx => ctx.selection?.toggleItem);
  const isSelectionEnabled = useListContext_unstable(ctx => !!ctx.selection);
  const isSelected = useListContext_unstable(ctx => ctx.selection?.isSelected(value));

  const parentRenderedAs = useListContext_unstable(ctx => ctx.as);
  const renderedAs = props.as || DEFAULT_ROOT_EL_TYPE;

  validateProperElementTypes(parentRenderedAs, renderedAs);

  const listItemProps = isSelected ? listPropsForSelected : listPropsForNotSelected;

  const focusableGroupAttrs = useFocusableGroup({ tabBehavior: 'limited-trap-focus' });

  const handleKeyDown: React.KeyboardEventHandler<HTMLLIElement & HTMLDivElement> = useEventCallback(e => {
    onKeyDown?.(e);

    // Compare targets to make sure this only triggers when the event is fired on the list item
    // and not on a button inside
    if (!isSelectionEnabled || e.defaultPrevented || e.target !== e.currentTarget) {
      return;
    }

    if (e.key === ' ') {
      e.preventDefault();
      toggleItem?.(e, value);
    }
  });

  const handleClick: React.MouseEventHandler<HTMLLIElement & HTMLDivElement> = useEventCallback(e => {
    onClick?.(e);

    if (!isSelectionEnabled || e.defaultPrevented) {
      return;
    }

    toggleItem?.(e, value);
  });

  const root = slot.always(
    getIntrinsicElementProps(DEFAULT_ROOT_EL_TYPE, {
      ref: ref as React.Ref<HTMLLIElement & HTMLDivElement>,
      tabIndex: focusableItems ? 0 : undefined,
      role: 'listitem',
      id: String(value),
      ...(isSelectionEnabled ? listItemProps : EMPTY_OBJECT),
      ...focusableGroupAttrs,
      ...props,
      onKeyDown: handleKeyDown,
      onClick: handleClick,
    }),
    { elementType: DEFAULT_ROOT_EL_TYPE },
  );

  const checkmark = slot.optional(props.checkmark, {
    defaultProps: { children: isSelected ? <Checkmark16Filled /> : null },
    renderByDefault: isSelectionEnabled,
    elementType: 'div',
  });

  const state: ListItemState = {
    components: {
      root: DEFAULT_ROOT_EL_TYPE,
      checkmark: 'div',
    },
    root,
    checkmark,
  };

  return state;
};
