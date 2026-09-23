'use client';

import * as React from 'react';
import { Button } from '@fluentui/react-headless-components-preview/button';
import type { ButtonProps } from '@fluentui/react-headless-components-preview/button';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { clsx } from 'clsx';
import { field } from './styles';

export const DocsButton: ForwardRefComponent<ButtonProps> = React.forwardRef((props, ref) => (
  <Button
    {...props}
    ref={ref}
    className={clsx(
      field,
      'inline-flex cursor-pointer items-center justify-center gap-sm transition-[background-color,color,border-color,box-shadow] duration-fast ease-decelerate motion-reduce:transition-none enabled:hover:bg-foreground enabled:hover:text-surface enabled:active:shadow-active',
      props.className,
    )}
  />
));

DocsButton.displayName = 'DocsButton';
