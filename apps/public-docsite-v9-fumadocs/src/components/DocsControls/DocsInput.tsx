'use client';

import * as React from 'react';
import { Input } from '@fluentui/react-headless-components-preview/input';
import type { InputProps } from '@fluentui/react-headless-components-preview/input';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { clsx } from 'clsx';
import { field } from './styles';

export const DocsInput: ForwardRefComponent<Omit<InputProps, 'input'>> = React.forwardRef((props, ref) => (
  <Input
    {...props}
    ref={ref}
    className={clsx('inline-flex min-w-0', props.className)}
    input={{ className: clsx(field, 'w-full placeholder:text-muted') }}
  />
));

DocsInput.displayName = 'DocsInput';
