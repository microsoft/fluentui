import * as React from 'react';
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

export const ButtonCss = () => (
  <>
    <h3>A button can appear round using the `circular` prop.</h3>
    <ButtonVariants circular />

    <h3>A button can fill the width of its container using the `fluid` prop.</h3>
    <div className={classes.vStack}>
      <Button fluid content="Hello, world" icon="X" />
      <Button fluid primary content="Hello, world" icon="X" />
      <Button fluid disabled content="Hello, world" icon="X" />
      <Button fluid primary disabled content="Hello, world" icon="X" />
    </div>

    <h3>A button can contain only an icon using the `iconOnly` prop.</h3>
    <ButtonVariants iconOnly />

    <h3>An icon button can format its Icon to appear before or after its content.</h3>
    <div className={classes.vStack}>
      <ButtonVariants iconPosition="before" />
      <ButtonVariants iconPosition="after" />
    </div>

    <h3>A button can inherit its background and have a subtle appearance using the `inverted` prop.</h3>
    <ButtonVariants inverted />

    <h3>A button can show a loading indicator using the `loading` prop.</h3>
    <ButtonVariants loading />

    <h3>A button can be sized.</h3>
    <div className={classes.vStack}>
      <ButtonVariants size="smallest" />
      <ButtonVariants size="smaller" />
      <ButtonVariants size="small" />
      <ButtonVariants size="large" />
      <ButtonVariants size="larger" />
      <ButtonVariants size="largest" />
    </div>
  </>
);
