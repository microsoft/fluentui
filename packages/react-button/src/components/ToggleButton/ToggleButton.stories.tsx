import * as React from 'react';
import { ToggleButton } from './ToggleButton';
import { ToggleButtonProps } from './ToggleButton.types';
import * as classes from '../Button/Button.stories.scss';

const ToggleButtonVariants = (props: ToggleButtonProps) => (
  <div className={classes.hStack}>
    <ToggleButton {...props} content="Hello, world" icon="X" />
    <ToggleButton {...props} primary content="Hello, world" icon="X" />
    <ToggleButton {...props} disabled content="Hello, world" icon="X" />
    <ToggleButton {...props} primary disabled content="Hello, world" icon="X" />
  </div>
);

export const ToggleButtonCss = () => (
  <>
    <h3>A button can appear round using the `circular` prop.</h3>
    <ToggleButtonVariants circular />

    <h3>A button can fill the width of its container using the `fluid` prop.</h3>
    <div className={classes.vStack}>
      <ToggleButton fluid content="Hello, world" icon="X" />
      <ToggleButton fluid primary content="Hello, world" icon="X" />
      <ToggleButton fluid disabled content="Hello, world" icon="X" />
      <ToggleButton fluid primary disabled content="Hello, world" icon="X" />
    </div>

    <h3>A button can contain only an icon using the `iconOnly` prop.</h3>
    <ToggleButtonVariants iconOnly />

    <h3>An icon button can format its Icon to appear before or after its content.</h3>
    <div className={classes.vStack}>
      <ToggleButtonVariants iconPosition="before" />
      <ToggleButtonVariants iconPosition="after" />
    </div>

    <h3>A button can inherit its background and have a subtle appearance using the `inverted` prop.</h3>
    <ToggleButtonVariants inverted />

    <h3>A button can show a loading indicator using the `loading` prop.</h3>
    <ToggleButtonVariants loading />

    <h3>A button can be sized.</h3>
    <div className={classes.vStack}>
      <ToggleButtonVariants size="smallest" />
      <ToggleButtonVariants size="smaller" />
      <ToggleButtonVariants size="small" />
      <ToggleButtonVariants size="large" />
      <ToggleButtonVariants size="larger" />
      <ToggleButtonVariants size="largest" />
    </div>
  </>
);
