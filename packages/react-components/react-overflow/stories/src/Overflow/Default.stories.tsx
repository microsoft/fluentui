import * as React from 'react';

import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  ForwardRefComponent,
  makeStyles,
  mergeClasses,
  tokens,
  MenuDivider,
  Toolbar,
  ToolbarButton,
  //--------
  Overflow,
  OverflowItem,
  useIsOverflowItemVisible,
} from '@fluentui/react-components';

import {
  MoreHorizontalRegular,
  MoreHorizontalFilled,
  CallRegular,
  CallFilled,
  bundleIcon,
} from '@fluentui/react-icons';

const Call = bundleIcon(CallRegular, CallFilled);
const MoreHorizontal = bundleIcon(MoreHorizontalRegular, MoreHorizontalFilled);

/* noop mocks for overflow - used for perf profiling */
// const Overflow = ({ children }) => children;
// const OverflowItem = ({ children }) => children;
// const useIsOverflowItemVisible = () => true;

Overflow.displayName = 'Overflow';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    minWidth: 0,
    overflow: 'hidden',
  },

  leftItems: {
    width: '200px',
    flex: '0 0 auto',
    alignSelf: 'center',
    background: 'salmon',
  },

  toolbar: {
    // minWidth: 0, // to allow shrinking, but does not leave enough space for the items, which do not overflow
    minWidth: '32px', // allow shrinking but keep space for single button
    flexGrow: 1, // to re-grow after shrinking
    // marginLeft: 'auto', // to push the toolbar to the right - does not work with flex-grow
    justifyContent: 'flex-end', // push to the right, instead of the marginLeft: auto
  },

  resizableArea: {
    minWidth: '160px',
    maxWidth: '800px',
    border: `2px solid ${tokens.colorBrandBackground}`,
    padding: '20px 10px 10px 10px',
    position: 'relative',
    resize: 'horizontal',
    '::after': {
      content: `'Resizable Area'`,
      position: 'absolute',
      padding: '1px 4px 1px',
      top: '-2px',
      left: '-2px',
      fontFamily: 'monospace',
      fontSize: '15px',
      fontWeight: 900,
      lineHeight: 1,
      letterSpacing: '1px',
      color: tokens.colorNeutralForegroundOnBrand,
      backgroundColor: tokens.colorBrandBackground,
    },
  },
});

/** Render an item either in the main area or in the overflow */
const ToolbarItem: ForwardRefComponent<{
  appId: string;
  isInOverflow?: boolean;
}> = React.forwardRef(({ appId, isInOverflow }, ref) => {
  console.log(`Item ${appId} render ${isInOverflow ? '' : 'NOT '}in overflow`);

  if (isInOverflow) {
    return <MenuItem>Item {appId} (in overflow)</MenuItem>;
  }

  return <ToolbarButton icon={<Call />} ref={ref} />;
});
ToolbarItem.displayName = 'ToolbarItem';

const ToolbarItemMemo = React.memo(ToolbarItem);

// ----------------------------------------------------------------------------------------

type ToolbarItems = {
  id: string;
  component: React.ReactElement;
  overflowComponent: React.ReactElement;
  priority?: number;
}[];

const toolbarItems: ToolbarItems = [
  {
    id: '1',
    component: <ToolbarItemMemo appId="1" />,
    overflowComponent: <ToolbarItemMemo appId="1" isInOverflow />,
  },
  {
    id: '2',
    component: null, // <ToolbarItemMemo appId="2" />,
    overflowComponent: null, // <ToolbarItemMemo appId="2" isInOverflow />,
    priority: 1,
  },
  {
    id: '3',
    component: <ToolbarItemMemo appId="3" />,
    overflowComponent: <ToolbarItemMemo appId="3" isInOverflow />,
  },
];

/**
 * Requirements:
 * - overflow menu is always visible as there are items which are always in overflow
 * - overflow in custom order (priority overflow)
 * - custom order of items in overflow?
 * ? how can I push the toolbar to the right?
 */
export const Default = () => {
  const classes = useStyles();

  return (
    <div className={mergeClasses(classes.container, classes.resizableArea)}>
      <div className={classes.leftItems}>Spacer</div>
      <Overflow minimumVisible={1}>
        <Toolbar className={classes.toolbar}>
          {toolbarItems.map(toolbarItem => (
            <OverflowItem key={toolbarItem.id} id={toolbarItem.id} priority={toolbarItem.priority}>
              {toolbarItem.component}
            </OverflowItem>
          ))}
          <OverflowItem id="overflow" priority={1000}>
            <OverflowMenu items={toolbarItems} />
          </OverflowItem>
        </Toolbar>
      </Overflow>
    </div>
  );
};

const OverflowItemWrapper: React.FC<{
  id: string;
  children: React.ReactElement;
}> = props => {
  const { id, children } = props;
  const isVisible = useIsOverflowItemVisible(id);

  if (isVisible) {
    return null;
  }

  return children;
};

const OverflowMenu = React.forwardRef<HTMLButtonElement, { items: ToolbarItems }>((props, ref) => {
  const { items } = props;
  // const { overflowCount, isOverflowing } = useOverflowMenu<HTMLButtonElement>();

  // if (!isOverflowing) {
  //   return null;
  // }

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <ToolbarButton icon={<MoreHorizontal />} ref={ref} />
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItem>Item above</MenuItem>
          <MenuDivider />
          {items.map(item => (
            <OverflowItemWrapper key={item.id} id={item.id}>
              {item.overflowComponent}
            </OverflowItemWrapper>
          ))}
          <MenuDivider />
          <MenuItem>Item below</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
});
