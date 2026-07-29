'use client';

import * as React from 'react';
import { clsx } from 'clsx';

import styles from './Primitive.module.css';
import type { JSXIntrinsicElement, JSXIntrinsicElementKeys } from '@fluentui/react-utilities';

// Simplified version from https://github.com/reach/reach-ui/blob/55d28eda39afc4c667e97f5f62a48d1de034b93f/packages/utils/src/polymorphic.ts
interface PrimitiveComponent {
  /**
   * Infers props from JSX.IntrinsicElements based on "as" value. Explicitly avoids `React.ElementType` and manually
   * narrow the prop types so that events are typed when using JSX.IntrinsicElements.
   */
  <As extends JSXIntrinsicElementKeys>(props: { as?: As } & JSXIntrinsicElement<As>): React.ReactElement | null;

  displayName: string;
}

/**
 * Public identity class for Primitive.
 *
 * @deprecated for styling — see `attachmentClassName` in ../Attachment/Attachment.tsx for the
 * full rationale. Retained as the component's public identity class, the Tailwind named-group
 * marker (DECISIONS.md D15.1); the BEM static `fui-Primitive` it used to hold was removed with
 * every other static (D16.1). Use `fuiSelector(primitiveClassName)` from
 * `@fluentui/react-utilities` at selector sites (D16.5).
 */
export const primitiveClassName = 'group/fui-primitive';

export const Primitive = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement> & { as: 'div' }>(
  (props, ref) => {
    const { as: Component = 'div', ...rest } = props;

    const dir = typeof props.children === 'string' ? 'auto' : undefined;

    // Identity-only module class FIRST, marker second, consumer className last
    // (DECISIONS.md D16.2). Primitive has no declarations of its own, so `styles.root` is an
    // empty local minted purely to keep the marker off `classList[0]` — nwsapi's `:scope`
    // polyfill throws on a leading `group/…` token under jsdom (D15.1). See
    // Primitive.module.css.
    const className = clsx(styles.root, 'group/fui-primitive', props.className);

    return <Component dir={dir} {...rest} className={className} ref={ref} />;
  },
) as PrimitiveComponent;

Primitive.displayName = 'Primitive';
