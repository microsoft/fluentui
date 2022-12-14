import * as React from 'react';
import { useFoobar_unstable } from './useFoobar';
import { renderFoobar_unstable } from './renderFoobar';
import { useFoobarStyles_unstable } from './useFoobarStyles';
import type { FoobarProps } from './Foobar.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Foobar component - TODO: add more docs
 */
export const Foobar: ForwardRefComponent<FoobarProps> = React.forwardRef((props, ref) => {
  const state = useFoobar_unstable(props, ref);

  useFoobarStyles_unstable(state);
  return renderFoobar_unstable(state);
});

Foobar.displayName = 'Foobar';
