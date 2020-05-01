import React from 'react';
import { ButtonBase } from './Button.base';

export default {
  component: 'Button',
  title: 'Base Button',
};

const _onClick = () => {
  // eslint-disable-next-line no-console
  console.log('Button was clicked');
};

export const baseButton = () => <ButtonBase onClick={_onClick}>This renders as a button</ButtonBase>;

export const baseButtonWithHref = () => <ButtonBase href="https://www.bing.com">This renders as a link</ButtonBase>;
