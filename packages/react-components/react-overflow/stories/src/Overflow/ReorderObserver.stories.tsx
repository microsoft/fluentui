import * as React from 'react';
import type { JSXElement, OverflowItemProps } from '@fluentui/react-components';
import {
  makeStyles,
  Button,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuButton,
  tokens,
  mergeClasses,
  Overflow,
  OverflowItem,
  OverflowReorderObserver,
  useIsOverflowItemVisible,
  useOverflowMenu,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    minWidth: 0,
    overflow: 'hidden',
  },
  resizableArea: {
    minWidth: '200px',
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
  controls: {
    display: 'flex',
    gap: '8px',
    marginTop: '12px',
  },
});

const INITIAL_IDS = new Array(8).fill(0).map((_, i) => i.toString());

export const ReorderObserver = (): JSXElement => {
  const styles = useStyles();
  const [itemIds, setItemIds] = React.useState(INITIAL_IDS);

  return (
    <>
      <Overflow>
        <div className={mergeClasses(styles.container, styles.resizableArea)}>
          <OverflowReorderObserver />
          {itemIds.map(id => (
            <OverflowItem key={id} id={id}>
              <Button>Item {id}</Button>
            </OverflowItem>
          ))}
          <OverflowMenu itemIds={itemIds} />
        </div>
      </Overflow>

      <div className={styles.controls}>
        <Button onClick={() => setItemIds(prev => [...prev].reverse())}>Reverse order</Button>
        <Button onClick={() => setItemIds(INITIAL_IDS)}>Reset</Button>
      </div>
    </>
  );
};

const OverflowMenuItem: React.FC<Pick<OverflowItemProps, 'id'>> = props => {
  const { id } = props;
  const isVisible = useIsOverflowItemVisible(id);

  if (isVisible) {
    return null;
  }

  return <MenuItem>Item {id}</MenuItem>;
};

const OverflowMenu: React.FC<{ itemIds: string[] }> = ({ itemIds }) => {
  const { ref, overflowCount, isOverflowing } = useOverflowMenu<HTMLButtonElement>();

  if (!isOverflowing) {
    return null;
  }

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuButton ref={ref}>+{overflowCount} items</MenuButton>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          {itemIds.map(id => (
            <OverflowMenuItem key={id} id={id} />
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

ReorderObserver.parameters = {
  docs: {
    description: {
      story: [
        'When items inside `<Overflow>` are reordered, added, or removed via React',
        'state without a container resize, the overflow manager does not recompute',
        'on its own — it only listens to `ResizeObserver`. Including the renderless',
        '`<OverflowReorderObserver />` opts the container into a `MutationObserver`',
        'that triggers a recompute on every direct-child mutation.',
        '',
        'This is particularly useful for drag-and-drop scenarios where items are',
        'reordered in-place: the DOM changes without any size change, so without the',
        'observer the manager would not notice that visibility needs to flip.',
      ].join('\n'),
    },
  },
};
