import * as React from 'react';
import { Tree, TreeItem, TreeItemLayout, TreeProps, TreeItemValue } from '@fluentui/react-tree-preview';
import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  makeStyles,
  shorthands,
} from '@fluentui/react-components';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';

type HeaderFactory = {
  headerName: string;
  min: number;
  max: number;
};

type Item = { value: string; content: string; children?: Item[] };

const createNestedTreeItems = (headers: HeaderFactory[]) => {
  const items: Item[] = [];

  headers.forEach(({ headerName, min, max }) => {
    if (max) {
      const children: Item[] = [];
      const itemNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      new Array(itemNumber).fill(0).forEach((_, i) => {
        children.push({ value: `${headerName}-${i}`, content: `${headerName}-${i}` });
      });
      items.push({ value: headerName, content: headerName, children });
    } else {
      items.push({ value: headerName, content: headerName });
    }
  });

  return items;
};

const ActionsExample = () => (
  <Menu>
    <MenuTrigger disableButtonEnhancement>
      <Button aria-label="More options" appearance="subtle" icon={<MoreHorizontal20Regular />} />
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuItem>New</MenuItem>
        <MenuItem>New Window</MenuItem>
        <MenuItem disabled>Open File</MenuItem>
        <MenuItem>Open Folder</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);

// ------------------------------ Sticky tree implementation ------------------------------

const nestedTreeItems = createNestedTreeItems([
  {
    headerName: 'Favorites',
    min: 5,
    max: 5,
  },
  // {
  //   headerName: 'Activity',
  //   min: 0,
  //   max: 0,
  // },
  // {
  //   headerName: 'Saved',
  //   min: 0,
  //   max: 0,
  // },
  // {
  //   headerName: 'Alexandria',
  //   min: 20,
  //   max: 20,
  // },
  {
    headerName: 'Chat',
    min: 30,
    max: 30,
  },
  {
    headerName: 'Channel',
    min: 10,
    max: 10,
  },
]);

const HEADER_HEIGHT = 32;
const useStyles = makeStyles({
  rail: {
    width: '360px',
    height: '800px',
    // boxSizing: 'border-box',
    ...shorthands.border('1px', 'solid', 'black'),
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  tree: {
    rowGap: '0px',
  },
  header: {
    backgroundColor: 'pink',
    zIndex: 99,
    // position: 'sticky',
    boxSizing: 'border-box',
    // height: `${HEADER_HEIGHT}px`,
    ...shorthands.borderBottom('1px', 'solid', 'magenta'),
  },
});

const RenderHeader = React.forwardRef<
  HTMLDivElement,
  {
    item: Item;
    children?: React.ReactNode;
    setSize: number;
    pos: number;
  }
>(({ item, children, pos, setSize }, ref) => {
  const classes = useStyles();

  const { content, value } = item;

  return (
    <TreeItem
      className={classes.header}
      // style={{
      //   top: `${HEADER_HEIGHT * (pos - 1)}px`,
      //   bottom: `${HEADER_HEIGHT * (setSize - pos)}px`,
      // }}
      ref={ref}
      value={value}
      itemType={children ? 'branch' : 'leaf'}
    >
      <TreeItemLayout actions={<ActionsExample />}>{content}</TreeItemLayout>
      {children}
    </TreeItem>
  );
});

const RenderItem = React.forwardRef<HTMLDivElement, { item: Item }>(({ item }, ref) => {
  const { value, content } = item;

  return (
    <TreeItem itemType="leaf" ref={ref} value={value}>
      <TreeItemLayout actions={<ActionsExample />}>{content}</TreeItemLayout>
    </TreeItem>
  );
});

export const StickyNestedTreeExample = () => {
  const [openItems, setOpenItems] = React.useState<TreeItemValue[]>(nestedTreeItems.map(item => item.value));

  const firstChildValueRef = React.useRef<TreeItemValue | undefined>(undefined);
  const onOpenChange: TreeProps['onOpenChange'] = (e, data) => {
    setOpenItems(curr => (data.open ? [...curr, data.value] : curr.filter(value => value !== data.value)));

    // if (data.open) {
    //   // scroll to make first child visible
    //   const expandedItemValue = data.value;
    //   firstChildValueRef.current = nestedTreeItems.find(item => item.value === expandedItemValue)?.children?.[0]?.value;
    // }
  };

  const classes = useStyles();

  return (
    <div className={classes.rail}>
      <Tree openItems={openItems} onOpenChange={onOpenChange} aria-label="Tree" className={classes.tree}>
        {nestedTreeItems.map((headerItem, i) => {
          return (
            <RenderHeader item={headerItem} setSize={nestedTreeItems.length} pos={i + 1}>
              {headerItem.children && (
                <Tree>
                  {headerItem.children.map(leafItem => {
                    return <RenderItem item={leafItem} />;
                  })}
                </Tree>
              )}
            </RenderHeader>
          );
        })}
      </Tree>
    </div>
  );
};

StickyNestedTreeExample.parameters = {
  docs: {
    description: {
      story: 'nested sticky tree prototype',
    },
  },
};
