import * as React from 'react';
import {
  makeStyles,
  Button,
  Divider,
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
});

const GROUPS = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

export const PriorityWithDividers = () => {
  const styles = useStyles();

  return (
    <Overflow overflowDirection="start" padding={40}>
      <div className={mergeClasses(styles.container, styles.resizableArea)}>
        <OverflowItem id={'6'} priority={6} groupId={GROUPS.ONE.toString()}>
          <Button>Priority 6</Button>
        </OverflowItem>
        <OverflowGroupDivider groupId={GROUPS.ONE} />
        <OverflowItem id={'7'} priority={7} groupId={GROUPS.TWO.toString()}>
          <Button>Priority 7</Button>
        </OverflowItem>
        <OverflowGroupDivider groupId={GROUPS.TWO} />
        <OverflowItem id={'4'} priority={4} groupId={GROUPS.THREE.toString()}>
          <Button>Priority 4</Button>
        </OverflowItem>
        <OverflowItem id={'5'} priority={5} groupId={GROUPS.THREE.toString()}>
          <Button>Priority 5</Button>
        </OverflowItem>
        <OverflowGroupDivider groupId={GROUPS.THREE} />
        <OverflowItem id={'1'} priority={1} groupId={GROUPS.FOUR.toString()}>
          <Button>Priority 1</Button>
        </OverflowItem>
        <OverflowItem id={'2'} priority={2} groupId={GROUPS.FOUR.toString()}>
          <Button>Priority 2</Button>
        </OverflowItem>
        <OverflowItem id={'3'} priority={3} groupId={GROUPS.FOUR.toString()}>
          <Button>Priority 3</Button>
        </OverflowItem>
        <OverflowGroupDivider groupId={GROUPS.FOUR} />
        <OverflowItem id={'8'} priority={8} groupId={GROUPS.FIVE.toString()}>
          <Button>Priority 8</Button>
        </OverflowItem>
        <OverflowMenu
          itemIds={['6', 'divider-1', '7', 'divider-2', '4', '5', 'divider-3', '1', '2', '3', 'divider-4', '8']}
        />
      </div>
    </Overflow>
  );
};

const OverflowGroupDivider: React.FC<{
  groupId: number;
}> = props => {
  const groupVisibility = useIsOverflowGroupVisible(props.groupId.toString());
  if (groupVisibility === 'hidden') {
    return null;
  }

  return (
    <Divider
      data-group={props.groupId}
      vertical
      appearance="brand"
      style={{ flexGrow: 0, paddingRight: '4px', paddingLeft: '4px' }}
    />
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
          {itemIds.map(itemId => {
            // This is purely a simplified convention for documentation examples
            // Could be done in other ways too
            if (itemId.startsWith('divider')) {
              const groupId = itemId.split('-')[1];
              return <OverflowMenuDivider key={itemId} groupId={Number(groupId)} />;
            }
            return <OverflowMenuItem key={itemId} id={itemId} />;
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
  groupId: number;
}> = props => {
  const { groupId } = props;

  // ⚠️⚠️ This is important
  // When collapsing based on custom priority, it's necessary to know
  // about other overflow groups because dividers can be rendered both
  // in the overflow container and the overflow menu.
  // The below code sorts the overflow groups and determines
  // if a divider should be rendered.
  const groupVisibilities = Object.values(GROUPS).map(group => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return { group, visibility: useIsOverflowGroupVisible(group.toString()) };
  });

  const currentGroupPosition = groupVisibilities.findIndex(x => x.group === groupId);
  const precedesOverflowingGroup = groupVisibilities
    .slice(currentGroupPosition + 1)
    // If there is a overflowing/hidden group after the current group
    // render the menu divider.
    .some(groupVisibility => groupVisibility.visibility !== 'visible');

  if (groupVisibilities[currentGroupPosition].visibility === 'visible' || !precedesOverflowingGroup) {
    return null;
  }

  return <MenuDivider />;
};

PriorityWithDividers.parameters = {
  docs: {
    description: {
      story: [
        'Overflow groups will respect the priority of overflow items.',
        '',
        '> ⚠️ Consider carefully if you need this behaviour, the code required to manage divider visibility here is',
        'non-trivial. This complexity comes from the fact that dividers can be visible both in the overflow container',
        'and the overflow menu. Please read the code for the reference implementation carefully.',
      ].join('\n'),
    },
  },
};
