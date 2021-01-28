import * as React from 'react';
import { Checkbox, FocusZone, FocusZoneDirection, css, IIconProps } from '@fluentui/react';
import { IconButton } from '@fluentui/react/lib/compat/Button';
import { TodoItemData } from '../types/index';

import { itemStyles } from './styles';
import strings from './../strings';

export interface TodoItemProps {
  /** The item to render. */
  item: TodoItemData;

  /** Callback for when this item's checkbox is checked or unchecked. */
  onToggleComplete: (item: TodoItemData) => void;

  /** Callback for when this item's delete button is triggered. */
  onDeleteItem: (item: TodoItemData) => void;
}

const ANIMATION_TIMEOUT = 200;
const clearIconProps: IIconProps = { iconName: 'Clear' };

// Used to control item animations
// (const enums can cause problems when exported, but this one is okay since it's internal)
const enum ItemState {
  initial, // 0
  completing, // 1
  deleting, // 2
  hidden, // 3
}
// TODO: Remove use of global classes for transitions
const STATE_CLASSES = [
  'ms-slideDownIn20', // initial
  'ms-slideUpOut20', // completing
  'ms-slideUpOut20', // deleting
  itemStyles.isHidden, // hidden
];

/** Individual item in a todo list, with complete and delete actions. */
export const TodoItem: React.FunctionComponent<TodoItemProps> = props => {
  const { item, onDeleteItem, onToggleComplete } = props;

  const [itemState, setItemState] = React.useState<ItemState>(ItemState.initial);

  const onComplete = React.useCallback(() => setItemState(ItemState.completing), []);
  const onDelete = React.useCallback(() => {
    setItemState(ItemState.deleting);
  }, []);

  // Handle complete or delete animations and callbacks
  React.useEffect(() => {
    if (itemState !== ItemState.completing && itemState !== ItemState.deleting) {
      return;
    }

    const animationTimeout = setTimeout(() => {
      const callback = itemState === ItemState.completing ? onToggleComplete : onDeleteItem;
      callback(item);
      setItemState(ItemState.hidden);
    }, ANIMATION_TIMEOUT);

    return () => clearTimeout(animationTimeout);
  }, [item, itemState, onDeleteItem, onToggleComplete]);

  return (
    <div
      role="row"
      className={css(itemStyles.todoItem, item.isComplete && itemStyles.isCompleted, STATE_CLASSES[itemState])}
      aria-label={_getAriaLabel(item)}
      data-is-focusable={true}
      data-item-id={item.id} // for automation
    >
      <FocusZone direction={FocusZoneDirection.horizontal}>
        <div className={itemStyles.itemTaskRow}>
          <Checkbox label={item.title} onChange={onComplete} checked={!!item.isComplete} />
          <IconButton
            className={itemStyles.deleteButton}
            iconProps={clearIconProps}
            onClick={onDelete}
            title={strings.deleteItemTitle}
            ariaLabel={strings.deleteItemAriaLabel}
          />
        </div>
      </FocusZone>
    </div>
  );
};
TodoItem.displayName = 'TodoItem';

function _getAriaLabel(item: TodoItemData): string {
  const completeStateString = item.isComplete ? strings.completed : strings.active;
  const titleString = strings.todoItemAriaLabelTitle + item.title;
  return `${titleString}. ${completeStateString}`;
}
