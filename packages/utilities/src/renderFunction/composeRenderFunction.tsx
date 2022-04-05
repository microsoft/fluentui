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
      return (innerProps?: TProps) => {
        return inner(innerProps, defaultRender);
      };
    });

    return (outerProps?: TProps, defaultRender?: IRenderFunction<TProps>) => {
      return outer(outerProps, defaultRender ? innerMemoizer(defaultRender) : inner);
    };
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
