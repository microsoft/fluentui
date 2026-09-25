'use client';

import * as React from 'react';
import { Switch } from '@fluentui/react-headless-components-preview/switch';
import type { SwitchProps } from '@fluentui/react-headless-components-preview/switch';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { toggleIndicator, toggleInput, toggleRoot } from './styles';
import { clsx } from 'clsx';

export const DocsSwitch: ForwardRefComponent<Omit<SwitchProps, 'input' | 'indicator'>> = React.forwardRef(
  (props, ref) => (
    <Switch
      {...props}
      ref={ref}
      className={clsx(toggleRoot, props.className)}
      input={{ className: toggleInput }}
      indicator={{
        className: clsx(
          toggleIndicator,
          'w-track rounded-round transition-colors duration-fast ease-decelerate motion-reduce:transition-none',
        ),
        children: (
          <span className="absolute start-xxs top-1/2 size-md -translate-y-1/2 rounded-round bg-muted transition-[inset-inline-start,background-color] duration-fast ease-decelerate motion-reduce:transition-none group-data-checked:start-thumb-checked group-data-checked:bg-surface" />
        ),
      }}
    />
  ),
);

DocsSwitch.displayName = 'DocsSwitch';
