import { createMemoizer } from '../memoize';
import type { IRenderFunction } from '../IRenderFunction';

interface IRenderFunctionComposer {
  <TProps>(outer: IRenderFunction<TProps>): (inner: IRenderFunction<TProps>) => IRenderFunction<TProps>;
}

function createComposedRenderFunction<TProps>(
  outer: IRenderFunction<TProps>,
): (inner: IRenderFunction<TProps>) => IRenderFunction<TProps> {
  const outerMemoizer = createMemoizer((inner: IRenderFunction<TProps>) => {
    const innerMemoizer = createMemoizer((defaultRender: IRenderFunction<TProps>) => {
      function innerRenderFunctionWithDefaultRender(innerProps?: TProps): JSX.Element | null {
        return inner(innerProps, defaultRender);
      }

      (innerRenderFunctionWithDefaultRender as {
        composed?: {
          outer: IRenderFunction<TProps>;
          inner: IRenderFunction<TProps>;
        };
      }).composed = {
        outer: inner,
        inner: defaultRender,
      };

      return innerRenderFunctionWithDefaultRender;
    });

    function outerRenderFunctionWithDefaultRender(
      outerProps?: TProps,
      defaultRender?: IRenderFunction<TProps>,
    ): JSX.Element | null {
      return outer(outerProps, defaultRender ? innerMemoizer(defaultRender) : inner);
    }

    (outerRenderFunctionWithDefaultRender as {
      composed?: {
        outer: IRenderFunction<TProps>;
        inner: IRenderFunction<TProps>;
      };
    }).composed = {
      outer,
      inner,
    };

    return outerRenderFunctionWithDefaultRender;
  });

  return outerMemoizer;
}

const memoizer = createMemoizer<IRenderFunctionComposer>(createComposedRenderFunction);

/**
 * Composes two 'render functions' to produce a final render function that renders
 * the outer function, passing the inner function as 'default render'. The inner function
 * is then passed the original 'default render' prop.
 * @public
 */
export function composeRenderFunction<TProps>(
  outer: IRenderFunction<TProps>,
  inner: IRenderFunction<TProps>,
): IRenderFunction<TProps> {
  return memoizer(outer)(inner);
}
