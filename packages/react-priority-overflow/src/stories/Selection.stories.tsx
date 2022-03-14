import * as React from 'react';
import { makeStyles, mergeClasses, Button, Menu, MenuTrigger, MenuPopover, MenuList } from '@fluentui/react-components';
import { Overflow } from '../components/Overflow';
import { useOverflowMenu } from '../useOverflowMenu';
import { TestOverflowItem, TestOverflowItemProps, TestOverflowMenuItem } from './utils.stories';

export const Selection = () => {
  const [selected, setSelected] = React.useState<string>('0');

  const onSelect = (itemId: string) => {
    setSelected(itemId);
  };

  const itemIds = new Array(8).fill(0).map((_, i) => i.toString());

  return (
    <Overflow>
      {itemIds.map(i => (
        <OverflowSelectionItem onSelectItem={onSelect} key={i} id={i} selected={selected === i} />
      ))}
      <OverflowMenu itemIds={itemIds} onSelect={onSelect} />
    </Overflow>
  );
};

const useItemStyles = makeStyles({
  container: {
    display: 'flex',
    paddingLeft: '2px',
    paddingRight: '2px',
  },

  selected: {
    backgroundColor: '#ffd1a3',
  },
});

const OverflowSelectionItem: React.FC<OverflowSelectionItemProps> = props => {
  const styles = useItemStyles();

  const onClick = () => {
    props.onSelectItem?.(props.id);
  };

  return (
    <TestOverflowItem
      priority={props.selected ? 1000 : undefined}
      id={props.id}
      className={mergeClasses(props.selected && styles.selected)}
      onClick={onClick}
    />
  );
};

export interface OverflowSelectionItemProps extends TestOverflowItemProps {
  onSelectItem?: (itemId: string) => void;
  selected?: boolean;
}

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
      <MenuTrigger>
        <Button ref={ref}>+{overflowCount} items</Button>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          {itemIds.map(i => (
            <TestOverflowMenuItem onClick={() => onSelect(i)} key={i} id={i} />
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
