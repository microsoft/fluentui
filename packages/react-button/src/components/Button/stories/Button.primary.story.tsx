import * as React from 'react';
import { Button } from '../Button';

export default {
  title: 'Fluent UI Core/Button',
  component: Button,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
};

export const Primary = (props) => <Button {...props} />;
Primary.args = {
  primary: true,
  children: 'Button',
};
