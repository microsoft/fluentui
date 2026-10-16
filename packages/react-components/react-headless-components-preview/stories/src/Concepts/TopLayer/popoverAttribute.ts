import type * as React from 'react';

/**
 * Spreads the `popover` attribute onto an element. React 17 and 18 types do not declare `popover` yet.
 */
export const popoverAttribute = (popover: string | undefined): React.HTMLAttributes<HTMLElement> =>
  ({ popover } as React.HTMLAttributes<HTMLElement>);
