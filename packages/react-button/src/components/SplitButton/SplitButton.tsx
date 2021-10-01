import * as React from 'react';
import { renderSplitButton } from './renderSplitButton';
import { useSplitButton } from './useSplitButton';
import { useSplitButtonStyles } from './useSplitButtonStyles';
import type { SplitButtonProps } from './SplitButton.types';

/**
 * SplitButtons are a grouping of two interactive surfaces where the interacting with the first one triggers a primary
 * action, while interacting with the second one opens a menu with secondary actions.
 */
export const SplitButton: React.FunctionComponent<SplitButtonProps> = React.forwardRef<HTMLElement, SplitButtonProps>(
  (props, ref) => {
    const state = useSplitButton(props, ref);

    useSplitButtonStyles(state);

    return renderSplitButton(state);
  },
) as React.FunctionComponent<SplitButtonProps>;

SplitButton.displayName = 'SplitButton';
