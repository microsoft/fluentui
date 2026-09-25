'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { Description } from './Markdown';
import { toKebabCase } from '../utils/toKebabCase';

export interface GuideDemo {
  name: string;
  Preview: React.ComponentType;
  description?: string;
}

export const GuideExamples: ForwardRefComponent<
  React.ComponentProps<'div'> & {
    description?: string;
    examples: GuideDemo[];
  }
> = React.forwardRef(({ description, examples, ...props }, ref) => (
  <div {...props} ref={ref}>
    {description && <Description>{description}</Description>}
    {examples.map(({ name, Preview, description: exampleDescription }) => (
      <section key={name} className="my-3xl">
        <h2 id={toKebabCase(name)}>{name}</h2>
        {exampleDescription && <Description>{exampleDescription}</Description>}
        <Preview />
      </section>
    ))}
  </div>
));
GuideExamples.displayName = 'GuideExamples';
