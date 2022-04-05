import * as React from 'react';

import { KnobContext, KnobContextValue } from './KnobContexts';
import { KnobComponent, KnobComponentProps, KnobDefinition } from './types';
import { useKnobValues } from './useKnobValues';

const getKnobControls = (knobsContext: KnobContextValue): Record<'Control' | 'Field' | 'Label', KnobComponent> => {
  const { KnobControl, KnobField, KnobLabel } = knobsContext.components;
  const controls = {
    Control: KnobControl,
    Field: KnobField,
    Label: KnobLabel,
  };

  if (process.env.NODE_ENV !== 'production') {
    Object.keys(controls).forEach(name => {
      if (typeof controls[name] === 'undefined') {
        throw new Error(`"${name}" is not defined, please check you mapping`);
      }
    });
  }

  return controls;
};

const getKnobComponents = (knobsContext: KnobContextValue): Record<KnobDefinition['type'], KnobComponent> => {
  const { KnobBoolean, KnobNumber, KnobRange, KnobSelect, KnobString } = knobsContext.components;
  const components = {
    boolean: KnobBoolean,
    number: KnobNumber,
    range: KnobRange,
    select: KnobSelect,
    string: KnobString,
  };

  if (process.env.NODE_ENV !== 'production') {
    Object.keys(components).forEach(name => {
      if (typeof components[name] === 'undefined') {
        throw new Error(`A component for "${name}" is not defined, please check you mapping`);
      }
    });
  }

  return components;
};

type KnobInspectorProps = {
  children?: (children: React.ReactElement) => React.ReactElement;
};

export const KnobInspector: React.FunctionComponent<KnobInspectorProps> = props => {
  const knobContext = React.useContext(KnobContext);

  const { Control, Field, Label } = getKnobControls(knobContext);
  const knobComponents = getKnobComponents(knobContext);
  const knobValues = useKnobValues();

  const children =
    knobValues.length > 0 ? (
      <>
        {knobValues.map((knob: KnobDefinition) => {
          const setValue = (value: any) => knobContext.setKnobValue(knob.name, value);
          const knobProps: KnobComponentProps = { ...knob, setValue };

          return (
            <Field {...knobProps} key={knob.name}>
              <Label {...knobProps} />
              <Control {...knobProps}>{React.createElement(knobComponents[knob.type], knobProps)}</Control>
            </Field>
          );
        })}
      </>
    ) : null;

  return props.children ? props.children(children) : children;
};
