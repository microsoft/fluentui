import * as React from 'react';
import { mergeClasses } from '@fluentui/react-components';

// Simplified version from https://github.com/reach/reach-ui/blob/55d28eda39afc4c667e97f5f62a48d1de034b93f/packages/utils/src/polymorphic.ts
interface PrimitiveComponent {
  /**
   * Infers props from JSX.IntrinsicElements based on "as" value. Explicitly avoids `React.ElementType` and manually
   * narrow the prop types so that events are typed when using JSX.IntrinsicElements.
   */
  <As extends keyof JSX.IntrinsicElements>(props: { as?: As } & JSX.IntrinsicElements[As]): React.ReactElement | null;

  displayName: string;
}

export const primitiveClassName = 'fui-Primitive';

export const Primitive = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement> & { as: 'div' }>(
  (props, ref) => {
    const { as: Component = 'div', ...rest } = props;

    const dir = typeof props.children === 'string' ? 'auto' : undefined;

    const className = mergeClasses(primitiveClassName, props.className);

    return <Component dir={dir} {...rest} className={className} ref={ref} />;
  },
) as PrimitiveComponent;

Primitive.displayName = 'Primitive';
