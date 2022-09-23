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
import { Delete20Regular, ArrowMove20Regular, Copy20Regular } from '@fluentui/react-icons';
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
    '&:hover *': {
      color: tokens.colorNeutralForeground1,
    },
  },
  actionBox: {
    marginRight: '4px',
    display: 'flex',
    flexDirection: 'row',
    columnGap: '2px',
  },
  icon: {
    ...shorthands.borderRadius('3px'),
    '&:hover': { boxShadow: '0 0 3px 0 #000d' },
  },
  selected: {
    backgroundColor: tokens.colorBrandBackground,
    borderLeftColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
  },
  title: { ...shorthands.padding('5px', 0) },
  deletePopover: { display: 'grid', gridTemplateRows: '1fr 1fr', gridTemplateColumns: '1fr 1fr', columnGap: '1rem' },
  deletePopoverCaption: { gridColumnStart: 1, gridColumnEnd: 3 },
});

interface IProps {
  node: JSONTreeElement;
  level: number;
  selected: boolean;
  handleAddComponent: (id: string, where: string) => void;
  handleDeleteComponent: (id: string) => void;
  handleDeleteSelected: React.MouseEventHandler<SVGElement | HTMLElement>;
  handleSelectComponent?: (jsonTreeElement: JSONTreeElement) => void;
  handleClone: React.MouseEventHandler<SVGElement | HTMLElement>;
  handleMove: React.MouseEventHandler<SVGElement | HTMLElement>;
}

const isMac = navigator.userAgent.indexOf('Mac OS X') !== -1;
const macKeyDown = e => {
  console.log(e);
  const keyCode = e.keyCode || e.which;
  const F10 = 121;
  if (e.shiftKey && keyCode === F10) {
    const activeElement = document.activeElement;
    if (activeElement) {
      const event = new MouseEvent('contextmenu', {
        bubbles: true,
        clientX: e.target.offsetLeft,
        clientY: e.target.offsetTop,
      });
      activeElement.dispatchEvent(event);
    }
  }
};

export const ComponentTreeItem: (props: IProps) => JSX.Element = ({
  node,
  level,
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

  const onKeyDown = React.useCallback(e => {
    if (isMac) {
      macKeyDown(e);
    }
  }, []);

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
            <span onClick={openPopover} className={styles.icon}>
              <Delete20Regular />
            </span>
          </Tooltip>
        </PopoverTrigger>
        <PopoverSurface className={styles.deletePopover}>
          <span className={styles.deletePopoverCaption}>Are you sure you want to delete {node.displayName}?</span>
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
  const onMouseLeave = React.useCallback(() => setOnHover(false), [setOnHover]);

  const addAfter = React.useCallback(() => handleAddComponent(String(node.uuid), 'after'), [
    handleAddComponent,
    node.uuid,
  ]);
  const addBefore = React.useCallback(() => handleAddComponent(String(node.uuid), 'before'), [
    handleAddComponent,
    node.uuid,
  ]);
  const addChild = React.useCallback(() => handleAddComponent(String(node.uuid), 'child'), [
    handleAddComponent,
    node.uuid,
  ]);
  const remove = React.useCallback(() => handleDeleteComponent(String(node.uuid)), [handleDeleteComponent, node.uuid]);

  return (
    <Menu openOnContext={true}>
      <MenuTrigger>
        <div
          onKeyDown={onKeyDown}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{ paddingLeft: `${(level + 1) * 0.5}rem` }}
          className={mergeClasses(styles.treeItem, selected && styles.selected)}
        >
          <span className={styles.title}>{node.displayName}</span>
          {(selected || onHover) && (
            <div className={styles.actionBox}>
              <Tooltip relationship="label" content="Move" withArrow>
                <span className={styles.icon} onClick={handleMove}>
                  <ArrowMove20Regular />
                </span>
              </Tooltip>
              <Tooltip relationship="label" content="Copy" withArrow>
                <span className={styles.icon} onClick={handleClone}>
                  <Copy20Regular />
                </span>
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
          <MenuItem onClick={handleMove}>Move</MenuItem>
          <MenuItem onClick={handleClone}>Copy</MenuItem>
          <MenuItem onClick={remove}>Delete</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
