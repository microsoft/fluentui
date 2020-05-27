import * as React from 'react';

import { KnobContext } from './KnobContexts';
import { KnobDefinition, UseKnobOptions } from './types';

function useActualOptions<P>(props: P) {
  const actualProps = React.useRef<P>(props);

  React.useEffect(() => {
    actualProps.current = props;
  });

  return actualProps;
}

const useKnob = <T, O = unknown>(
  options: UseKnobOptions<T> & { type: KnobDefinition['type'] } & O,
): [T, (newValue: T) => void] => {
  const stableOptions = useActualOptions(options);
  const { initialValue, name } = stableOptions.current;
  const contextRef = React.useRef(React.useContext(KnobContext));
  const knobContext = contextRef.current;

  const value: T = knobContext.knobs[name] === undefined ? initialValue : knobContext.knobs[name].value;
  const setValue = (newValue: T) => {
    knobContext.setKnobValue(name, newValue);
  };

  React.useEffect(() => {
    contextRef.current.registerKnob({
      ...stableOptions.current,
      value: stableOptions.current.initialValue,
    });

    const name = stableOptions.current.name;
    const context = contextRef.current;
    return () => context.unregisterKnob(name);
  }, [contextRef, stableOptions]);

  return [value, setValue];
};

export default useKnob;
