import * as React from 'react';
import { ButtonState } from '../Button/Button.types';
import { Spinner } from '../../../../react-spinner';

export const InProgress = (props: { state: ButtonState }) => {
  const appearance = props.state.appearance !== 'primary' ? 'primary' : 'inverted';
  const marginRight = props.state.iconOnly ? 'inherit' : '4px';
  const size = props.state.size === 'small' ? 'extra-tiny' : 'tiny';
  return (
    <span className="fui-Button__icon">
      <Spinner size={size} appearance={appearance} title={'Loading...'} style={{ marginRight }} />
    </span>
  );
};
