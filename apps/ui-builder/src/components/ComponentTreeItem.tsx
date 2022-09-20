import * as React from 'react';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverSurface,
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
    '&:hover': {
      backgroundColor: tokens.colorBrandBackground2,
    },
    '&:hover span': {
      color: tokens.colorNeutralForeground1,
    },
  },
  selected: {
    backgroundColor: tokens.colorBrandBackground,
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

interface IProps {
  node: ComponentTreeNode;
  selected: boolean;
  handleDeleteComponent: (uuid) => void;
  handleDeleteSelected: React.MouseEventHandler<HTMLButtonElement>;
  handleSelectComponent?: (jsonTreeElement: JSONTreeElement) => void;
  handleClone: React.MouseEventHandler<HTMLButtonElement>;
  handleMove: React.MouseEventHandler<HTMLButtonElement>;
}

export const ComponentTreeItem: (props: IProps) => JSX.Element = ({
  node,
  selected,
  handleDeleteComponent,
  handleDeleteSelected,
  handleSelectComponent,
  handleClone,
  handleMove,
}) => {
  const styles = useStyles();

  const [open, setOpen] = React.useState(false);

  const openPopover = React.useCallback(() => setOpen(true), [setOpen]);
  const closePopover = React.useCallback(() => setOpen(false), [setOpen]);
  // const deleteNode = React.useCallback(() => handleDeleteComponent(node.id), [node, handleDeleteComponent]);

  const selectItem = React.useCallback(() => {
    if (selected) {
      return;
    }
    handleSelectComponent(node.element);
  }, [handleSelectComponent, node, selected]);

  const onkeydown = React.useCallback(
    e => {
      // enter or space
      if (e.key === 'Enter' || e.keyCode === 32) {
        selectItem();
      }

      if (e.key === 'ArrowDown') {
        e.target.nextSibling && e.target.nextSibling.focus();
      }
      if (e.key === 'ArrowUp') {
        e.target.previousSibling && e.target.previousSibling.focus();
      }
    },
    [selectItem],
  );

  React.useEffect(() => {
    if (!selected) {
      setOpen(false);
    }
  }, [selected]);

  const deleteButton = React.useMemo(
    () => (
      <Popover open={open}>
        <PopoverTrigger>
          <Button
            icon={<DeleteRegular />}
            appearance="subtle"
            size="small"
            onClick={openPopover}
            className={styles.button}
          />
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
    [node, open, openPopover, closePopover, handleDeleteSelected, styles],
  );

  return (
    <div
      tabIndex={0}
      onKeyDown={onkeydown}
      onClick={selectItem}
      style={{ paddingLeft: `${node.level * 0.5}rem` }}
      className={mergeClasses(styles.treeItem, selected && styles.selected)}
    >
      <span className={styles.title}>{node.title}</span>
      {selected && (
        <div>
          <Button
            icon={<ArrowMoveRegular />}
            appearance="subtle"
            size="small"
            className={styles.button}
            onClick={handleMove}
          />
          <Button
            icon={<CopyRegular />}
            appearance="subtle"
            size="small"
            className={styles.button}
            onClick={handleClone}
          />
          {deleteButton}
        </div>
      )}
    </div>
  );
};
