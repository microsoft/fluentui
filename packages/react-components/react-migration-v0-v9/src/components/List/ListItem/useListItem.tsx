import { useARIAButtonProps } from '@fluentui/react-aria';
import { getIntrinsicElementProps, slot, useEventCallback, useId } from '@fluentui/react-utilities';
import * as React from 'react';
import { useListContext_unstable } from '../List/listContext';
import type { ListItemProps, ListItemState } from './ListItem.types';

const DEFAULT_ROOT_EL_TYPE = 'li';

function validateProperElementTypes(parentRenderedAs?: 'div' | 'ul' | 'ol', renderedAs?: 'div' | 'li') {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  if (renderedAs === 'div' && parentRenderedAs !== 'div') {
    throw new Error('ListItem cannot be rendered as a div when its parent is not a div.');
  }
  if (renderedAs === 'li' && parentRenderedAs === 'div') {
    throw new Error('ListItem cannot be rendered as a li when its parent is a div.');
  }
}

function validateNavigableWhenOnClickPresent(navigable: boolean, onClick?: React.MouseEventHandler) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  if (onClick && !navigable) {
    throw new Error('ListItem must be navigable when onClick is present. Set navigable={true} on the List.');
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
  const { value = id, truncateHeader, truncateContent, onClick, onKeyDown, onKeyUp } = props;

  const navigable = useListContext_unstable(ctx => ctx.navigable);
  const toggleItem = useListContext_unstable(ctx => ctx.selection?.toggleItem);
  const isSelectionEnabled = useListContext_unstable(ctx => !!ctx.selection);
  const isSelected = useListContext_unstable(ctx => ctx.selection?.isSelected(value));

  const truncateHeaderOnList = useListContext_unstable(ctx => ctx.truncateHeader);
  const truncateContentOnList = useListContext_unstable(ctx => ctx.truncateContent);

  const parentRenderedAs = useListContext_unstable(ctx => ctx.as);
  const renderedAs = props.as || DEFAULT_ROOT_EL_TYPE;

  validateProperElementTypes(parentRenderedAs, renderedAs);

  validateNavigableWhenOnClickPresent(navigable, onClick);

  const handleClick: React.MouseEventHandler<HTMLLIElement & HTMLDivElement> = useEventCallback(e => {
    onClick?.(e);

    if (!isSelectionEnabled || e.defaultPrevented) {
      return;
    }

    toggleItem?.(e, value);
  });

  // This will give us the onKeyDown and onKeyUp props for Enter and Space
  const buttonProps = useARIAButtonProps('div', {
    onClick: handleClick,
    onKeyDown: onKeyDown as React.KeyboardEventHandler<HTMLLIElement & HTMLDivElement>,
    onKeyUp: onKeyUp as React.KeyboardEventHandler<HTMLLIElement & HTMLDivElement>,
  });

  const root = slot.always(
    getIntrinsicElementProps(DEFAULT_ROOT_EL_TYPE, {
      ref: ref as React.Ref<HTMLLIElement & HTMLDivElement>,
      tabIndex: navigable || isSelectionEnabled ? 0 : undefined,
      role: navigable ? 'menuitem' : 'listitem',
      id: String(value),
      ...(isSelectionEnabled && {
        role: 'option',
        'aria-selected': isSelected,
      }),
      ...props,
      onKeyDown: buttonProps.onKeyDown as React.KeyboardEventHandler<HTMLLIElement & HTMLDivElement>,
      onKeyUp: buttonProps.onKeyUp as React.KeyboardEventHandler<HTMLLIElement & HTMLDivElement>,
      onClick: buttonProps.onClick as React.MouseEventHandler<HTMLLIElement & HTMLDivElement>,
    }),
    { elementType: DEFAULT_ROOT_EL_TYPE },
  );

  const state: ListItemState = {
    components: {
      root: DEFAULT_ROOT_EL_TYPE,
      media: 'div',
      header: 'div',
      contentWrapper: 'div',
      headerMedia: 'div',
      contentMedia: 'div',
      endMedia: 'div',
    },
    root,
    navigable,
    selectable: isSelectionEnabled,
    selected: isSelected,
    media: slot.optional(props.media, { elementType: 'div' }),
    header: slot.optional(props.header, { elementType: 'div' }),
    contentWrapper: slot.optional(props.contentWrapper, { elementType: 'div', renderByDefault: true }),
    headerMedia: slot.optional(props.headerMedia, { elementType: 'div' }),
    contentMedia: slot.optional(props.contentMedia, { elementType: 'div' }),
    endMedia: slot.optional(props.endMedia, { elementType: 'div' }),
    truncateHeader: truncateHeader ?? truncateHeaderOnList,
    truncateContent: truncateContent ?? truncateContentOnList,
  };

  return state;
};
