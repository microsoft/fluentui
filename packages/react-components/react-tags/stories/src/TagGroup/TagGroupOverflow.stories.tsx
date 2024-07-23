import * as React from 'react';
import {
  TagGroup,
  Tag,
  TagProps,
  tagClassNames,
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagPrimaryProps,
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
type DefaultItem = InteractionTagPrimaryProps & { value: string };
const defaultItems: DefaultItem[] = names.map(name => ({
  value: name.replace(' ', '_'),
  children: name,
  media: (
    <Avatar
      aria-hidden="true" // use aria-hidden because InteractionTag contains information in the avatar
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
  menuItem: {
    padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalXS}`,
    ':hover': {
      [`& .${tagClassNames.root}`]: {
        color: tokens.colorNeutralForeground2Hover,
      },
    },
  },
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
    <InteractionTag>
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <InteractionTagPrimary ref={ref} aria-label={`${overflowCount} more tags`}>
            {`+${overflowCount}`}
          </InteractionTagPrimary>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            {defaultItems.map(item => (
              <OverflowMenuItem key={item.value} tag={item} />
            ))}
          </MenuList>
        </MenuPopover>
      </Menu>
    </InteractionTag>
  );
};

//----- Stories -----//

const useStyles = makeStyles({
  container: {
    overflow: 'hidden',
    padding: '5px',
    zIndex: 0, // stop the browser resize handle from piercing the overflow menu
    height: 'fit-content',
    minWidth: '150px',
    resize: 'horizontal',
    width: '100%',
    boxSizing: 'border-box',
  },
  tagGroup: {
    display: 'flex', // TagGroup is inline-flex by default, but we want it to be same width as the container
  },
});

export const WithOverflow = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Overflow minimumVisible={2} padding={60}>
        <TagGroup className={styles.tagGroup} aria-label="Overflow example">
          {defaultItems.map(({ value, ...rest }) => (
            <OverflowItem key={value} id={value!}>
              <InteractionTag key={value}>
                <InteractionTagPrimary {...rest} />
              </InteractionTag>
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
