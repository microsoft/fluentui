'use client';

import * as React from 'react';
import { Link } from 'react-router';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

export const FullscreenLink: ForwardRefComponent<{
  parent: string;
  story: string;
  content: string;
  ref?: React.Ref<HTMLAnchorElement>;
}> = React.forwardRef(({ parent, story, content }, ref) => (
  <a
    ref={ref}
    href={`https://react.fluentui.dev/iframe.html?id=${encodeURIComponent(`${parent}--${story}`)}`}
    target="_blank"
    rel="noreferrer"
  >
    {content}
  </a>
));
FullscreenLink.displayName = 'FullscreenLink';

export const ScenariosListLink: ForwardRefComponent<React.ComponentProps<'a'>> = React.forwardRef((props, ref) => (
  <Link {...props} ref={ref} to="/react/guide/accessibility/scenarios" />
));
ScenariosListLink.displayName = 'ScenariosListLink';
