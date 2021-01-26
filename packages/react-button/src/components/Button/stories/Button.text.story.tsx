import * as React from 'react';
import { Button } from '../Button';
import { ButtonProps } from '../Button.types';

export default {
  title: 'Fluent UI Core/Button',
  component: Button,
};

export const Text = (props: ButtonProps) => <Button {...props} />;

Text.args = {
  text: true,
  children: 'Button',
} as ButtonProps;
