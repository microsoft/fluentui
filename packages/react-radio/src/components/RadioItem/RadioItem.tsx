import * as React from 'react';
import { useRadioItem } from './useRadioItem';
import { renderRadioItem } from './renderRadioItem';
import { useRadioItemStyles } from './useRadioItemStyles';
import type { RadioItemProps } from './RadioItem.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * RadioItem component is a wrapper for a radio button with a label.
 */
export const RadioItem: ForwardRefComponent<RadioItemProps> = React.forwardRef((props, ref) => {
  const state = useRadioItem(props, ref);

  useRadioItemStyles(state);
  return renderRadioItem(state);
});

RadioItem.displayName = 'RadioItem';
