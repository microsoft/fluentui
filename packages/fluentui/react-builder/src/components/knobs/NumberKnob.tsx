import * as React from 'react';
import { KnobProps } from './Knob.interface';

export const NumberKnob: React.FC<KnobProps> = ({ value, onChange, id }) => (
  <input
    id={id}
    style={{ width: '100%' }}
    type="number"
    value={Number(value)}
    onChange={e => onChange(Number(e.target.value))}
  />
);
