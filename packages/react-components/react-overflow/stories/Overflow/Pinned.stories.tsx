import * as React from 'react';
import {
  makeStyles,
  shorthands,
  Button,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuButton,
} from '@fluentui/react-components';
import {
  Overflow,
  OverflowItem,
  OverflowItemProps,
  useIsOverflowItemVisible,
  useOverflowMenu,
} from '@fluentui/react-components/unstable';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    minWidth: 0,
    ...shorthands.overflow('hidden'),
  },
});

export const Pinned = () => {
  const styles = useStyles();

  const [selected, setSelected] = React.useState<string>('6');

  const onSelect = (itemId: string) => {
    setSelected(itemId);
  };

  const itemIds = new Array(8).fill(0).map((_, i) => i.toString());

  return (
    <Overflow>
      <div className={styles.container}>
        {itemIds.map(i => (
          <OverflowSelectionItem onSelectItem={onSelect} key={i} id={i} selected={selected === i} />
        ))}
        <OverflowMenu itemIds={itemIds} onSelect={onSelect} />
      </div>
    </Overflow>
  );
};

const OverflowSelectionItem: React.FC<{
  onSelectItem?: (item: string) => void;
  selected?: boolean;
  id: string;
}> = props => {
  const onClick = () => {
    props.onSelectItem?.(props.id);
  };

  return (
    <OverflowItem id={props.id} priority={props.selected ? 1000 : undefined}>
      <Button appearance={props.selected ? 'primary' : 'secondary'} onClick={onClick}>
        Item {props.id}
      </Button>
    </OverflowItem>
  );
};

const OverflowMenuItem: React.FC<Pick<OverflowItemProps, 'id'> & { onClick: () => void }> = props => {
  const { id, onClick } = props;
  const isVisible = useIsOverflowItemVisible(id);

  if (isVisible) {
    return null;
  }

  return <MenuItem onClick={onClick}>Item {id}</MenuItem>;
};

const OverflowMenu: React.FC<{
  itemIds: string[];
  onSelect: (itemId: string) => void;
}> = ({ itemIds, onSelect }) => {
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
          {itemIds.map(i => (
            <OverflowMenuItem onClick={() => onSelect(i)} key={i} id={i} />
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

Pinned.parameters = {
  docs: {
    description: {
      story: [
        'An item can be pinned (always visible) by setting it to be a higher priority that all other overflow items.',
        'This can be useful when implementing selection scenarios where the selected item must always be visible.',
        'Try selecting different items below to observe this effect. The pinned item will be overflowed if there',
        'is no space left for any overflow item.',
      ].join('\n'),
    },
  },
};
