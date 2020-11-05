import * as React from 'react';
import { useMenuContext, MenuButton, MenuButtonProps, MinimalMenuProps } from '@fluentui/react-button';
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

const MenuButtonExamples = (props: MenuButtonProps) => (
  <div className={classes.hStack}>
    <MenuButton icon="O" {...props}>
      Hello, world
    </MenuButton>
    <MenuButton icon="O" disabled {...props}>
      Hello, world
    </MenuButton>
    <MenuButton icon="O" primary {...props}>
      Hello, world
    </MenuButton>
    <MenuButton icon="O" primary disabled {...props}>
      Hello, world
    </MenuButton>
    <MenuButton icon="O" ghost {...props}>
      Hello, world
    </MenuButton>
    <MenuButton icon="O" ghost disabled {...props}>
      Hello, world
    </MenuButton>
    <MenuButton icon="O" transparent {...props}>
      Hello, world
    </MenuButton>
    <MenuButton icon="O" transparent disabled {...props}>
      Hello, world
    </MenuButton>
  </div>
);

const JSXMenu = () => <ContextualMenu {...(useMenuContext() as IContextualMenuProps)} {...menuProps} />;

export const MenuButtonsWithMenuAsJsx = () => {
  return (
    <Stack gap={20}>
      <Text variant="xLarge">A button comes in default and `primary` flavors.</Text>
      <MenuButtonExamples menu={<JSXMenu />} />

      <Text variant="xLarge">A button can appear round using the `circular` prop.</Text>
      <MenuButtonExamples circular menu={<JSXMenu />} />

      <Text variant="xLarge">A button can fill the width of its container using the `block` prop.</Text>
      <div className={classes.vStack}>
        <MenuButtonExamples block menu={<JSXMenu />} />
      </div>

      <Text variant="xLarge">A button can contain only an icon using the `iconOnly` prop.</Text>
      <MenuButtonExamples iconOnly menu={<JSXMenu />} />

      <Text>A button can be both `circular` and `iconOnly`.</Text>
      <MenuButtonExamples circular iconOnly menu={<JSXMenu />} />

      <Text variant="xLarge">A button can show a loading indicator using the `loading` prop.</Text>
      <MenuButtonExamples loading menu={<JSXMenu />} />

      <Text variant="xLarge">A button can be sized.</Text>
      <div className={classes.vStack}>
        <MenuButtonExamples size="smallest" menu={<JSXMenu />} />
        <MenuButtonExamples size="smaller" menu={<JSXMenu />} />
        <MenuButtonExamples size="small" menu={<JSXMenu />} />
        <MenuButtonExamples size="large" menu={<JSXMenu />} />
        <MenuButtonExamples size="larger" menu={<JSXMenu />} />
        <MenuButtonExamples size="largest" menu={<JSXMenu />} />
      </div>
    </Stack>
  );
};

const FunctionMenu = (props: MinimalMenuProps) => {
  const { hidden, ...rest } = props;
  return !hidden ? <ContextualMenu {...(rest as IContextualMenuProps)} {...menuProps} /> : null;
};

export const MenuButtonsWithMenuAsFunction = () => (
  <Stack gap={20}>
    <Text variant="xLarge">A button comes in default and `primary` flavors.</Text>
    <MenuButtonExamples menu={FunctionMenu} />

    <Text variant="xLarge">A button can appear round using the `circular` prop.</Text>
    <MenuButtonExamples circular menu={FunctionMenu} />

    <Text variant="xLarge">A button can fill the width of its container using the `block` prop.</Text>
    <div className={classes.vStack}>
      <MenuButtonExamples block menu={FunctionMenu} />
    </div>

    <Text variant="xLarge">A button can contain only an icon using the `iconOnly` prop.</Text>
    <MenuButtonExamples iconOnly menu={FunctionMenu} />

    <Text>A button can be both `circular` and `iconOnly`.</Text>
    <MenuButtonExamples circular iconOnly menu={FunctionMenu} />

    <Text variant="xLarge">A button can show a loading indicator using the `loading` prop.</Text>
    <MenuButtonExamples loading menu={FunctionMenu} />

    <Text variant="xLarge">A button can be sized.</Text>
    <div className={classes.vStack}>
      <MenuButtonExamples size="smallest" menu={FunctionMenu} />
      <MenuButtonExamples size="smaller" menu={FunctionMenu} />
      <MenuButtonExamples size="small" menu={FunctionMenu} />
      <MenuButtonExamples size="large" menu={FunctionMenu} />
      <MenuButtonExamples size="larger" menu={FunctionMenu} />
      <MenuButtonExamples size="largest" menu={FunctionMenu} />
    </div>
  </Stack>
);

const CustomMenu = (props: MinimalMenuProps) => {
  const { hidden, ...rest } = props;
  return !hidden ? <Callout {...(rest as IContextualMenuProps)}>This is a custom menu</Callout> : null;
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
