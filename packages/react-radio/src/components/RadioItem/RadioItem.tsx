import * as React from 'react';
import { useRadioItem_unstable } from './useRadioItem';
import { renderRadioItem_unstable } from './renderRadioItem';
import { useRadioItemStyles_unstable } from './useRadioItemStyles';
import type { RadioItemProps } from './RadioItem.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * RadioItem component is a wrapper for a radio button with a label.
 */
export const RadioItem: ForwardRefComponent<RadioItemProps> = React.forwardRef((props, ref) => {
  const state = useRadioItem_unstable(props, ref);

  useRadioItemStyles_unstable(state);
  return renderRadioItem_unstable(state);
});

RadioItem.displayName = 'RadioItem';
