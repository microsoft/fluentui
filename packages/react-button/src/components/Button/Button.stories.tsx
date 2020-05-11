import * as React from 'react';
import { Button } from './Button';
import { ButtonProps } from './Button.types';

const ButtonVariants = (props: ButtonProps) => (
  <div>
    <Button {...props} content="Hello, world" icon="X" />
    <Button {...props} primary content="Hello, world" icon="X" />
    <Button {...props} disabled content="Hello, world" icon="X" />
    <Button {...props} primary disabled content="Hello, world" icon="X" />
  </div>
);

export const ButtonCss = () => (
  <>
    <h3>A button can appear round using the `circular` prop.</h3>
    <div>
      <ButtonVariants circular />
    </div>

    <h3>A button can fill the width of its container using the `fluid` prop.</h3>
    <div>
      <ButtonVariants fluid />
    </div>

    <h3>A button can contain only an icon using the `iconOnly` prop.</h3>
    <div>
      <ButtonVariants iconOnly />
    </div>

    <h3>An icon button can format its Icon to appear before or after its content.</h3>
    <div>
      <ButtonVariants iconPosition="before" />
      <ButtonVariants iconPosition="after" />
    </div>

    <h3>A button can inherit its background and have a subtle appearance using the `inverted` prop.</h3>
    <div>
      <ButtonVariants inverted />
    </div>

    <h3>A button can show a loading indicator using the `loading` prop.</h3>
    <div>
      <ButtonVariants loading />
    </div>

    <h3>A button can be sized.</h3>
    <div>
      <ButtonVariants size="smallest" />
      <ButtonVariants size="smaller" />
      <ButtonVariants size="small" />
      <ButtonVariants size="large" />
      <ButtonVariants size="larger" />
      <ButtonVariants size="largest" />
    </div>
    {/*
    <h3>A button can be formatted to show only text in order to indicate a less-pronounced action.</h3>
    <div>
      <ButtonVariants text />
    </div>
    */}
  </>
);

export const ButtonCss2 = () => (
  <>
    <Button icon="X" content="Hello, world" />
    <Button primary content="Hello, world" />
    <Button circular icon="X" />
    <Button disabled content="Hello, world" />
    <Button disabled primary content="Hello, world" />
    <Button disabled circular icon="X" />
  </>
);
