import * as React from 'react';
import { MenuButton, MenuButtonProps } from '@fluentui/react-button';
import { Callout, ContextualMenu, IContextualMenuProps, Stack, Text } from '@fluentui/react';
import { useMenuContext, MinimalMenuProps } from '@fluentui/react-shared-contexts';
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

export const DefaultMenuButtons = () => {
  return (
    <Stack gap={20}>
      <Text variant="xLarge">A button comes in default and `primary` flavors.</Text>
      <MenuButtonExamples menu={<ContextualMenu {...menuProps} />} />

      <Text variant="xLarge">A button can be focusable when disabled</Text>
      <div className={classes.hStack}>
        <MenuButton disabled icon="X">
          Disabled, non-focusable button
        </MenuButton>
        <MenuButton disabled disabledFocusable icon="X">
          Disabled, focusable button
        </MenuButton>
      </div>

      <Text variant="xLarge">A button can appear round using the `circular` prop.</Text>
      <MenuButtonExamples circular menu={<ContextualMenu {...menuProps} />} />

      <Text variant="xLarge">A button can fill the width of its container using the `block` prop.</Text>
      <div className={classes.vStack}>
        <MenuButtonExamples block menu={<ContextualMenu {...menuProps} />} />
      </div>

      <Text variant="xLarge">A button can contain only an icon using the `iconOnly` prop.</Text>
      <MenuButtonExamples iconOnly menu={<ContextualMenu {...menuProps} />} />

      <Text>A button can be both `circular` and `iconOnly`.</Text>
      <MenuButtonExamples circular iconOnly menu={<ContextualMenu {...menuProps} />} />

      <Text variant="xLarge">A button can show a loading indicator using the `loading` prop.</Text>
      <MenuButtonExamples loading menu={<ContextualMenu {...menuProps} />} />

      <Text variant="xLarge">A button can be sized.</Text>
      <div className={classes.vStack}>
        <MenuButtonExamples size="smallest" menu={<ContextualMenu {...menuProps} />} />
        <MenuButtonExamples size="smaller" menu={<ContextualMenu {...menuProps} />} />
        <MenuButtonExamples size="small" menu={<ContextualMenu {...menuProps} />} />
        <MenuButtonExamples size="large" menu={<ContextualMenu {...menuProps} />} />
        <MenuButtonExamples size="larger" menu={<ContextualMenu {...menuProps} />} />
        <MenuButtonExamples size="largest" menu={<ContextualMenu {...menuProps} />} />
      </div>
    </Stack>
  );
};

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

const shorthandChildrenRender = { children: (Component: any, props: MinimalMenuProps) => <FunctionMenu {...props} /> };

export const MenuButtonsWithMenuAsFunction = () => (
  <Stack gap={20}>
    <Text variant="xLarge">A button comes in default and `primary` flavors.</Text>
    <MenuButtonExamples menu={shorthandChildrenRender} />

    <Text variant="xLarge">A button can appear round using the `circular` prop.</Text>
    <MenuButtonExamples circular menu={shorthandChildrenRender} />

    <Text variant="xLarge">A button can fill the width of its container using the `block` prop.</Text>
    <div className={classes.vStack}>
      <MenuButtonExamples block menu={shorthandChildrenRender} />
    </div>

    <Text variant="xLarge">A button can contain only an icon using the `iconOnly` prop.</Text>
    <MenuButtonExamples iconOnly menu={shorthandChildrenRender} />

    <Text>A button can be both `circular` and `iconOnly`.</Text>
    <MenuButtonExamples circular iconOnly menu={shorthandChildrenRender} />

    <Text variant="xLarge">A button can show a loading indicator using the `loading` prop.</Text>
    <MenuButtonExamples loading menu={shorthandChildrenRender} />

    <Text variant="xLarge">A button can be sized.</Text>
    <div className={classes.vStack}>
      <MenuButtonExamples size="smallest" menu={shorthandChildrenRender} />
      <MenuButtonExamples size="smaller" menu={shorthandChildrenRender} />
      <MenuButtonExamples size="small" menu={shorthandChildrenRender} />
      <MenuButtonExamples size="large" menu={shorthandChildrenRender} />
      <MenuButtonExamples size="larger" menu={shorthandChildrenRender} />
      <MenuButtonExamples size="largest" menu={shorthandChildrenRender} />
    </div>
  </Stack>
);

const CustomMenu = (props: MinimalMenuProps) => {
  const { hidden, ...rest } = props;
  return !hidden ? <Callout {...(rest as IContextualMenuProps)}>This is a custom menu</Callout> : null;
};

const customMenuChildrenRender = { children: (Component: any, props: MinimalMenuProps) => <CustomMenu {...props} /> };

export const MenuButtonsWithcustomMenuChildrenRenders = () => (
  <Stack gap={20}>
    <Text variant="xLarge">A button comes in default and `primary` flavors.</Text>
    <MenuButtonExamples menu={customMenuChildrenRender} />

    <Text variant="xLarge">A button can appear round using the `circular` prop.</Text>
    <MenuButtonExamples circular menu={customMenuChildrenRender} />

    <Text variant="xLarge">A button can fill the width of its container using the `block` prop.</Text>
    <div className={classes.vStack}>
      <MenuButtonExamples block menu={customMenuChildrenRender} />
    </div>

    <Text variant="xLarge">A button can contain only an icon using the `iconOnly` prop.</Text>
    <MenuButtonExamples iconOnly menu={customMenuChildrenRender} />

    <Text>A button can be both `circular` and `iconOnly`.</Text>
    <MenuButtonExamples circular iconOnly menu={customMenuChildrenRender} />

    <Text variant="xLarge">A button can show a loading indicator using the `loading` prop.</Text>
    <MenuButtonExamples loading menu={customMenuChildrenRender} />

    <Text variant="xLarge">A button can be sized.</Text>
    <div className={classes.vStack}>
      <MenuButtonExamples size="smallest" menu={customMenuChildrenRender} />
      <MenuButtonExamples size="smaller" menu={customMenuChildrenRender} />
      <MenuButtonExamples size="small" menu={customMenuChildrenRender} />
      <MenuButtonExamples size="large" menu={customMenuChildrenRender} />
      <MenuButtonExamples size="larger" menu={customMenuChildrenRender} />
      <MenuButtonExamples size="largest" menu={customMenuChildrenRender} />
    </div>
  </Stack>
);
