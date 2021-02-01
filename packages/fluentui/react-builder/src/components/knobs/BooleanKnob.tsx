import * as React from 'react';
import { KnobProps } from './Knob.interface';

export const BooleanKnob: React.FC<KnobProps> = ({ value, onChange, id }) => (
  <input id={id} type="checkbox" checked={!!value} onChange={e => onChange(!!e.target.checked)} />
);
