import { CheckmarkRegular } from '@fluentui/react-icons';
import * as React from 'react';
import { ButtonState } from '../Button/Button.types';

export const Success = (props: { state: ButtonState }) => {
  const primaryFill = props.state.appearance !== 'primary' ? 'green' : 'white';
  const marginRight = props.state.iconOnly ? 'inherit' : '4px';
  const size = props.state.size === 'small' ? '16px' : '20px';
  return (
    <span className="fui-Button__icon" style={{ display: 'flex' }}>
      <CheckmarkRegular style={{ marginRight, width: size, height: size }} primaryFill={primaryFill} />
    </span>
  );
};
