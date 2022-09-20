import * as React from 'react';
import {
  useButton_unstable,
  renderButton_unstable,
  ForwardRefComponent,
  ButtonProps,
  ButtonState,
  mergeClasses,
  buttonClassNames,
} from '@fluentui/react-components';
import { ReactSelectorTreeComponentRenderer } from '../../../shared/react/types';
import { useRootStyles, useRootDisabledStyles } from './styles';

const useButtonIdiomaticOverrideStyles = (state: ButtonState): ButtonState => {
  const rootStyles = useRootStyles();
  const rootDisabledStyles = useRootDisabledStyles();

  const { disabled, disabledFocusable } = state;

  state.root.className = mergeClasses(
    buttonClassNames.root,
    rootStyles.base,
    rootStyles.highContrast,
    (disabled || disabledFocusable) && rootDisabledStyles.base,
    (disabled || disabledFocusable) && rootDisabledStyles.highContrast,
    state.root.className,
  );

  return state;
};

const ButtonIdiomaticOverride: ForwardRefComponent<ButtonProps> = React.forwardRef((props, ref) => {
  const state = useButton_unstable(props, ref);

  useButtonIdiomaticOverrideStyles(state);

  return renderButton_unstable(state);
}) as ForwardRefComponent<ButtonProps>;

const componentRenderer: ReactSelectorTreeComponentRenderer = (node, depth, index) => {
  return <ButtonIdiomaticOverride>{`${node.value.name}, ${index}`}</ButtonIdiomaticOverride>;
};

export default componentRenderer;
