import * as React from 'react';
import { TagGroup, Tag, TagProps } from '@fluentui/react-tags-preview';
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
  tokens,
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
const defaultItems: TagProps[] = names.map(name => ({
  value: name.replace(' ', '_'),
  children: name,
  media: (
    <Avatar
      name={name}
      badge={{
        status: 'available',
      }}
    />
  ),
  secondaryText: 'Available',
}));

//----- OverflowMenuItem -----//

type OverflowMenuItemProps = {
  tag: TagProps;
};

const useMenuItemStyles = makeStyles({
  menuItem: shorthands.padding(tokens.spacingVerticalSNudge, tokens.spacingHorizontalXS),
  tag: {
    backgroundColor: 'transparent',
    ...shorthands.borderColor('transparent'),
  },
});

/**
 * A menu item for an overflow menu that only displays when the tab is not visible
 */
const OverflowMenuItem = (props: OverflowMenuItemProps) => {
  const { tag } = props;
  const isVisible = useIsOverflowItemVisible(tag.value!);

  const styles = useMenuItemStyles();

  if (isVisible) {
    return null;
  }

  return (
    <MenuItem key={tag.value} className={styles.menuItem}>
      <Tag {...tag} as="span" className={styles.tag} />
    </MenuItem>
  );
};

//----- OverflowMenu -----//

/**
 * A menu for viewing tags that have overflowed and are not visible.
 */
const OverflowMenu = () => {
  const { ref, isOverflowing, overflowCount } = useOverflowMenu<HTMLButtonElement>();

  if (!isOverflowing) {
    return null;
  }

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Tag ref={ref} aria-label={`${overflowCount} more tags`}>{`+${overflowCount}`}</Tag>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          {defaultItems.map(item => (
            <OverflowMenuItem key={item.value} tag={item} />
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
    zIndex: 0, // stop the browser resize handle from piercing the overflow menu
    height: 'fit-content',
    minWidth: '150px',
    resize: 'horizontal',
    width: '100%',
  },
  tagGroup: {
    display: 'flex', // TagGroup is inline-flex by default, but we want it to be same width as the container
  },
});

export const WithOverflow = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Overflow minimumVisible={2} padding={30}>
        <TagGroup className={styles.tagGroup}>
          {defaultItems.map(item => (
            <OverflowItem key={item.value} id={item.value!}>
              <Tag key={item.value} {...item} />
            </OverflowItem>
          ))}
          <OverflowMenu />
        </TagGroup>
      </Overflow>
    </div>
  );
};

WithOverflow.storyName = 'With Overflow';
WithOverflow.parameters = {
  docs: {
    description: {
      story: 'A TagGroup can support overflow by using Overflow and OverflowItem.',
    },
  },
};
