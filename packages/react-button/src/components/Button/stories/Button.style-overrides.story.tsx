import * as React from 'react';
// TODO: get @fluentui/react-button to work here
import { Button } from '../Button';
import { makeStyles } from '@fluentui/react-theme-provider';
import { ButtonProps } from '../Button.types';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.themePrimary,
    color: '#fff',
  },
}));

export const StyleOverrides = (props: ButtonProps) => {
  const classes = useStyles();
  return <Button className={classes.root} {...props} />;
};
StyleOverrides.args = {
  children: 'Style Overrides',
};
