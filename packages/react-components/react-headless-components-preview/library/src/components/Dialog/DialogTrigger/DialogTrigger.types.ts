import type * as React from 'react';
import type { TriggerProps } from '@fluentui/react-utilities';

export type DialogTriggerAction = 'open' | 'close';

export type DialogTriggerProps = TriggerProps & {
  /**
   * Explicitly declare if the trigger is responsible for opening or closing the dialog.
   *
   * If `DialogTrigger` is outside `DialogSurface` it defaults to `'open'`.
   * If `DialogTrigger` is inside `DialogSurface` it defaults to `'close'`.
   */
  action?: DialogTriggerAction;
};

export type DialogTriggerState = {
  children: React.ReactElement | null;
};
