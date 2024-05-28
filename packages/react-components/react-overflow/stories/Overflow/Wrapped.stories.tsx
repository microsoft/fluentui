import * as React from 'react';
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
  Overflow,
  OverflowItem,
  OverflowItemProps,
  useIsOverflowItemVisible,
  useOverflowMenu,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'nowrap',
    minWidth: 0,
    overflow: 'hidden',
  },

  farItems: {
    display: 'flex',
    gap: '4px',
    flexWrap: 'nowrap',
    marginRight: '10px', //to allow the resize handle to be grabbed
  },

  resizableArea: {
    display: 'flex',
    flexWrap: 'nowrap',
    minWidth: '200px',
    maxWidth: '1000px',
    border: `2px solid ${tokens.colorBrandBackground}`,
    padding: '20px 10px 10px 10px',
    overflow: 'hidden',
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

export const Wrapped = () => {
  const itemIds = new Array(8).fill(0).map((_, i) => i.toString());
  const styles = useStyles();

  return (
    <div className={styles.resizableArea}>
      <Overflow>
        <div className={styles.container}>
          {itemIds.map(i => (
            <OverflowItem key={i} id={i.toString()}>
              <Button>Item{i}</Button>
            </OverflowItem>
          ))}
          <OverflowMenu itemIds={itemIds} />
        </div>
      </Overflow>

      <div className={styles.farItems}>
        <Button>Foo</Button>
        <Button>Bar</Button>
      </div>
    </div>
  );
};

const OverflowMenuItem: React.FC<Pick<OverflowItemProps, 'id'>> = props => {
  const { id } = props;
  const isVisible = useIsOverflowItemVisible(id);

  if (isVisible) {
    return null;
  }

  // As an union between button props and div props may be conflicting, casting is required
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
          {itemIds.map(i => {
            return <OverflowMenuItem key={i} id={i} />;
          })}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

Wrapped.parameters = {
  docs: {
    description: {
      story: ['Overflow containers can be wrapped by other DOM elements.'].join('\n'),
    },
  },
};
