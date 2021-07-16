import * as React from 'react';
import { KnobProps } from './Knob.interface';

export const StringKnob: React.FC<KnobProps> = ({ value, onChange, id }) => (
  <input id={id} style={{ width: '100%' }} value={String(value)} onChange={e => onChange(e.target.value)} />
);
