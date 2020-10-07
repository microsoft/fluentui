import * as React from 'react';
import { MenuButton, MenuButtonProps } from '@fluentui/react-button';
import { ContextualMenu, IContextualMenuProps, Stack, Text } from 'office-ui-fabric-react';
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

const Menu = (defaultSlotType: string, props: IContextualMenuProps) => {
  return <ContextualMenu {...props} {...menuProps} />;
};

const MenuButtonExamples = (props: MenuButtonProps) => (
  <div className={classes.hStack}>
    <MenuButton {...props} icon="O" menu={Menu}>
      Hello, world
    </MenuButton>
    <MenuButton {...props} icon="O" disabled menu={Menu}>
      Hello, world
    </MenuButton>
    <MenuButton {...props} icon="O" primary menu={Menu}>
      Hello, world
    </MenuButton>
    <MenuButton {...props} icon="O" primary disabled menu={Menu}>
      Hello, world
    </MenuButton>
    <MenuButton {...props} icon="O" ghost menu={Menu}>
      Hello, world
    </MenuButton>
    <MenuButton {...props} icon="O" ghost disabled menu={Menu}>
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

    <Text variant="xLarge">A button can fill the width of its container using the `fluid` prop.</Text>
    <div className={classes.vStack}>
      <MenuButtonExamples fluid />
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
