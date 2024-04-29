import * as React from 'react';

import { defaultComponents } from './defaultComponents';
import {
  KnobContext,
  KnobContextValue,
  LogContextFunctions,
  LogContextFunctionsValue,
  LogContextItems,
} from './KnobContexts';
import { KnobComponents, KnobDefinition, KnobName, KnobSet } from './types';

type KnobProviderProps = {
  components?: Partial<KnobComponents>;
};

export const KnobProvider: React.FunctionComponent<KnobProviderProps> = props => {
  const { children, components } = props;

  const [knobs, setKnobs] = React.useState<KnobSet>({});
  const [items, setItems] = React.useState<string[]>([]);

  const registerKnob = (knob: KnobDefinition) => {
    setKnobs(prevKnobs => {
      if (process.env.NODE_ENV !== 'production') {
        if (prevKnobs[knob.name]) {
          throw new Error(`Knob with name "${knob.name}" has been already registered`);
        }
      }
      return { ...prevKnobs, [knob.name]: knob };
    });
  };
  const setKnobValue = (knobName: KnobName, knobValue: any) => {
    setKnobs(prevKnob => ({
      ...prevKnob,
      [knobName]: { ...prevKnob[knobName], value: knobValue },
    }));
  };
  const unregisterKnob = (knobName: KnobName) => {
    setKnobs(prevKnobs => {
      const newKnobs = { ...prevKnobs };
      delete newKnobs[knobName];

      return newKnobs;
    });
  };

  const appendLog = React.useCallback((value: string) => setItems(prevLog => [...prevLog, value]), []);
  const clearLog = React.useCallback(() => setItems([]), []);

  const knobValue: KnobContextValue = React.useMemo(
    () => ({
      components: { ...defaultComponents, ...components },
      knobs,
      registerKnob,
      setKnobValue,
      unregisterKnob,
    }),
    [knobs, components],
  );
  const logValue: LogContextFunctionsValue = React.useMemo(() => ({ appendLog, clearLog }), [appendLog, clearLog]);

  return (
    <KnobContext.Provider value={knobValue}>
      <LogContextFunctions.Provider value={logValue}>
        <LogContextItems.Provider value={items}>{children}</LogContextItems.Provider>
      </LogContextFunctions.Provider>
    </KnobContext.Provider>
  );
};

KnobProvider.defaultProps = {
  components: {},
};
