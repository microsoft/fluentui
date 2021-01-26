import * as React from 'react';
import { Button } from '../Button';
import { ButtonProps } from '../Button.types';

export default {
  title: 'Fluent UI/Converged/Button',
  component: Button,
};

const Template = (props: ButtonProps) => <Button {...props} />;

export const SizeSmall = Template.bind({});
SizeSmall.args = {
  size: 'small',
  children: 'Small',
};

export const SizeLarge = Template.bind({});
SizeLarge.args = {
  size: 'large',
  children: 'Large',
};
