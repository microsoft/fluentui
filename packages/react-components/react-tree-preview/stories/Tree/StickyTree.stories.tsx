import * as React from 'react';
import {
  FlatTree as Tree,
  TreeItem,
  // flattenTree_unstable,
  // TreeItemProps,
  TreeItemLayout,
  useHeadlessFlatTree_unstable,
  HeadlessFlatTreeItemProps,
  TreeProps,
  TreeItemValue,
} from '@fluentui/react-tree-preview';
import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useRestoreFocusTarget,
  makeStyles,
  shorthands,
  useMergedRefs,
} from '@fluentui/react-components';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';
import { HeadlessTreeItem } from '../../src/utils/createHeadlessTree';

/**
 * List of issues:
 * Issue1: expand an item.
 *
 */

/**
 * List of requirements from spec:
 * - can have header with no items
 * - will have animation when new header/item appear
 * - Users may have ability to delete rail list sections or drag/drop rail list sections across the rail list
 */

/**
 * Our current state with dnd:
 * - drag drop item within one section ✅
 * - drag drop section header ❓ (channel collapse and then expand all)
 * - item across sections 💥
 * - multiple drag 💥
 * - drag drop item between sections 💥
 */

// ------------------------------ utils to create flat tree items ------------------------------

type HeaderFactory = {
  headerName: string;
  min: number;
  max: number;
};

type FlatItem = HeadlessFlatTreeItemProps & { content: string };

const createFlatTreeItems = (headers: HeaderFactory[]) => {
  const items: FlatItem[] = [];

  headers.forEach(({ headerName, min, max }) => {
    items.push({ value: headerName, content: headerName });
    const itemNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    new Array(itemNumber).fill(0).forEach((_, i) => {
      items.push({ value: `${headerName}-${i}`, parentValue: headerName, content: `${headerName}-${i}` });
    });
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

const flatTreeItems = createFlatTreeItems([
  {
    headerName: 'Favorites',
    min: 5,
    max: 5,
  },
  {
    headerName: 'Activity',
    min: 0,
    max: 0,
  },
  {
    headerName: 'Saved',
    min: 0,
    max: 0,
  },
  {
    headerName: 'Alexandria',
    min: 20,
    max: 20,
  },
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
    position: 'sticky',
    boxSizing: 'border-box',
    height: `${HEADER_HEIGHT}px`,
    ...shorthands.borderBottom('1px', 'solid', 'magenta'),
  },
});

const RenderHeader = React.forwardRef<
  HTMLDivElement,
  {
    flatTreeItem: HeadlessTreeItem<FlatItem>; // TODO type
  }
>(({ flatTreeItem }, ref) => {
  const classes = useStyles();
  const focusTargetAttribute = useRestoreFocusTarget();

  const { content, ...treeItemProps } = flatTreeItem.getTreeItemProps();
  const pos = treeItemProps['aria-posinset'];
  const setSize = treeItemProps['aria-setsize'];

  return (
    <TreeItem
      aria-description="has context menu"
      {...focusTargetAttribute}
      {...treeItemProps}
      className={classes.header}
      style={{
        top: `${HEADER_HEIGHT * (pos - 1)}px`,
        bottom: `${HEADER_HEIGHT * (setSize - pos)}px`,
      }}
      ref={ref}
    >
      <TreeItemLayout actions={<ActionsExample />}>{content}</TreeItemLayout>
    </TreeItem>
  );
});

const useScrollItemIfNeeded_item = ({
  value,
  parentJustExpanded,
  isBehindHeaders,
}: {
  value: TreeItemValue;
  parentJustExpanded?: boolean;
  isBehindHeaders: (element: HTMLElement, value: TreeItemValue) => boolean | undefined;
}) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (itemRef.current && parentJustExpanded) {
      // Issue1: solution 1 - this is the simplest solution.
      // Pro: simple
      // Con:
      // - scroll jump for a collapsed header in the middle.
      // - No guarantee of visibility.
      // itemRef.current.scrollIntoView({ block: 'center' });
      //
      // Issue1: solution 2 - check if the item is hidden, if it is, scroll it to center
      // Pro: no scroll jump
      // Con:
      // - need to keep ref on all headers
      // - no gurantee of visibility
      if (isBehindHeaders(itemRef.current, value)) {
        itemRef.current.scrollIntoView({ block: 'center' });
      }
      //
      // Issue1: solution 3 - check if the item is hidden, if it is, dock its parent to top?
    }
  }, [parentJustExpanded]);
  return itemRef;
};

const RenderItem = React.forwardRef<
  HTMLDivElement,
  {
    flatTreeItem: HeadlessTreeItem<FlatItem>; // TODO type
    parentJustExpanded?: boolean;
    isBehindHeaders: (element: HTMLElement, value: TreeItemValue) => boolean | undefined;
  }
>(({ flatTreeItem, parentJustExpanded, isBehindHeaders }, ref) => {
  const focusTargetAttribute = useRestoreFocusTarget();

  const { content, ...treeItemProps } = flatTreeItem.getTreeItemProps();

  const itemRef = useScrollItemIfNeeded_item({
    value: treeItemProps.value,
    parentJustExpanded,
    isBehindHeaders,
  });

  return (
    <TreeItem
      aria-description="has context menu"
      {...focusTargetAttribute}
      {...treeItemProps}
      ref={useMergedRefs(ref, itemRef)}
    >
      <TreeItemLayout actions={<ActionsExample />}>{content}</TreeItemLayout>
    </TreeItem>
  );
});

const useScrollItemIfNeeded_tree = () => {
  const headerRefs: Array<{ ref: React.RefObject<HTMLDivElement>; value: TreeItemValue }> = [];
  flatTreeItems
    .map(item => item.value)
    .forEach(value => {
      const headerRef = React.useRef<HTMLDivElement>(null);
      headerRefs.push({
        ref: headerRef,
        value,
      });
    });

  const containerRef = React.useRef<HTMLDivElement>(null);

  const isBehindHeaders = (element: HTMLElement, value: TreeItemValue) => {
    // consider an item is hidden if:
    // - its top is above its parent header's bottom
    // - or when it's bottom is below its parent's right sibling's top.
    // - or when it's top is below the scroll container's bottom.
    const elementRect = element.getBoundingClientRect();
    let parentValue: TreeItemValue | undefined;
    let nextSiblingOfParentValue: TreeItemValue | undefined;
    for (const item of flatTreeItems) {
      if (item.value === value) {
        parentValue = item.parentValue;
      }
      if (parentValue && !item.parentValue) {
        nextSiblingOfParentValue = item.value;
        break;
      }
    }

    const parentRect = parentValue
      ? headerRefs.find(headerRef => headerRef.value === parentValue)?.ref.current?.getBoundingClientRect()
      : undefined;
    const nextSiblingOfParentRect = nextSiblingOfParentValue
      ? headerRefs
          .find(headerRefs => headerRefs.value === nextSiblingOfParentValue)
          ?.ref.current?.getBoundingClientRect()
      : undefined;

    const containerRect = containerRef.current?.getBoundingClientRect();

    return (
      (parentRect && elementRect.top < parentRect?.bottom) ||
      (nextSiblingOfParentRect && elementRect.bottom > nextSiblingOfParentRect?.top) ||
      (containerRect &&
        elementRect.top + 2 >= // leave some offset in case of focus ring
          containerRect.bottom) // ❗️ this check requires rail to be content-box, otherwise it needs to be elementRect.top+railBorderWidth >= containerRect.bottom
    );
  };

  return { headerRefs, containerRef, isBehindHeaders };
};

export const StickyTreeExample = () => {
  const [openItems, setOpenItems] = React.useState<TreeProps['openItems']>(flatTreeItems.map(item => item.value));

  const firstChildValueRef = React.useRef<TreeItemValue | undefined>(undefined);
  const onOpenChange: TreeProps['onOpenChange'] = (e, data) => {
    setOpenItems(data.openItems);
    if (data.open) {
      // scroll to make first child visible
      const expandedItemValue = data.value;
      firstChildValueRef.current = flatTreeItems.find(item => item.parentValue === expandedItemValue)?.value;
    }
  };

  const flatTree = useHeadlessFlatTree_unstable(flatTreeItems, {
    openItems,
    onOpenChange,
  });
  const classes = useStyles();

  const { headerRefs, containerRef, isBehindHeaders } = useScrollItemIfNeeded_tree();

  return (
    <div className={classes.rail} ref={containerRef}>
      <Tree {...flatTree.getTreeProps()} aria-label="Tree" className={classes.tree}>
        {Array.from(flatTree.items(), flatTreeItem => {
          return flatTreeItem.level === 1 ? (
            <RenderHeader
              flatTreeItem={flatTreeItem}
              ref={headerRefs.find(headerRef => headerRef.value === flatTreeItem.value)?.ref}
            />
          ) : (
            <RenderItem
              flatTreeItem={flatTreeItem}
              parentJustExpanded={firstChildValueRef.current === flatTreeItem.value}
              isBehindHeaders={isBehindHeaders}
            />
          );
        })}
      </Tree>
    </div>
  );
};

StickyTreeExample.parameters = {
  docs: {
    description: {
      story: 'sticky tree prototype',
    },
  },
};
