import * as React from 'react';
import { Stack, Text } from 'office-ui-fabric-react';
import { SplitButton } from './SplitButton';
import { SplitButtonProps } from './SplitButton.types';
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

const SplitButtonVariants = (props: SplitButtonProps) => (
  <div className={classes.hStack}>
    <SplitButton {...props} menu={menuProps}>
      Hello, world
    </SplitButton>
    <SplitButton {...props} primary menu={menuProps}>
      Hello, world
    </SplitButton>
    <SplitButton {...props} disabled menu={menuProps}>
      Hello, world
    </SplitButton>
    <SplitButton {...props} primary disabled menu={menuProps}>
      Hello, world
    </SplitButton>
  </div>
);

export const SplitButtonCss = () => (
  <Stack gap={20}>
    <Text variant="xLarge">A button comes in default and `primary` flavors.</Text>
    <SplitButtonVariants />

    <Text variant="xLarge">A button can appear round using the `circular` prop.</Text>
    <SplitButtonVariants circular />

    <Text variant="xLarge">A button can fill the width of its container using the `fluid` prop.</Text>
    <div className={classes.vStack}>
      <SplitButton fluid menu={menuProps}>
        Hello, world
      </SplitButton>
      <SplitButton fluid primary menu={menuProps}>
        Hello, world
      </SplitButton>
      <SplitButton fluid disabled menu={menuProps}>
        Hello, world
      </SplitButton>
      <SplitButton fluid primary disabled menu={menuProps}>
        Hello, world
      </SplitButton>
    </div>

    <Text variant="xLarge">A button can contain only an icon using the `iconOnly` prop.</Text>
    <SplitButtonVariants iconOnly icon="X" />

    <Text>A button can blend into its background using the `ghost` prop</Text>
    <Stack horizontal>
      <SplitButton ghost icon="X" menu={menuProps}>
        Hello, world
      </SplitButton>
      <SplitButton ghost disabled icon="X" menu={menuProps}>
        Hello, world
      </SplitButton>
    </Stack>

    <Text variant="xLarge">A button can show a loading indicator using the `loading` prop.</Text>
    <SplitButtonVariants loading />

    <Text variant="xLarge">A button can be sized.</Text>
    <div className={classes.vStack}>
      <SplitButtonVariants size="smallest" />
      <SplitButtonVariants size="smaller" />
      <SplitButtonVariants size="small" />
      <SplitButtonVariants size="large" />
      <SplitButtonVariants size="larger" />
      <SplitButtonVariants size="largest" />
    </div>
  </Stack>
);
