import useCompose from '../compose/useCompose';
import getUnhandledProps from '../utils/getUnhandledProps';

function useUnhandledProps<P extends Record<string, any>>(handledProps: (keyof P)[], props: P): Partial<P> {
  const composeOptions = useCompose();

  return getUnhandledProps([...handledProps, ...(composeOptions?.handledProps || [])], props);
}

export default useUnhandledProps;
