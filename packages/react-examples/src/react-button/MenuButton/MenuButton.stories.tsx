import * as React from 'react';
import { MenuButton, MenuButtonProps, MinimalMenuProps } from '@fluentui/react-button';
import { Callout, ContextualMenu, IContextualMenuProps, Stack, Text } from '@fluentui/react';
import * as classes from '../Button.stories.scss';

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

const Menu = (defaultSlotType: string, props: MinimalMenuProps) => {
  return <ContextualMenu {...(props as IContextualMenuProps)} {...menuProps} />;
};

const MenuButtonExamples = (props: MenuButtonProps) => (
  <div className={classes.hStack}>
    <MenuButton icon="O" menu={Menu} {...props}>
      Hello, world
    </MenuButton>
    <MenuButton icon="O" disabled menu={Menu} {...props}>
      Hello, world
    </MenuButton>
    <MenuButton icon="O" primary menu={Menu} {...props}>
      Hello, world
    </MenuButton>
    <MenuButton icon="O" primary disabled menu={Menu} {...props}>
      Hello, world
    </MenuButton>
    <MenuButton icon="O" ghost menu={Menu} {...props}>
      Hello, world
    </MenuButton>
    <MenuButton icon="O" ghost disabled menu={Menu} {...props}>
      Hello, world
    </MenuButton>
    <MenuButton icon="O" transparent menu={Menu} {...props}>
      Hello, world
    </MenuButton>
    <MenuButton icon="O" transparent disabled menu={Menu} {...props}>
      Hello, world
    </MenuButton>
  </div>
);

export const MenuButtons = () => (
  <Stack gap={20}>
    <Text variant="xLarge">A button comes in default and `primary` flavors.</Text>
    <MenuButtonExamples />

    <Text variant="xLarge">A button can appear round using the `circular` prop.</Text>
    <MenuButtonExamples circular />

    <Text variant="xLarge">A button can fill the width of its container using the `block` prop.</Text>
    <div className={classes.vStack}>
      <MenuButtonExamples block />
    </div>

    <Text variant="xLarge">A button can contain only an icon using the `iconOnly` prop.</Text>
    <MenuButtonExamples iconOnly />

    <Text>A button can be both `circular` and `iconOnly`.</Text>
    <MenuButtonExamples circular iconOnly />

    <Text variant="xLarge">A button can show a loading indicator using the `loading` prop.</Text>
    <MenuButtonExamples loading />

    <Text variant="xLarge">A button can be sized.</Text>
    <div className={classes.vStack}>
      <MenuButtonExamples size="smallest" />
      <MenuButtonExamples size="smaller" />
      <MenuButtonExamples size="small" />
      <MenuButtonExamples size="large" />
      <MenuButtonExamples size="larger" />
      <MenuButtonExamples size="largest" />
    </div>
  </Stack>
);

const CustomMenu = (defaultSlotType: string, props: MinimalMenuProps) => {
  return <Callout {...(props as IContextualMenuProps)}>This is a custom menu</Callout>;
};

export const MenuButtonsWithCustomMenus = () => (
  <Stack gap={20}>
    <Text variant="xLarge">A button comes in default and `primary` flavors.</Text>
    <MenuButtonExamples menu={CustomMenu} />

    <Text variant="xLarge">A button can appear round using the `circular` prop.</Text>
    <MenuButtonExamples circular menu={CustomMenu} />

    <Text variant="xLarge">A button can fill the width of its container using the `block` prop.</Text>
    <div className={classes.vStack}>
      <MenuButtonExamples block menu={CustomMenu} />
    </div>

    <Text variant="xLarge">A button can contain only an icon using the `iconOnly` prop.</Text>
    <MenuButtonExamples iconOnly menu={CustomMenu} />

    <Text>A button can be both `circular` and `iconOnly`.</Text>
    <MenuButtonExamples circular iconOnly menu={CustomMenu} />

    <Text variant="xLarge">A button can show a loading indicator using the `loading` prop.</Text>
    <MenuButtonExamples loading menu={CustomMenu} />

    <Text variant="xLarge">A button can be sized.</Text>
    <div className={classes.vStack}>
      <MenuButtonExamples size="smallest" menu={CustomMenu} />
      <MenuButtonExamples size="smaller" menu={CustomMenu} />
      <MenuButtonExamples size="small" menu={CustomMenu} />
      <MenuButtonExamples size="large" menu={CustomMenu} />
      <MenuButtonExamples size="larger" menu={CustomMenu} />
      <MenuButtonExamples size="largest" menu={CustomMenu} />
    </div>
  </Stack>
);
