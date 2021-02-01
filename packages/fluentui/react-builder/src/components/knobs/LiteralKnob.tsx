import * as React from 'react';
import { KnobProps } from './Knob.interface';

export const LiteralKnob: React.FC<KnobProps> = ({ value, onChange, id, options }) => (
  <select id={id} onChange={e => onChange(e.target.value)} value={value}>
    {options?.map((
      opt, // FIXME the optional is workaround for showing `Dialog` props when selected from component tree
    ) => (
      <option key={opt} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);
