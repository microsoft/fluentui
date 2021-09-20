import * as React from 'react';

export type MinimalMenuProps = {
  hidden?: boolean;
  onDismiss?: () => void;
  target?: React.Ref<HTMLElement>;
};
