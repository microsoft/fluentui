'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { CompoundButtonProps } from './CompoundButton.types';
import { renderCompoundButton } from './renderCompoundButton';
import { useCompoundButton } from './useCompoundButton';

/**
 * A button with primary and secondary content. Concise primary and secondary text form its accessible name.
 */
export const CompoundButton: ForwardRefComponent<CompoundButtonProps> = React.forwardRef((props, ref) => {
  const state = useCompoundButton(props, ref);

  return renderCompoundButton(state);
});

CompoundButton.displayName = 'CompoundButton';
