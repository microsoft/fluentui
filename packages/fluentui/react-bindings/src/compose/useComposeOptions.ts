import { ComposedComponent, ComposePreparedOptions } from '@fluentui/react-compose';
import useCurrentReactElement from './useCurrentReactElement';

function useComposeOptions(): ComposePreparedOptions | undefined {
  const { ElementType } = useCurrentReactElement<ComposedComponent, Record<string, any>>();

  return ElementType?.fluentComposeConfig;
}

export default useComposeOptions;
