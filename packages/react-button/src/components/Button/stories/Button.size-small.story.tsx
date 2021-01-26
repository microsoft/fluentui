import * as React from 'react';
import { Button } from '../Button';
import { ButtonProps } from '../Button.types';

export default {
  title: 'Fluent UI/Converge../Button',
  component: Button,
};

export const SizeSmall = (props: ButtonProps) => <Button {...props} />;
SizeSmall.args = {
  size: 'small',
  children: 'Small',
};
