import React from 'react';
import _ from 'lodash';
import {
  Toolbar,
  toolbarItemClassName,
  toolbarMenuClassName,
  Ref,
  Button,
  toolbarClassName,
  toolbarItemWrapperClassName,
} from '@fluentui/react-northstar';

export const selectors = {
  toolbarItem: toolbarItemClassName,
  toolbar: toolbarClassName,
  toolbarItemWrapper: toolbarItemWrapperClassName,
  menuTrigger: 'menu-trigger',
  itemButtonId: 'item-button',
  toolbarMenu: toolbarMenuClassName,
  afterToolbarId: 'after',
};

export const itemsCount = 20;
const buttonAfterToolbarRef = React.createRef<HTMLButtonElement>();

const ToolbarExampleOverflow = () => {
  const icons = ['bold', 'italic', 'underline'];

  const itemData = _.times(itemsCount, i => ({
    key: `b${i}`,
    id: `${selectors.itemButtonId}-${i}`,
    content: `${icons[i % icons.length]} #${i}`,
    icon: icons[i % icons.length],
    title: `${icons[i % icons.length]} #${i}`,
    onClick: i + 1 === itemsCount ? () => buttonAfterToolbarRef.current.focus() : undefined,
    // first half of items are unwrapped, rest are wrapped, expect of the last item
    // don't add submenu on last item, on last item onClick with moving focus is tested
    ...(i >= itemsCount / 2 && i + 1 < itemsCount && { menu: [] }),
  }));

  const toolbarItems = itemData.map(item => {
    return { ...item, content: undefined };
  });
  const [overflowOpen, setOverflowOpen] = React.useState(false);
  return (
    <>
      <Toolbar
        aria-label="Toolbar overflow menu"
        items={toolbarItems}
        overflow
        overflowOpen={overflowOpen}
        overflowItem={{
          title: 'More',
          id: selectors.menuTrigger,
        }}
        onOverflowOpenChange={(e, { overflowOpen }) => {
          setOverflowOpen(overflowOpen);
        }}
        getOverflowItems={startIndex => itemData.slice(startIndex)}
      />
      <Ref innerRef={buttonAfterToolbarRef}>
        <Button id={selectors.afterToolbarId}>After</Button>
      </Ref>
    </>
  );
};

export default ToolbarExampleOverflow;
