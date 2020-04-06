import * as React from 'react';
import { IComponentAs, IComponentAsProps } from '../IComponentAs';
import { createMemoizer } from '../memoize';

interface IComposeComponentAs {
  <TProps>(outer: IComponentAs<TProps>): (inner: IComponentAs<TProps>) => IComponentAs<TProps>;
}

function createComposedComponent<TProps>(
  outer: IComponentAs<TProps>,
): (inner: IComponentAs<TProps>) => IComponentAs<TProps> {
  const Outer = outer;

  const outerMemoizer = createMemoizer((inner: IComponentAs<TProps>) => {
    if (outer === inner) {
      throw new Error('Attempted to compose a component with itself.');
    }

    const Inner = inner;

    const innerMemoizer = createMemoizer((defaultRender: IComponentAs<TProps>) => {
      const InnerWithDefaultRender: React.ComponentType<IComponentAsProps<TProps>> = (
        innerProps: IComponentAsProps<TProps>,
      ): JSX.Element => {
        return <Inner {...innerProps} defaultRender={defaultRender} />;
      };

      return InnerWithDefaultRender;
    });

    const OuterWithDefaultRender: React.ComponentType<IComponentAsProps<TProps>> = (
      outerProps: IComponentAsProps<TProps>,
    ): JSX.Element => {
      const { defaultRender } = outerProps;

      return <Outer {...outerProps} defaultRender={defaultRender ? innerMemoizer(defaultRender) : Inner} />;
    };

    return OuterWithDefaultRender;
  });

  return outerMemoizer;
}

const componentAsMemoizer = createMemoizer<IComposeComponentAs>(createComposedComponent);

/**
 * Composes two components which conform to the `IComponentAs` specification; that is, two
 * components which accept a `defaultRender` prop, which is a 'default' implementation of
 * a component which accepts the same overall props.
 *
 * @public
 */
export function composeComponentAs<TProps>(
  outer: IComponentAs<TProps>,
  inner: IComponentAs<TProps>,
): IComponentAs<TProps> {
  return componentAsMemoizer(outer)(inner);
}
