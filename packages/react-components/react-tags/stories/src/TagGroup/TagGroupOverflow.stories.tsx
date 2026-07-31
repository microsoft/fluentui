import * as React from 'react';
import type { JSXElement, TagProps, InteractionTagPrimaryProps } from '@fluentui/react-components';
import {
  TagGroup,
  Tag,
  InteractionTag,
  InteractionTagPrimary,
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

import styles from './TagGroupOverflow.module.css';

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

/**
 * A menu item for an overflow menu that only displays when the tab is not visible
 */
const OverflowMenuItem = (props: OverflowMenuItemProps) => {
  const { tag } = props;
  const isVisible = useIsOverflowItemVisible(tag.value!);

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

export const WithOverflow = (): JSXElement => {
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
