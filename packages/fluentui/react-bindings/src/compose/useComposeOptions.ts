import { ComposedComponent, ComposePreparedOptions } from '@fluentui/react-compose';
import useReactElement from './useReactElement';

function useComposeOptions(): ComposePreparedOptions | undefined {
  const [ElementType] = useReactElement<ComposedComponent, Record<string, any>>();

  return ElementType?.fluentComposeConfig;
}

export default useComposeOptions;
