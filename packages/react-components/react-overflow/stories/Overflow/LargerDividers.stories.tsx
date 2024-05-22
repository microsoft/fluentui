import * as React from 'react';
import {
  makeStyles,
  Button,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuButton,
  tokens,
  mergeClasses,
  Overflow,
  OverflowItem,
  useIsOverflowGroupVisible,
  useIsOverflowItemVisible,
  useOverflowMenu,
  OverflowDivider,
} from '@fluentui/react-components';
import { ChevronRight20Regular } from '@fluentui/react-icons';

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
});

export const LargerDividers = () => {
  const styles = useStyles();

  return (
    <Overflow>
      <div className={mergeClasses(styles.container, styles.resizableArea)}>
        <OverflowItem id={'1'} groupId={'1'}>
          <Button>Item 1</Button>
        </OverflowItem>
        <OverflowGroupDivider groupId={'1'} />
        <OverflowItem id={'2'} groupId={'2'}>
          <Button>Item 2</Button>
        </OverflowItem>
        <OverflowGroupDivider groupId={'2'} />
        <OverflowItem id={'3'} groupId={'3'}>
          <Button>Item 3</Button>
        </OverflowItem>
        <OverflowItem id={'4'} groupId={'3'}>
          <Button>Item 4</Button>
        </OverflowItem>
        <OverflowGroupDivider groupId={'3'} />
        <OverflowItem id={'5'} groupId={'4'}>
          <Button>Item 5</Button>
        </OverflowItem>
        <OverflowItem id={'6'} groupId={'4'}>
          <Button>Item 6</Button>
        </OverflowItem>
        <OverflowItem id={'7'} groupId={'4'}>
          <Button>Item 7</Button>
        </OverflowItem>
        <OverflowGroupDivider groupId={'4'} />
        <OverflowItem id={'8'} groupId={'5'}>
          <Button>Item 8</Button>
        </OverflowItem>
        <OverflowMenu
          itemIds={['1', 'divider-1', '2', 'divider-2', '3', '4', 'divider-3', '5', '6', '7', 'divider-4', '8']}
        />
      </div>
    </Overflow>
  );
};

const OverflowGroupDivider: React.FC<{
  groupId: string;
}> = props => {
  return (
    <OverflowDivider groupId={props.groupId}>
      <div>
        <ChevronRight20Regular />
      </div>
    </OverflowDivider>
  );
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
            // This is purely a simplified convention for documentation examples
            // Could be done in other ways too
            if (typeof i === 'string' && i.startsWith('divider')) {
              const groupId = i.split('-')[1];
              return <OverflowMenuDivider key={i} id={groupId} />;
            }
            return <OverflowMenuItem key={i} id={i} />;
          })}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

const OverflowMenuItem: React.FC<{ id: string }> = props => {
  const { id } = props;
  const isVisible = useIsOverflowItemVisible(id);

  if (isVisible) {
    return null;
  }

  return <MenuItem>Item {id}</MenuItem>;
};

const OverflowMenuDivider: React.FC<{
  id: string;
}> = props => {
  const isGroupVisible = useIsOverflowGroupVisible(props.id);

  if (isGroupVisible === 'visible') {
    return null;
  }

  return <MenuDivider />;
};

LargerDividers.parameters = {
  docs: {
    description: {
      story: [
        'For smaller dividers the `padding` prop can be set to take into account the unmeasured space that the divider takes up.',
        'When a larger divider is used its width is not calculated. This causes items to overflow later than needed.',
        'The `OverflowDivider` divider component can be used for larger dividers to include its width to the calculation.',
      ].join('\n'),
    },
  },
};
