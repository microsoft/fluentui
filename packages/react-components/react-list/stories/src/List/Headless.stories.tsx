/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import * as React from 'react';
// eslint-disable-next-line @fluentui/no-restricted-imports -- These base/context APIs are only exported by react-list.
import {
  renderList_unstable,
  useListBase_unstable,
  useListContextValues_unstable,
  useListItemBase_unstable,
  type ListItemBaseProps,
  type ListItemBaseSlots,
} from '@fluentui/react-list';
import { assertSlots } from '@fluentui/react-components';
import type { ForwardRefComponent, JSXElement, ListProps } from '@fluentui/react-components';

const HeadlessList: ForwardRefComponent<ListProps> = React.forwardRef((props, ref) => {
  const state = useListBase_unstable(props, ref);
  return renderList_unstable(state, useListContextValues_unstable(state));
});

const HeadlessListItem: ForwardRefComponent<ListItemBaseProps> = React.forwardRef((props, ref) => {
  const state = useListItemBase_unstable(props, ref);
  assertSlots<ListItemBaseSlots>(state);
  return (
    <state.root>
      {state.checkmark && <state.checkmark />}
      {state.root.children}
    </state.root>
  );
});

const items = ['Apple', 'Banana', 'Orange'];

export const Headless = (): JSXElement => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onKeyDown: React.KeyboardEventHandler<HTMLElement> = event => {
    let nextIndex = activeIndex;
    switch (event.key) {
      case 'ArrowDown':
        nextIndex = (activeIndex + 1) % items.length;
        break;
      case 'ArrowUp':
        nextIndex = (activeIndex + items.length - 1) % items.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = items.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    setActiveIndex(nextIndex);
    event.currentTarget.querySelectorAll<HTMLElement>('[role="option"]')[nextIndex].focus();
  };

  return (
    <HeadlessList selectionMode="multiselect" aria-label="Headless fruit choices" onKeyDown={onKeyDown}>
      {items.map((item, index) => (
        <HeadlessListItem
          key={item}
          value={item}
          aria-label={item}
          tabIndex={index === activeIndex ? 0 : -1}
          onFocus={() => setActiveIndex(index)}
          checkmark={{ 'aria-label': `Select ${item}` }}
        >
          {item}
        </HeadlessListItem>
      ))}
    </HeadlessList>
  );
};

Headless.parameters = {
  docs: {
    description: {
      story:
        'The base hooks preserve selection, roles, and Space/Enter actions without Fluent styling, a Fluent Checkbox, or Tabster navigation. This example renders native checkbox slots and supplies its own roving tab stop and ArrowUp/ArrowDown/Home/End navigation. Use useListContextValues_unstable with renderList_unstable to provide both selection and synchronous role/navigation contexts.',
    },
  },
};
