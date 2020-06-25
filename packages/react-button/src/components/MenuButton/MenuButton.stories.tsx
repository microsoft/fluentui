import * as React from 'react';
import { Stack, Text } from 'office-ui-fabric-react';
import { MenuButton } from './MenuButton';
import { MenuButtonProps } from './MenuButton.types';
import * as classes from '../Button/Button.stories.scss';

const menuProps = {
  items: [
    {
      key: 'a',
      name: 'Item a',
    },
    {
      key: 'b',
      name: 'Item b',
    },
  ],
};

const MenuButtonVariants = (props: MenuButtonProps) => (
  <div className={classes.hStack}>
    <MenuButton {...props} menu={menuProps}>
      Hello, world
    </MenuButton>
    <MenuButton {...props} primary menu={menuProps}>
      Hello, world
    </MenuButton>
    <MenuButton {...props} disabled menu={menuProps}>
      Hello, world
    </MenuButton>
    <MenuButton {...props} primary disabled menu={menuProps}>
      Hello, world
    </MenuButton>
  </div>
);

export const MenuButtonCss = () => (
  <Stack gap={20}>
    <Text variant="xLarge">A button comes in default and `primary` flavors.</Text>
    <MenuButtonVariants />

    <Text variant="xLarge">A button can appear round using the `circular` prop.</Text>
    <MenuButtonVariants circular />

    <Text variant="xLarge">A button can fill the width of its container using the `fluid` prop.</Text>
    <div className={classes.vStack}>
      <MenuButton fluid menu={menuProps}>
        Hello, world
      </MenuButton>
      <MenuButton fluid primary menu={menuProps}>
        Hello, world
      </MenuButton>
      <MenuButton fluid disabled menu={menuProps}>
        Hello, world
      </MenuButton>
      <MenuButton fluid primary disabled menu={menuProps}>
        Hello, world
      </MenuButton>
    </div>

    <Text variant="xLarge">A button can contain only an icon using the `iconOnly` prop.</Text>
    <MenuButtonVariants iconOnly />

    <Text variant="xLarge">An icon button can format its Icon to appear before or after its content.</Text>
    <div className={classes.vStack}>
      <MenuButtonVariants iconPosition="before" />
      <MenuButtonVariants iconPosition="after" />
    </div>

    <Text variant="xLarge">
      A button can inherit its background and have a subtle appearance using the `inverted` prop.
    </Text>
    <MenuButtonVariants inverted />

    <Text variant="xLarge">A button can show a loading indicator using the `loading` prop.</Text>
    <MenuButtonVariants loading />

    <Text variant="xLarge">A button can be sized.</Text>
    <div className={classes.vStack}>
      <MenuButtonVariants size="smallest" />
      <MenuButtonVariants size="smaller" />
      <MenuButtonVariants size="small" />
      <MenuButtonVariants size="large" />
      <MenuButtonVariants size="larger" />
      <MenuButtonVariants size="largest" />
    </div>
  </Stack>
);
