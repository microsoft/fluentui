import * as React from 'react';

type FocusTrapProps = {
  /** Whether the trap is enabled. */
  active?: boolean;
};

/**
 * Helper component used by Storybook to auto-generate the `useFocusTrap`
 * args table. The hook itself doesn't render anything.
 */
export const FocusTrap: React.FC<FocusTrapProps> = () => <div />;
