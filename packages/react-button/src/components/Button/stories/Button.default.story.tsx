import * as React from 'react';
import { Button } from '../Button';
import { ButtonProps } from '../Button.types';

export const Default = (props: ButtonProps) => <Button {...props} />;

Default.args = {
  children: 'Default',
} as ButtonProps;
