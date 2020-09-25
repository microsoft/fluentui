import * as React from 'react';
import { MenuButton, MenuButtonProps } from '@fluentui/react-button';
import { Stack, Text } from 'office-ui-fabric-react';
import * as classes from '../utils/Button.stories.scss';

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
    <MenuButton {...props} icon="O" menu={menuProps}>
      Hello, world
    </MenuButton>
    <MenuButton {...props} icon="O" primary menu={menuProps}>
      Hello, world
    </MenuButton>
    <MenuButton {...props} icon="O" disabled menu={menuProps}>
      Hello, world
    </MenuButton>
    <MenuButton {...props} icon="O" primary disabled menu={menuProps}>
      Hello, world
    </MenuButton>
    <MenuButton {...props} icon="O" ghost menu={menuProps}>
      Hello, world
    </MenuButton>
    <MenuButton {...props} icon="O" ghost disabled menu={menuProps}>
      Hello, world
    </MenuButton>
  </div>
);

export const MenuButtons = () => (
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
      <MenuButton fluid ghost menu={menuProps}>
        Hello, world
      </MenuButton>
      <MenuButton fluid ghost disabled menu={menuProps}>
        Hello, world
      </MenuButton>
    </div>

    <Text variant="xLarge">A button can contain only an icon using the `iconOnly` prop.</Text>
    <MenuButtonVariants iconOnly />

    <Text>A button can be both `circular` and `iconOnly`.</Text>
    <MenuButtonVariants circular iconOnly />

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
