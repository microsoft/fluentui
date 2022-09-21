import * as React from 'react';
import {
  Button,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Menu,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuTrigger,
  makeStyles,
  tokens,
  shorthands,
  mergeClasses,
} from '@fluentui/react-components';
import { DeleteRegular, ArrowMoveRegular, CopyRegular } from '@fluentui/react-icons';
import { JSONTreeElement } from './types';

const useStyles = makeStyles({
  treeItem: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shorthands.borderLeft('4px', 'solid', 'transparent'),
    '&:hover': {
      backgroundColor: tokens.colorBrandBackground2,
      borderLeftColor: tokens.colorBrandBackground,
    },
    '&:hover span': {
      color: tokens.colorNeutralForeground1,
    },
  },
  selected: {
    backgroundColor: tokens.colorBrandBackground,
    borderLeftColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  title: { ...shorthands.padding('5px', 0) },
  button: { color: tokens.colorNeutralForegroundOnBrand },
  deletePopover: { display: 'grid', gridTemplateRows: '1fr 1fr', gridTemplateColumns: '1fr 1fr', columnGap: '1rem' },
  deletePopoverCaption: { gridColumnStart: 1, gridColumnEnd: 3 },
});

export type ComponentTreeNode = {
  id: string;
  title: string;
  level: number;
  element: JSONTreeElement | null;
};

const isMac = navigator.userAgent.indexOf('Mac OS X') !== -1;
const macKeyDown = (e, target: HTMLElement) => {
  const keyCode = e.keyCode || e.which;
  const F10 = 121;
  if (e.shiftKey && keyCode === F10) {
    const activeElement = document.activeElement;
    if (activeElement) {
      const event = new MouseEvent('contextmenu', {
        bubbles: true,
        clientX: target.offsetLeft,
        clientY: target.offsetTop,
      });
      activeElement.dispatchEvent(event);
    }
  }
};

interface IProps {
  node: ComponentTreeNode;
  selected: boolean;
  handleAddComponent: (id: string, where: string) => void;
  handleDeleteComponent: (id: string) => void;
  handleDeleteSelected: React.MouseEventHandler<HTMLButtonElement>;
  handleSelectComponent?: (jsonTreeElement: JSONTreeElement) => void;
  handleClone: React.MouseEventHandler<HTMLButtonElement>;
  handleMove: React.MouseEventHandler<HTMLButtonElement>;
}

export const ComponentTreeItem: (props: IProps) => JSX.Element = ({
  node,
  selected,
  handleAddComponent,
  handleDeleteComponent,
  handleDeleteSelected,
  handleSelectComponent,
  handleClone,
  handleMove,
}) => {
  const styles = useStyles();

  const [deletePopoverOpened, setDeletePopoverOpened] = React.useState(false);
  const [onHover, setOnHover] = React.useState(false);

  const openPopover = React.useCallback(() => setDeletePopoverOpened(true), [setDeletePopoverOpened]);
  const closePopover = React.useCallback(() => setDeletePopoverOpened(false), [setDeletePopoverOpened]);

  const selectItem = React.useCallback(() => {
    if (selected) {
      return;
    }
    handleSelectComponent(node.element);
  }, [handleSelectComponent, node, selected]);

  const onKeyDown = React.useCallback(
    e => {
      // enter or space
      if (e.key === 'Enter' || e.keyCode === 32) {
        selectItem();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.target.nextSibling && e.target.nextSibling.focus();
        return;
      }
      if (e.key === 'ArrowUp') {
        e.target.previousSibling && e.target.previousSibling.focus();
        return;
      }

      if (isMac) {
        macKeyDown(e, e.target);
      }
    },
    [selectItem],
  );

  React.useEffect(() => {
    if (!selected) {
      setDeletePopoverOpened(false);
    }
  }, [selected]);

  const deleteButton = React.useMemo(
    () => (
      <Popover open={deletePopoverOpened}>
        <PopoverTrigger>
          <Tooltip relationship="label" content="Delete" withArrow>
            <Button
              icon={<DeleteRegular />}
              appearance="subtle"
              size="small"
              onClick={openPopover}
              className={styles.button}
            />
          </Tooltip>
        </PopoverTrigger>
        <PopoverSurface className={styles.deletePopover}>
          <span className={styles.deletePopoverCaption}>Are you sure you want to delete {node.title}?</span>
          <Button onClick={closePopover}>Cancel</Button>
          <Button appearance="primary" onClick={handleDeleteSelected}>
            Delete
          </Button>
        </PopoverSurface>
      </Popover>
    ),
    [node, deletePopoverOpened, openPopover, closePopover, handleDeleteSelected, styles],
  );

  const onMouseEnter = React.useCallback(() => setOnHover(true), [setOnHover]);
  const onMouseLeave = React.useCallback(() => setOnHover(true), [setOnHover]);

  const addAfter = React.useCallback(() => handleAddComponent(node.id, 'after'), [handleAddComponent, node.id]);
  const addBefore = React.useCallback(() => handleAddComponent(node.id, 'before'), [handleAddComponent, node.id]);
  const addChild = React.useCallback(() => handleAddComponent(node.id, 'child'), [handleAddComponent, node.id]);
  const remove = React.useCallback(() => handleDeleteComponent(node.id), [handleDeleteComponent, node.id]);

  return (
    <Menu openOnContext={true}>
      <MenuTrigger>
        <div
          tabIndex={0}
          onKeyDown={onKeyDown}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={selectItem}
          style={{ paddingLeft: `${node.level * 0.5}rem` }}
          className={mergeClasses(styles.treeItem, selected && styles.selected)}
        >
          <span className={styles.title}>{node.title}</span>
          {(selected || onHover) && (
            <div>
              <Tooltip relationship="label" content="Move" withArrow>
                <Button
                  icon={<ArrowMoveRegular />}
                  appearance="subtle"
                  size="small"
                  className={styles.button}
                  onClick={handleMove}
                />
              </Tooltip>
              <Tooltip relationship="label" content="Copy" withArrow>
                <Button
                  icon={<CopyRegular />}
                  appearance="subtle"
                  size="small"
                  className={styles.button}
                  onClick={handleClone}
                />
              </Tooltip>
              {deleteButton}
            </div>
          )}
        </div>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem onClick={addAfter}>Add after</MenuItem>
          <MenuItem onClick={addBefore}>Add before</MenuItem>
          <MenuItem onClick={addChild}>Add child</MenuItem>
          <MenuItem onClick={remove}>Remove</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
