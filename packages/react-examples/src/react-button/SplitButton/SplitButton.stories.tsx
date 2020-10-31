import * as React from 'react';
import { MinimalMenuProps, SplitButton, SplitButtonProps } from '@fluentui/react-button';
import { ContextualMenu, DirectionalHint, IContextualMenuProps, Stack, Text } from '@fluentui/react';
import * as classes from '../Button.stories.scss';

const menuProps: IContextualMenuProps = {
  directionalHint: DirectionalHint.bottomRightEdge,
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

const Menu = (props: MinimalMenuProps) => {
  const { hidden, ...rest } = props;
  return !hidden ? <ContextualMenu {...(rest as IContextualMenuProps)} {...menuProps} /> : null;
};

const SplitButtonExamples = (props: SplitButtonProps) => (
  <div className={classes.hStack}>
    <SplitButton {...props} menu={Menu}>
      Hello, world
    </SplitButton>
    <SplitButton {...props} disabled menu={Menu}>
      Hello, world
    </SplitButton>
    <SplitButton {...props} primary menu={Menu}>
      Hello, world
    </SplitButton>
    <SplitButton {...props} primary disabled menu={Menu}>
      Hello, world
    </SplitButton>
    <SplitButton {...props} ghost menu={Menu}>
      Hello, world
    </SplitButton>
    <SplitButton {...props} ghost disabled menu={Menu}>
      Hello, world
    </SplitButton>
    <SplitButton {...props} transparent menu={Menu}>
      Hello, world
    </SplitButton>
    <SplitButton {...props} transparent disabled menu={Menu}>
      Hello, world
    </SplitButton>
  </div>
);

export const SplitButtons = () => (
  <Stack gap={20}>
    <Text variant="xLarge">A split button comes in default and `primary` variant.</Text>
    <SplitButtonExamples />

    <Text variant="xLarge">A split button can appear round using the `circular` prop.</Text>
    <SplitButtonExamples circular />

    <Text variant="xLarge">A split button can fill the width of its container using the `block` prop.</Text>
    <SplitButtonExamples block />

    <Text variant="xLarge">A split button can contain only an icon using the `iconOnly` prop.</Text>
    <SplitButtonExamples iconOnly icon="X" />

    <Text variant="xLarge">A split button can be both `circular` and `iconOnly`.</Text>
    <SplitButtonExamples circular iconOnly icon="X" />

    <Text variant="xLarge">A split button can show a loading indicator using the `loading` prop.</Text>
    <SplitButtonExamples loading />

    <Text variant="xLarge">A split button can be sized.</Text>
    <div className={classes.vStack}>
      <SplitButtonExamples size="smallest" />
      <SplitButtonExamples size="smaller" />
      <SplitButtonExamples size="small" />
      <SplitButtonExamples size="large" />
      <SplitButtonExamples size="larger" />
      <SplitButtonExamples size="largest" />
    </div>
  </Stack>
);
