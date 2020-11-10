import * as React from 'react';

/**
 * {@docCategory MenuContext}
 */
export type MinimalMenuProps = {
  hidden?: boolean;
  onDismiss?: () => void;
  target?: React.Ref<HTMLElement | undefined>;
};
