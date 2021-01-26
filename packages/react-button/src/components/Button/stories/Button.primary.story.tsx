import * as React from 'react';
import { Button } from '../Button';
import { ButtonProps } from '../Button.types';

export default {
  title: 'Fluent UI Core/Button',
  component: Button,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
};

export const Primary = (props: ButtonProps) => <Button {...props} />;
Primary.args = {
  primary: true,
  children: 'Button',
};
