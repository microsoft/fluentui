import {
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
  Button,
  Menu,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useIsOverflowItemVisible,
  useOverflowMenu,
  Overflow,
  OverflowItem,
  MenuItem,
} from '@fluentui/react-components';
import * as React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  partitionBreadcrumbItems,
} from '@fluentui/react-breadcrumb';
import { buttonItems, Item } from '../Breadcrumb/data';
import { MoreHorizontalRegular, MoreHorizontalFilled, bundleIcon } from '@fluentui/react-icons';

const MoreHorizontal = bundleIcon(MoreHorizontalFilled, MoreHorizontalRegular);

const OverflowBreadcrumbButton = (props: Item) => {
  const { buttonProps, item } = props;
  const isVisible = useIsOverflowItemVisible(item.key);

  if (isVisible) {
    return null;
  }
  // MenuItem has icon
  return (
    <MenuItem key={item.key} {...buttonProps} icon={item.icon}>
      {item.item}
    </MenuItem>
  );
};

//----- OverflowMenu -----//

const useOverflowMenuStyles = makeStyles({
  menu: {
    backgroundColor: tokens.colorNeutralBackground1,
  },
  menuButton: {
    alignSelf: 'center',
  },
});

/**
 * A menu for selecting tabs that have overflowed and are not visible.
 */
const OverflowMenu = () => {
  const { ref, isOverflowing, overflowCount } = useOverflowMenu<HTMLButtonElement>();

  const styles = useOverflowMenuStyles();

  if (!isOverflowing) {
    return null;
  }

  return (
    <Menu hasIcons>
      <MenuTrigger disableButtonEnhancement>
        <Button
          appearance="transparent"
          className={styles.menuButton}
          ref={ref}
          icon={<MoreHorizontal />}
          aria-label={`${overflowCount} more tabs`}
          role="tab"
        />
      </MenuTrigger>
      <MenuPopover>
        <MenuList className={styles.menu}>
          {buttonItems.map(item => (
            <OverflowBreadcrumbButton key={item.key} item={item} />
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

//----- Stories -----//

const useExampleStyles = makeStyles({
  example: {
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.overflow('hidden'),
    ...shorthands.padding('5px'),
    zIndex: 0, //stop the browser resize handle from piercing the overflow menu
  },
  horizontal: {
    height: 'fit-content',
    minWidth: '150px',
    resize: 'horizontal',
    width: '600px',
  },
  vertical: {
    height: '250px',
    minHeight: '100px',
    resize: 'vertical',
    width: 'fit-content',
    display: 'flex',
    alignContent: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    justifyItems: 'stretch',
  },
});

const BreadcrumbOverflowExample = () => {
  const styles = useExampleStyles();

  return (
    <div className={mergeClasses(styles.example, styles.horizontal)}>
      <Overflow>
        <Breadcrumb>
          {buttonItems.map(item => {
            return (
              <OverflowItem key={item.key} id={`${item.key}`}>
                <BreadcrumbItem>
                  <BreadcrumbButton {...item.buttonProps}>{item.item}</BreadcrumbButton>
                </BreadcrumbItem>
              </OverflowItem>
            );
          })}
          <OverflowMenu />
        </Breadcrumb>
      </Overflow>
    </div>
  );
};

const ControlledOverflowMenu = (props: Items) => {
  const { overflowItems, startDisplayedItems, endDisplayedItems } = props;
  const { ref, isOverflowing, overflowCount } = useOverflowMenu<HTMLButtonElement>();

  const styles = useOverflowMenuStyles();

  if (!isOverflowing && overflowItems.length === 0) {
    return null;
  }

  return (
    <Menu hasIcons>
      <MenuTrigger disableButtonEnhancement>
        <Button
          appearance="transparent"
          className={styles.menuButton}
          ref={ref}
          icon={<MoreHorizontal />}
          aria-label={`${overflowCount} more tabs`}
          role="tab"
        />
      </MenuTrigger>
      <MenuPopover>
        <MenuList className={styles.menu}>
          {isOverflowing && startDisplayedItems.map(item => <OverflowBreadcrumbButton key={item.key} item={item} />)}
          {overflowItems && overflowItems.map(item => <OverflowBreadcrumbButton key={item.key} item={item} />)}
          {isOverflowing && endDisplayedItems.map(item => <OverflowBreadcrumbButton key={item.key} item={item} />)}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
const BreadcrumbControlledOverflowExample = () => {
  const styles = useExampleStyles();

  const { startDisplayedItems, overflowItems, endDisplayedItems } = partitionBreadcrumbItems({
    items: buttonItems,
    maxDisplayedItems: 4,
    overflowIndex: 2,
  });

  return (
    <div className={mergeClasses(styles.example, styles.horizontal)}>
      <Breadcrumb>
        {startDisplayedItems.map(item => {
          return (
            <OverflowItem key={item.key} id={`${item.key}`}>
              <BreadcrumbItem>
                <BreadcrumbButton {...item.buttonProps}>{item.item}</BreadcrumbButton>
              </BreadcrumbItem>
            </OverflowItem>
          );
        })}
        <ControlledOverflowMenu
          overflowItems={overflowItems}
          startDisplayedItems={startDisplayedItems}
          endDisplayedItems={endDisplayedItems}
        />
        {endDisplayedItems &&
          endDisplayedItems.map(item => {
            return (
              <OverflowItem key={item.key} id={`${item.key}`}>
                <BreadcrumbItem>
                  <BreadcrumbButton {...item.buttonProps}>{item.item}</BreadcrumbButton>
                </BreadcrumbItem>
              </OverflowItem>
            );
          })}
      </Breadcrumb>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    ...shorthands.overflow('auto'),
    ...shorthands.padding('50px', '20px'),
    rowGap: '20px',
    minHeight: '600px', //lets the page remain at a minimum height when vertical tabs are resized
  },
});
export const BreadcrumbWithOverflow = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <BreadcrumbOverflowExample />
      <BreadcrumbControlledOverflowExample />
    </div>
  );
};
