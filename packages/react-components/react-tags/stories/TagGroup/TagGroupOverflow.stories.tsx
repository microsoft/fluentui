import * as React from 'react';
import { TagGroup, TagButton, TagButtonProps, TagGroupProps } from '@fluentui/react-tags';
import {
  makeStyles,
  shorthands,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useIsOverflowItemVisible,
  useOverflowMenu,
  Overflow,
  OverflowItem,
  Avatar,
} from '@fluentui/react-components';

const names = [
  'Johnie McConnell',
  'Allan Munger',
  'Erik Nason',
  'Kristin Patterson',
  'Daisy Phillips',
  'Carole Poland',
  'Carlos Slattery',
  'Robert Tolbert',
  'Kevin Sturgis',
  'Charlotte Waltson',
  'Elliot Woodward',
];
const defaultItems: TagButtonProps[] = names.map(name => ({
  value: name.replace(' ', '_'),
  children: name,
  media: <Avatar name={name} />,
}));

//----- OverflowMenuItem -----//

type OverflowMenuItemProps = {
  tag: TagButtonProps;
  onClick: React.MouseEventHandler;
};

/**
 * A menu item for an overflow menu that only displays when the tab is not visible
 */
const OverflowMenuItem = (props: OverflowMenuItemProps) => {
  const { tag, onClick } = props;
  const isVisible = useIsOverflowItemVisible(tag.value!);

  if (isVisible) {
    return null;
  }

  return (
    <MenuItem key={tag.value} icon={tag.media} onClick={onClick}>
      <div>{tag.children}</div>
    </MenuItem>
  );
};

//----- OverflowMenu -----//

type OverflowMenuProps = {
  onDismissItem: TagGroupProps['onDismiss'];
};

/**
 * A menu for selecting tabs that have overflowed and are not visible.
 */
const OverflowMenu = (props: OverflowMenuProps) => {
  const { ref, isOverflowing, overflowCount } = useOverflowMenu<HTMLButtonElement>();

  // const onItemClick = (tabId: string) => {
  //   onTabSelect?.(tabId);
  // };

  if (!isOverflowing) {
    return null;
  }

  return (
    <Menu hasIcons>
      <MenuTrigger disableButtonEnhancement>
        <TagButton
          dismissible={false}
          ref={ref}
          aria-label={`${overflowCount} more tags`}
          // TODO should have role same as tag
        >{`+${overflowCount}`}</TagButton>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          {defaultItems.map(item => (
            <OverflowMenuItem
              key={item.value}
              tag={item}
              onClick={() => console.log('OverflowMenuItem', 'value', 'click')}
            />
          ))}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

//----- Stories -----//

const useStyles = makeStyles({
  container: {
    ...shorthands.overflow('hidden'),
    ...shorthands.padding('5px'),
    zIndex: 0, //stop the browser resize handle from piercing the overflow menu
    height: 'fit-content',
    minWidth: '150px',
    resize: 'horizontal',
    width: '600px',
  },
  tagGroup: {
    display: 'flex', // TagGroup is inline-flex by default, but we want it to be same width as the container
  },
});

export const HorizontalOverflow = () => {
  const [items, setItems] = React.useState<TagButtonProps[]>(defaultItems);
  const removeItem: TagGroupProps['onDismiss'] = (_e, { dismissedTagValue }) => {
    setItems([...items].filter(item => item.value !== dismissedTagValue));
  };

  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Overflow minimumVisible={2}>
        <TagGroup onDismiss={removeItem} className={styles.tagGroup}>
          {items.map(item => (
            <OverflowItem key={item.value} id={item.value!}>
              <TagButton key={item.value} {...item} />
            </OverflowItem>
          ))}
          <OverflowMenu onDismissItem={removeItem} />
        </TagGroup>
      </Overflow>
    </div>
  );
};

HorizontalOverflow.storyName = 'Overflow';
HorizontalOverflow.parameters = {
  docs: {
    description: {
      story: 'A TagGroup can support overflow by using Overflow and OverflowItem.',
    },
  },
};
