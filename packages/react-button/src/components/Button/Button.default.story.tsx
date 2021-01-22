import * as React from 'react';
import { Button } from './Button';

export default {
  title: 'Fluent UI Core/Button',
  component: Button,
};

export const Default = (props) => <Button {...props} />;
Default.args = {
  children: 'Default',
};
