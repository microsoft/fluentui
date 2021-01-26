import * as React from 'react';
import { Button } from '../Button';
import { ButtonProps } from '../Button.types';

export default {
  title: 'Fluent UI/Converge../Button',
  component: Button,
};

export const SizeLarge = (props: ButtonProps) => <Button {...props} />;
SizeLarge.args = {
  size: 'large',
  children: 'Small',
};
