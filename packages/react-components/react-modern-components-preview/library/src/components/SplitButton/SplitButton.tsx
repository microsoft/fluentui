'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { SplitButtonProps } from './SplitButton.types';
import { renderSplitButton } from './renderSplitButton';
import { useSplitButton } from './useSplitButton';
import { useSplitButtonStyles } from './useSplitButtonStyles.styles';

export const SplitButton: ForwardRefComponent<SplitButtonProps> = React.forwardRef<HTMLDivElement, SplitButtonProps>(
  (props, ref) => {
    const state = useSplitButton(props, ref);
    useSplitButtonStyles(state);
    return renderSplitButton(state);
  },
);

SplitButton.displayName = 'SplitButton';
