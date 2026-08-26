'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderToastTitle, useToastTitle } from '@fluentui/react-headless-components-preview/toast';

import { getIntentIcon } from '../../utils/getIntentIcon';
import type { ToastTitleProps, ToastTitleState } from './ToastTitle.types';
import { useToastTitleStyles } from './useToastTitleStyles';

/**
 * A ToastTitle names a toast and carries its intent glyph. Windmod ToastTitle: the headless toast
 * title decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const ToastTitle: ForwardRefComponent<ToastTitleProps> = React.forwardRef((props, ref) => {
  const base = useToastTitle(props, ref);

  // The headless media slot ships no glyph of its own, and inside a Toaster the intent always
  // resolves, so an unrestored slot is an empty grid column. The glyph depends on that resolved
  // intent, which only exists after the hook runs. Consumer children always win; `media={null}`
  // still removes the slot.
  const media: ToastTitleState['media'] = base.media && {
    ...base.media,
    children: base.media.children ?? getIntentIcon(base.intent),
  };

  return renderToastTitle(useToastTitleStyles({ ...base, media }));
});

ToastTitle.displayName = 'ToastTitle';
