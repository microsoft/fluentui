import * as React from 'react';
import { Stack, Text } from 'office-ui-fabric-react';
import { Button } from './Button';
import { ButtonProps } from './Button.types';
import * as classes from './Button.stories.scss';

const ButtonVariants = (props: ButtonProps) => (
  <div className={classes.hStack}>
    <Button {...props} content="Hello, world" icon="X" />
    <Button {...props} primary content="Hello, world" icon="X" />
    <Button {...props} disabled content="Hello, world" icon="X" />
    <Button {...props} primary disabled content="Hello, world" icon="X" />
  </div>
);

export const FluentButton = () => {
  return (
    <Stack gap={20}>
      <Text variant="xLarge">A button comes in default and `primary` flavors.</Text>
      <ButtonVariants />

      <Text variant="xLarge">A button can appear round using the `circular` prop.</Text>
      <ButtonVariants circular />

      <Text variant="xLarge">A button can fill the width of its container using the `fluid` prop.</Text>
      <div className={classes.vStack}>
        <Button fluid content="Hello, world" icon="X" />
        <Button fluid primary content="Hello, world" icon="X" />
        <Button fluid disabled content="Hello, world" icon="X" />
        <Button fluid primary disabled content="Hello, world" icon="X" />
      </div>

      <Text variant="xLarge">A button can contain only an icon using the `iconOnly` prop.</Text>
      <ButtonVariants iconOnly />

      <Text variant="xLarge">A button can be both `circular` and `iconOnly`.</Text>
      <ButtonVariants circular iconOnly />

      <Text variant="xLarge">An icon button can format its Icon to appear before or after its content.</Text>
      <div className={classes.vStack}>
        <ButtonVariants iconPosition="before" />
        <ButtonVariants iconPosition="after" />
      </div>

      <Text variant="xLarge">A button can show a loading indicator using the `loading` prop.</Text>
      <ButtonVariants loading />

      <Text variant="xLarge">A button can be sized.</Text>
      <div className={classes.vStack}>
        <ButtonVariants size="smallest" />
        <ButtonVariants size="smaller" />
        <ButtonVariants size="small" />
        <ButtonVariants size="large" />
        <ButtonVariants size="larger" />
        <ButtonVariants size="largest" />
      </div>
    </Stack>
  );
};
