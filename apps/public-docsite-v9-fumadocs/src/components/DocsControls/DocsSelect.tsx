'use client';

import * as React from 'react';
import { Select } from '@fluentui/react-headless-components-preview/select';
import type { SelectProps } from '@fluentui/react-headless-components-preview/select';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { field } from './styles';

export const DocsSelect: ForwardRefComponent<Omit<SelectProps, 'select' | 'icon'>> = React.forwardRef((props, ref) => (
  <Select
    {...props}
    ref={ref}
    className={clsx('relative inline-flex min-w-0', props.className)}
    select={{
      className: clsx(field, 'w-full cursor-pointer appearance-none pe-select-end'),
    }}
    icon={{
      className: 'pointer-events-none absolute end-md top-1/2 flex -translate-y-1/2 text-muted',
      children: <ChevronDown aria-hidden="true" className="size-lg" />,
    }}
  />
));

DocsSelect.displayName = 'DocsSelect';
