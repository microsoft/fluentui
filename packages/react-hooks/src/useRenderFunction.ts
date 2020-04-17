import { IRenderFunction } from '@uifabric/utilities';
import { useCallback } from 'react';

/**
 * Generic type to extract the name of all properties of type IRenderFunction<TProps>
 */
export type RenderFunctionNames<TProps extends {}> = {
  // tslint:disable-next-line:no-any  This is used to filter out any properties of "any" type
  [K in keyof TProps]: any extends TProps[K] ? never : IRenderFunction<TProps> extends TProps[K] ? K : never;
}[keyof TProps];

/**
 * Hook to return a rendering function that can be overridden by a custom rendering function in component properties
 * @param props- Component properties
 * @param renderFunctionName- Property name for the optional custom rendering function
 * @param defaultRender- Function used to render the component if no custom rendering function is passed; this value is
 *  also passed on as a parameter to any custom rendering function.
 */
export function useRenderFunction<TProps extends {}, TRenderFunctionName extends RenderFunctionNames<TProps>>(
  props: TProps,
  renderFunctionName: TRenderFunctionName,
  defaultRender: (props: TProps) => JSX.Element | null,
): () => JSX.Element | null {
  const propsRenderFunction: IRenderFunction<TProps> | undefined = props[renderFunctionName];
  return useCallback(
    propsRenderFunction ? () => propsRenderFunction(props, defaultRender) : () => defaultRender(props),
    [propsRenderFunction],
  );
}
