import * as React from 'react';
// TODO: get @fluentui/react-button to work here
import { Button } from './Button';
import { makeStyles } from '@fluentui/react-theme-provider';

export default {
  title: 'Fluent UI Core/Button',
  component: Button,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.themePrimary,
  },
}));

export const StyleOverrides = () => {
  const classes = useStyles();
  return <Button className={classes.root}>Button</Button>;
};

export const Text = () => {
  return <Button text>Button</Button>;
};

export const Large = (props) => <Button {...props} />;
Large.args = {
  size: 'large',
  children: 'Button',
};

export const Small = (props) => <Button {...props} />;
Small.args = {
  size: 'small',
  children: 'Button',
};

export * from './Button.default.story';
export * from './Button.primary.story';
export * from './Button.default.vanilla-wrapper';
